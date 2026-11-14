import { animate, frame, groundTransform, project, type Box, type Point, type View } from './axo';

/**
 * The figure on the home page (see `components/atlas/Atlas.astro`).
 *
 * On a small screen it is a list of results and a matrix, and this file only
 * makes the matrix answer to the pointer. On a wide screen it stands the same
 * elements up as an axonometric drawing:
 *
 *   - the ground is the product P × D, ruled into cells, with a filled square
 *     for each pair of the relation;
 *   - each project stands over its column, tied to its squares;
 *   - the parts of the site sit above the projects, which point up at the
 *     claim they support.
 *
 * Selecting a part re-sorts the ground so that what is related comes to the
 * near corner, moves the view to it, and opens a panel that says what the
 * part holds. The drawing can be turned by dragging; from directly above it
 * is the matrix.
 */

interface Model {
  lemmas: { id: string; disciplines: string[] }[];
  disciplines: string[];
}

type Level = 'top' | 'lemma' | 'ground';

interface Part {
  id: string;
  el: HTMLElement;
  level: Level;
  /** Position among the parts of its level, in document order. */
  index: number;
  width: number;
  height: number;
  /** Where its anchor was last drawn on the screen. */
  x: number;
  y: number;
}

// The model, in its own units. One unit is one pixel at a zoom of 1.
const COLUMN = 180;
const ROW = 52;
const PAIR = 26;
/** Projects stand just behind the back edge of the ground, raised. */
const LEMMA_Y = -26;
const LEMMA_Z = 100;
/** The parts of the site stand further back and higher: one more level. */
const TOP_Y = -170;
const TOP_Z = 255;
const TOP_PITCH = 190;
/** A pair of the relation is a block standing on the ground, this tall. */
const BLOCK = 13;
/** The ground is a slab, this thick. */
const SLAB = 9;
/** How much higher a selected project stands. */
const RISE = 30;

const DEGREE = Math.PI / 180;
const AXONOMETRIC = { yaw: -12 * DEGREE, tilt: 58 * DEGREE };
const PLAN = { yaw: 0, tilt: 0 };

const SVG = 'http://www.w3.org/2000/svg';
/** Tell the rest of the page which part is selected (the skills table listens). */
const announce = (id: string | null) => document.dispatchEvent(new CustomEvent('atlas:select', { detail: id }));
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function mountAtlas(root: HTMLElement): void {
  bindMatrix(root);

  // The drawing needs room. Below this width the list and the matrix are
  // the figure.
  const wide = window.matchMedia('(min-width: 64rem)');
  let scene: { destroy(): void } | undefined;
  const sync = () => {
    if (wide.matches && !scene) {
      try {
        scene = createScene(root);
      } catch (error) {
        root.removeAttribute('data-scene');
        root.setAttribute('data-flat', '');
        console.error(error);
      }
    } else if (!wide.matches && scene) {
      scene.destroy();
      scene = undefined;
    }
  };
  wide.addEventListener('change', sync);
  sync();
}

/**
 * The matrix, which is the figure on a small screen. Pointing at a cell or a
 * heading picks out its row and column. Choosing a row selects that project,
 * choosing a column heading selects that discipline, and what the selected
 * part holds is set out in a sheet under the matrix.
 */
function bindMatrix(root: HTMLElement): void {
  const matrix = root.querySelector<HTMLElement>('[data-matrix]');
  const sheet = root.querySelector<HTMLElement>('[data-sheet]');
  const body = root.querySelector<HTMLElement>('[data-sheet-body]');
  if (!matrix || !sheet || !body) return;

  let picked: { row?: HTMLElement; col?: string } = {};
  const paint = (row: HTMLElement | undefined, col: string | undefined) => {
    matrix.toggleAttribute('data-active', Boolean(row || col));
    for (const lit of matrix.querySelectorAll('[data-lit]')) lit.removeAttribute('data-lit');
    row?.setAttribute('data-lit', '');
    if (col) for (const cell of matrix.querySelectorAll(`[data-col="${col}"]`)) cell.setAttribute('data-lit', '');
  };
  const light = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return;
    const row = target.closest<HTMLElement>('tr[data-row]') ?? undefined;
    const col = target.closest<HTMLElement>('[data-col]')?.dataset.col;
    if (row || col) paint(row, col);
  };
  const rest = () => paint(picked.row, picked.col);

  const select = (id: string | null) => {
    const panel = id ? root.querySelector<HTMLTemplateElement>(`template[data-panel="${id}"]`) : null;
    const row = id ? (matrix.querySelector<HTMLElement>(`tr[data-lemma="${id}"]`) ?? undefined) : undefined;
    const col = id?.startsWith('D-') ? id.slice(2) : undefined;
    picked = panel ? { row, col } : {};
    for (const heading of matrix.querySelectorAll<HTMLElement>('th[data-col]')) {
      heading.setAttribute('aria-pressed', String(heading.dataset.col === picked.col));
    }
    rest();
    if (panel) body.replaceChildren(panel.content.cloneNode(true));
    sheet.hidden = !panel;
    announce(panel ? id : null);
    if (panel) sheet.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  // Column headings are not links, so they are made into buttons here.
  for (const heading of matrix.querySelectorAll<HTMLElement>('th[data-col]')) {
    heading.tabIndex = 0;
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-pressed', 'false');
  }

  matrix.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const row = event.target.closest<HTMLElement>('tbody tr[data-lemma]');
    const heading = event.target.closest<HTMLElement>('thead th[data-col]');
    const id = row ? row.dataset.lemma! : heading ? `D-${heading.dataset.col}` : null;
    if (!id) return;
    // The row's own link leads to the case study; so does the sheet.
    event.preventDefault();
    const current = picked.row?.dataset.lemma ?? (picked.col ? `D-${picked.col}` : null);
    select(current === id ? null : id);
  });
  matrix.addEventListener('keydown', (event) => {
    const heading = (event.target as Element).closest<HTMLElement>('thead th[data-col]');
    if (!heading || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    heading.click();
  });
  sheet.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const hop = event.target.closest<HTMLElement>('[data-goto]');
    if (hop?.dataset.goto) select(hop.dataset.goto);
    else if (event.target.closest('[data-sheet-close]')) select(null);
  });

  matrix.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'mouse') light(event.target);
  });
  matrix.addEventListener('pointerleave', rest);
  matrix.addEventListener('focusin', (event) => light(event.target));
  matrix.addEventListener('focusout', rest);
}

function createScene(root: HTMLElement): { destroy(): void } {
  const model = JSON.parse(root.querySelector('[data-model]')?.textContent ?? '') as Model;
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const ink = root.querySelector<SVGSVGElement>('[data-ink]')!;
  const dock = root.querySelector<HTMLElement>('[data-dock]')!;
  const dockBody = root.querySelector<HTMLElement>('[data-dock-body]')!;
  const switcher = root.querySelector<HTMLElement>('[data-switch]')!;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const { signal } = listeners;

  const columns = model.lemmas.length;
  const rows = model.disciplines.length;
  const groundWidth = columns * COLUMN;
  const groundDepth = rows * ROW;

  root.setAttribute('data-scene', '');
  switcher.hidden = false;
  dock.hidden = false;
  dock.inert = true;

  // ----- The parts: elements that are already in the page -----
  const parts = new Map<string, Part>();
  const collect = (elements: Iterable<HTMLElement>, level: Level) =>
    [...elements].map((el, index) => {
      const part: Part = { id: el.dataset.node!, el, level, index, width: 0, height: 0, x: 0, y: 0 };
      parts.set(part.id, part);
      return part;
    });
  const tops = collect(root.querySelectorAll<HTMLElement>('[data-level="top"]'), 'top');
  const lemmas = collect(
    model.lemmas.map((lemma) => root.querySelector<HTMLElement>(`[data-node="${lemma.id}"]`)!),
    'lemma',
  );
  const grounds = collect(
    model.disciplines.map((id) => root.querySelector<HTMLElement>(`[data-node="D-${id}"]`)!),
    'ground',
  );
  const claim = parts.get('root');
  const topX = (index: number) => groundWidth / 2 + (index - (tops.length - 1) / 2) * TOP_PITCH;
  const exercises = (lemma: number, discipline: number) =>
    model.lemmas[lemma]!.disciplines.includes(model.disciplines[discipline]!);

  for (const part of parts.values()) {
    if (part.level === 'ground') part.el.setAttribute('aria-pressed', 'false');
    else {
      part.el.setAttribute('aria-expanded', 'false');
      part.el.setAttribute('aria-controls', dock.id);
    }
  }

  // ----- The ink: everything drawn rather than written -----
  const draw = <K extends keyof SVGElementTagNameMap>(name: K, className: string, parent: Element) => {
    const element = document.createElementNS(SVG, name);
    element.setAttribute('class', className);
    parent.append(element);
    return element;
  };
  ink.replaceChildren();
  const ground = draw('g', 'atlas-plane', ink);
  const sheet = draw('rect', 'atlas-ground', ground);
  sheet.setAttribute('width', String(groundWidth));
  sheet.setAttribute('height', String(groundDepth));
  let rules = '';
  for (let row = 1; row < rows; row += 1) rules += `M0 ${row * ROW}H${groundWidth}`;
  for (let column = 1; column < columns; column += 1) rules += `M${column * COLUMN} 0V${groundDepth}`;
  draw('path', 'atlas-rule', ground).setAttribute('d', rules);
  // The ground is named on the ground, the way a plan is lettered.
  const name = draw('text', 'atlas-product', ground);
  name.setAttribute('x', String(groundWidth));
  name.setAttribute('y', String(groundDepth + 56));
  name.textContent = 'P × D';

  // The ground has thickness: the two edges of the slab that face the reader.
  const slab = [draw('path', 'atlas-slab', ink), draw('path', 'atlas-slab atlas-slab-side', ink)];
  ink.prepend(...slab);
  // Each pair is a block: a top and the two sides that face the reader.
  const blocks = draw('g', 'atlas-blocks', ink);
  const wires = draw('g', 'atlas-wires', ink);
  interface Pair {
    lemma: number;
    row: number;
    index: number;
    block: SVGGElement;
    faces: [side: SVGPathElement, front: SVGPathElement, top: SVGPathElement];
    wire: SVGLineElement;
    depth: number;
  }
  const pairs: Pair[] = [];
  for (let lemma = 0; lemma < columns; lemma += 1) {
    for (let row = 0; row < rows; row += 1) {
      if (!exercises(lemma, row)) continue;
      const block = draw('g', 'atlas-pair', blocks);
      pairs.push({
        lemma,
        row,
        index: pairs.length,
        block,
        faces: [
          draw('path', 'atlas-face-side', block),
          draw('path', 'atlas-face-front', block),
          draw('path', 'atlas-face-top', block),
        ],
        wire: draw('line', 'atlas-wire', wires),
        depth: 0,
      });
    }
  }
  let stacking = '';
  const drops = lemmas.map(() => draw('line', 'atlas-drop', wires));
  const proofs = lemmas.map(() => draw('path', 'atlas-arrow atlas-proof', ink));
  // The parts of the paper follow one another; the last is an aside.
  const links = tops.slice(1).map((_, index) =>
    draw('path', index === tops.length - 2 ? 'atlas-arrow atlas-aside' : 'atlas-arrow', ink),
  );

  // ----- State -----
  // One list of numbers holds everything that moves, so one motion takes the
  // drawing from any state to any other: the view, how far the upper levels
  // are raised, and where each column and row of the ground sits.
  const VIEW = 6;
  const RISES = VIEW + columns + rows;
  const HEIGHTS = RISES + columns;
  const state = new Array<number>(HEIGHTS + pairs.length).fill(0);
  const columnAt = (lemma: number) => state[VIEW + lemma]!;
  const rowAt = (row: number) => state[VIEW + columns + row]!;
  /** How far a project is raised above the others, 0 to 1. */
  const riseOf = (lemma: number) => state[RISES + lemma]!;
  const heightOf = (pair: number) => state[HEIGHTS + pair]!;

  let angles = { ...AXONOMETRIC };
  let focus: string | null = null;
  let hover: string | null = null;
  let roving = lemmas[0]!.id;
  /** Which lemma, and which discipline, is in each slot of the ground. */
  let columnOrder = lemmas.map((part) => part.index);
  let rowOrder = grounds.map((part) => part.index);
  let stop = () => {};
  let size = { width: 0, height: 0, dock: 0, label: 0 };

  function measure() {
    size = {
      width: stage.clientWidth,
      height: stage.clientHeight,
      dock: dock.offsetWidth,
      label: Math.max(...grounds.map((part) => part.el.offsetWidth)),
    };
    for (const part of parts.values()) {
      part.width = part.el.offsetWidth;
      part.height = part.el.offsetHeight;
    }
  }

  /** The part of the stage the model may occupy, clear of labels and boxes. */
  function room(besideDock: boolean): Box {
    const tallest = Math.max(...tops.map((part) => part.height));
    const left = size.label + 28;
    const right = (besideDock ? size.dock : 0) + 26 + lemmas[0]!.width / 2;
    const top = tallest + 18;
    const bottom = 22;
    return { x: left, y: top, width: size.width - left - right, height: size.height - top - bottom };
  }

  function reorder() {
    const selected = focus ? parts.get(focus) : undefined;
    const natural = (count: number) => Array.from({ length: count }, (_, index) => index);
    columnOrder = natural(columns);
    rowOrder = natural(rows);
    if (selected?.level === 'lemma') {
      // The selected project comes to the first column, and the disciplines
      // it exercised to the first rows.
      columnOrder = [selected.index, ...columnOrder.filter((index) => index !== selected.index)];
      rowOrder = [
        ...rowOrder.filter((row) => exercises(selected.index, row)),
        ...rowOrder.filter((row) => !exercises(selected.index, row)),
      ];
    } else if (selected?.level === 'ground') {
      rowOrder = [selected.index, ...rowOrder.filter((index) => index !== selected.index)];
      columnOrder = [
        ...columnOrder.filter((lemma) => exercises(lemma, selected.index)),
        ...columnOrder.filter((lemma) => !exercises(lemma, selected.index)),
      ];
    }
  }

  /** Where everything should be for the current selection and angles. */
  function target(): number[] {
    const whole: Point[] = [
      [0, 0],
      [groundWidth, 0],
      [0, groundDepth],
      [groundWidth, groundDepth + 64],
      ...lemmas.map((_, slot): Point => [slot * COLUMN + COLUMN / 2, LEMMA_Y, LEMMA_Z]),
      ...tops.map((part): Point => [topX(part.index), TOP_Y, TOP_Z]),
    ];
    const overview = frame(whole, angles, room(false), [0.55, 1.12]);
    let camera = overview;
    const selected = focus ? parts.get(focus) : undefined;
    if (selected?.level === 'top') {
      // Keep the scale; slide the selected part clear of the panel.
      const [x] = project({ ...angles, ...overview }, topX(selected.index), TOP_Y, TOP_Z);
      const free = size.width - size.dock;
      const wanted = clamp(x, selected.width / 2 + 20, free - selected.width / 2 - 20);
      camera = { ...overview, ox: overview.ox + wanted - x };
    } else if (selected) {
      // Come closer to the near corner, where the selection now is.
      const near = Math.min(2, columns) * COLUMN;
      const corner: Point[] = [
        [0, 0],
        [near, 0],
        [0, groundDepth],
        [near, groundDepth],
        [COLUMN / 2, LEMMA_Y, LEMMA_Z],
        [topX(0), TOP_Y, TOP_Z],
        [groundWidth / 2, TOP_Y, TOP_Z],
      ];
      camera = frame(corner, angles, room(true), [overview.zoom, overview.zoom * 1.14], whole);
    }
    const next = [angles.yaw, angles.tilt, camera.zoom, camera.ox, camera.oy, 1];
    for (let lemma = 0; lemma < columns; lemma += 1) next.push(columnOrder.indexOf(lemma) * COLUMN);
    for (let row = 0; row < rows; row += 1) next.push(rowOrder.indexOf(row) * ROW);
    // What is selected stands taller, and what is pointed at a little taller.
    const pointed = hover ? parts.get(hover) : undefined;
    const weight = (level: Level, index: number) =>
      selected?.level === level && selected.index === index
        ? 1
        : pointed?.level === level && pointed.index === index
          ? 0.45
          : 0;
    for (let lemma = 0; lemma < columns; lemma += 1) next.push(weight('lemma', lemma));
    for (const pair of pairs) {
      next.push(BLOCK * (1 + 1.5 * Math.max(weight('lemma', pair.lemma), weight('ground', pair.row))));
    }
    return next;
  }

  // ----- Drawing one frame -----
  // Boxes and labels are set in screen pixels and do not follow the zoom.
  // On a short stage the model is drawn small, so they give a little too.
  let shrink = 1;
  const place = (part: Part, left: number, top: number) => {
    part.el.style.transform =
      `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)` + (shrink < 1 ? ` scale(${shrink.toFixed(3)})` : '');
  };
  const arrow = (x1: number, y1: number, x2: number, y2: number, head = 7.5) => {
    const length = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / length;
    const uy = (y2 - y1) / length;
    const bx = x2 - ux * head;
    const by = y2 - uy * head;
    const wing = head * 0.5;
    const n = (value: number) => value.toFixed(1);
    return (
      `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}` +
      `M${n(bx - uy * wing)} ${n(by + ux * wing)}L${n(x2)} ${n(y2)}L${n(bx + uy * wing)} ${n(by - ux * wing)}`
    );
  };
  const line = (element: SVGLineElement, x1: number, y1: number, x2: number, y2: number) => {
    element.setAttribute('x1', x1.toFixed(1));
    element.setAttribute('y1', y1.toFixed(1));
    element.setAttribute('x2', x2.toFixed(1));
    element.setAttribute('y2', y2.toFixed(1));
  };

  // The figure leans a little toward the pointer. It is a lean, not a turn:
  // the plan stays a plan.
  const sway = { yaw: 0, tilt: 0, toYaw: 0, toTilt: 0, frame: 0 };
  const quad = (points: [number, number][]) =>
    'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';

  function render() {
    const upright = clamp(state[1]! / (30 * DEGREE), 0, 1);
    const view: View = {
      yaw: state[0]! + sway.yaw * upright,
      tilt: state[1]! + sway.tilt * upright,
      zoom: state[2]!,
      ox: state[3]!,
      oy: state[4]!,
    };
    const lift = state[5]!;
    ground.setAttribute('transform', groundTransform(view));
    // The side of anything that faces the reader depends on the turn.
    const nearX = Math.sin(view.yaw) < 0 ? 0 : 1;
    const at = (x: number, y: number, z = 0) => project(view, x, y, z);
    {
      const side = nearX * groundWidth;
      slab[0]!.setAttribute(
        'd',
        quad([at(0, groundDepth), at(groundWidth, groundDepth), at(groundWidth, groundDepth, -SLAB), at(0, groundDepth, -SLAB)]),
      );
      slab[1]!.setAttribute(
        'd',
        quad([at(side, 0), at(side, groundDepth), at(side, groundDepth, -SLAB), at(side, 0, -SLAB)]),
      );
    }
    // Seen from above, the lines down to the ground would lie on top of it.
    wires.style.opacity = String(clamp(view.tilt / (25 * DEGREE), 0, 1));
    shrink = clamp(view.zoom / 0.9, 0.86, 1);
    const sized = (part: Part) => [part.width * shrink, part.height * shrink] as const;

    for (const part of lemmas) {
      const centre = columnAt(part.index) + COLUMN / 2;
      [part.x, part.y] = project(view, centre, LEMMA_Y, (LEMMA_Z + RISE * riseOf(part.index)) * lift);
      const [width, height] = sized(part);
      place(part, part.x - width / 2, part.y - height);
      const [fx, fy] = project(view, centre, LEMMA_Y, 0);
      line(drops[part.index]!, part.x, part.y, fx, fy);
    }
    for (const part of grounds) {
      [part.x, part.y] = project(view, -12, rowAt(part.index) + ROW / 2);
      const [width, height] = sized(part);
      place(part, part.x - width, part.y - height / 2);
    }
    for (const part of tops) {
      [part.x, part.y] = project(view, topX(part.index), TOP_Y, TOP_Z * lift);
      const [width, height] = sized(part);
      place(part, part.x - width / 2, part.y - height);
    }

    const half = PAIR / 2;
    for (const pair of pairs) {
      const x = columnAt(pair.lemma) + COLUMN / 2;
      const y = rowAt(pair.row) + ROW / 2;
      const h = heightOf(pair.index) * lift;
      const side = x + (nearX ? half : -half);
      pair.faces[0].setAttribute(
        'd',
        quad([at(side, y - half, h), at(side, y + half, h), at(side, y + half), at(side, y - half)]),
      );
      pair.faces[1].setAttribute(
        'd',
        quad([at(x - half, y + half, h), at(x + half, y + half, h), at(x + half, y + half), at(x - half, y + half)]),
      );
      pair.faces[2].setAttribute(
        'd',
        quad([at(x - half, y - half, h), at(x + half, y - half, h), at(x + half, y + half, h), at(x - half, y + half, h)]),
      );
      const from = lemmas[pair.lemma]!;
      const [tx, ty] = at(x, y, h);
      line(pair.wire, from.x, from.y, tx, ty);
      pair.depth = x * Math.sin(view.yaw) + y * Math.cos(view.yaw);
    }
    // Nearer blocks are drawn over farther ones.
    const order = [...pairs].sort((a, b) => a.depth - b.depth);
    const key = order.map((pair) => pair.index).join(',');
    if (key !== stacking) {
      stacking = key;
      blocks.append(...order.map((pair) => pair.block));
    }

    if (claim) {
      // The lines meet the claim side by side, in the order of the columns.
      const spread = Math.min(26, (claim.width * shrink - 24) / Math.max(columns - 1, 1));
      for (const part of lemmas) {
        const slot = columnAt(part.index) / COLUMN - (columns - 1) / 2;
        proofs[part.index]!.setAttribute(
          'd',
          arrow(part.x, part.y - part.height * shrink - 3, claim.x + slot * spread, claim.y + 4),
        );
      }
    }
    links.forEach((path, index) => {
      const from = tops[index]!;
      const to = tops[index + 1]!;
      const x1 = from.x + (from.width * shrink) / 2 + 5;
      const x2 = to.x - (to.width * shrink) / 2 - 5;
      const y1 = from.y - (from.height * shrink) / 2;
      const y2 = to.y - (to.height * shrink) / 2;
      path.setAttribute(
        'd',
        index === links.length - 1
          ? `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`
          : arrow(x1, y1, x2, y2, 6.5),
      );
    });
  }

  function go(duration = 760) {
    flat = false;
    stop();
    stop = animate(state, target(), still.matches ? 0 : duration, render);
  }

  /** Let what is pointed at rise, without disturbing the first standing-up. */
  function nudge() {
    if (flat || drag?.moved) return;
    go(340);
  }

  /** Lean toward a point of the stage, given from -0.5 to 0.5 each way. */
  function lean(x: number, y: number) {
    if (still.matches || flat) return;
    sway.toYaw = -x * 7 * DEGREE;
    sway.toTilt = -y * 5 * DEGREE;
    if (sway.frame) return;
    const step = () => {
      sway.yaw += (sway.toYaw - sway.yaw) * 0.09;
      sway.tilt += (sway.toTilt - sway.tilt) * 0.09;
      render();
      const settled = Math.abs(sway.toYaw - sway.yaw) < 0.0004 && Math.abs(sway.toTilt - sway.tilt) < 0.0004;
      sway.frame = settled || signal.aborted ? 0 : requestAnimationFrame(step);
    };
    sway.frame = requestAnimationFrame(step);
  }

  // ----- Light: what is related to the part under the pointer or selected -----
  function light() {
    const id = hover ?? focus;
    const part = id ? parts.get(id) : undefined;
    const lit = new Set<string>();
    if (part) {
      lit.add(part.id);
      if (part.level === 'lemma') {
        if (claim) lit.add(claim.id);
        for (const other of grounds) if (exercises(part.index, other.index)) lit.add(other.id);
      } else if (part.level === 'ground') {
        for (const other of lemmas) if (exercises(other.index, part.index)) lit.add(other.id);
      } else if (part === claim) {
        for (const other of [...lemmas, ...tops]) lit.add(other.id);
      } else {
        for (const other of tops) if (Math.abs(other.index - part.index) === 1) lit.add(other.id);
      }
    }
    root.toggleAttribute('data-active', lit.size > 0);
    for (const other of parts.values()) other.el.toggleAttribute('data-lit', lit.has(other.id));
    for (const pair of pairs) {
      const on = lit.has(lemmas[pair.lemma]!.id) && lit.has(grounds[pair.row]!.id);
      pair.block.toggleAttribute('data-lit', on);
      pair.wire.toggleAttribute('data-lit', on);
    }
    proofs.forEach((path, index) =>
      path.toggleAttribute('data-lit', Boolean(claim && lit.has(claim.id) && lit.has(lemmas[index]!.id))),
    );
    links.forEach((path, index) =>
      path.toggleAttribute('data-lit', lit.has(tops[index]!.id) && lit.has(tops[index + 1]!.id)),
    );
  }

  // ----- Selection -----
  const fromAddress = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    return parts.has(id) ? id : null;
  };

  function select(id: string | null, record = true) {
    const previous = focus;
    if (id === previous) return;
    focus = id;
    for (const part of parts.values()) {
      const on = String(part.id === id);
      if (part.level === 'ground') part.el.setAttribute('aria-pressed', on);
      else part.el.setAttribute('aria-expanded', on);
    }
    const panel = id ? root.querySelector<HTMLTemplateElement>(`template[data-panel="${id}"]`) : null;
    if (panel) {
      dockBody.replaceChildren(panel.content.cloneNode(true));
      dockBody.scrollTop = 0;
      dock.inert = false;
      dock.setAttribute('data-open', '');
    } else {
      dock.inert = true;
      dock.removeAttribute('data-open');
    }
    if (id) setRoving(id);
    announce(id);
    reorder();
    light();
    go();
    // The selection is part of the address, so it can be linked to and the
    // back button undoes it.
    if (record) {
      if (id) {
        if (previous) window.history.replaceState(null, '', `#${id}`);
        else window.history.pushState(null, '', `#${id}`);
      } else if (fromAddress()) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    }
  }

  function setRoving(id: string) {
    roving = id;
    for (const part of parts.values()) part.el.tabIndex = part.id === id ? 0 : -1;
  }

  /** The part an arrow key leads to from this one, along the drawing. */
  function towards(part: Part, key: string): Part | undefined {
    if (part.level === 'lemma') {
      const slot = columnOrder.indexOf(part.index);
      if (key === 'ArrowLeft') return lemmas[columnOrder[slot - 1] ?? -1];
      if (key === 'ArrowRight') return lemmas[columnOrder[slot + 1] ?? -1];
      if (key === 'ArrowUp') return claim;
      return grounds[rowOrder.find((row) => exercises(part.index, row)) ?? -1];
    }
    if (part.level === 'ground') {
      const slot = rowOrder.indexOf(part.index);
      if (key === 'ArrowDown') return grounds[rowOrder[slot + 1] ?? -1];
      const above = lemmas[columnOrder.find((lemma) => exercises(lemma, part.index)) ?? columnOrder[0]!];
      if (key === 'ArrowUp') return slot === 0 ? above : grounds[rowOrder[slot - 1] ?? -1];
      if (key === 'ArrowRight') return above;
      return undefined;
    }
    if (key === 'ArrowLeft') return tops[part.index - 1];
    if (key === 'ArrowRight') return tops[part.index + 1];
    if (key === 'ArrowDown') {
      const slot = Math.round((part.index / Math.max(tops.length - 1, 1)) * (columns - 1));
      return lemmas[columnOrder[slot]!];
    }
    return undefined;
  }

  // ----- Listening -----
  const partOf = (target: EventTarget | null) => {
    const el = target instanceof Element ? target.closest<HTMLElement>('[data-node]') : null;
    return el ? parts.get(el.dataset.node ?? '') : undefined;
  };
  const inDock = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest('[data-dock]'));

  let drag: { x: number; y: number; yaw: number; tilt: number; moved: boolean; touch: boolean } | undefined;
  let suppressClick = false;

  stage.addEventListener(
    'click',
    (event) => {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      if (inDock(event.target)) {
        const element = event.target as Element;
        const hop = element.closest<HTMLElement>('[data-goto]');
        if (hop?.dataset.goto) {
          select(hop.dataset.goto);
          parts.get(hop.dataset.goto)?.el.focus({ preventScroll: true });
        } else if (element.closest('[data-dock-close]')) {
          const last = focus;
          select(null);
          if (last) parts.get(last)?.el.focus({ preventScroll: true });
        }
        return;
      }
      const part = partOf(event.target);
      if (!part) {
        select(null);
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.detail > 0) {
        rest = { x: event.clientX, y: event.clientY };
        hover = null;
      }
      // A part that is already selected and is a link is followed.
      if (focus === part.id && part.el instanceof HTMLAnchorElement) return;
      event.preventDefault();
      select(focus === part.id ? null : part.id);
    },
    { signal },
  );

  // A selection moves the parts, and one of them may come to rest under a
  // pointer that has not moved. That is not pointing at it: after a click the
  // pointer has to travel a little before it lights anything again.
  let rest: { x: number; y: number } | undefined;
  stage.addEventListener(
    'pointerover',
    (event) => {
      const id = partOf(event.target)?.id ?? null;
      if (id === hover || drag?.moved || rest) return;
      hover = id;
      light();
      nudge();
    },
    { signal },
  );
  stage.addEventListener(
    'pointermove',
    (event) => {
      if (!rest || Math.hypot(event.clientX - rest.x, event.clientY - rest.y) < 6) return;
      rest = undefined;
      const id = partOf(event.target)?.id ?? null;
      if (id === hover) return;
      hover = id;
      light();
      nudge();
    },
    { signal },
  );
  stage.addEventListener(
    'pointerleave',
    () => {
      hover = null;
      light();
      nudge();
      lean(0, 0);
    },
    { signal },
  );
  stage.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || drag || inDock(event.target)) return;
      const box = stage.getBoundingClientRect();
      lean((event.clientX - box.left) / box.width - 0.5, (event.clientY - box.top) / box.height - 0.5);
    },
    { signal },
  );
  stage.addEventListener(
    'focusin',
    (event) => {
      const part = partOf(event.target);
      if (!part) return;
      setRoving(part.id);
      hover = part.id;
      light();
      nudge();
    },
    { signal },
  );
  stage.addEventListener(
    'focusout',
    () => {
      hover = null;
      light();
      nudge();
    },
    { signal },
  );

  stage.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && focus) {
        const last = focus;
        select(null);
        parts.get(last)?.el.focus({ preventScroll: true });
        return;
      }
      const part = partOf(event.target);
      if (!part || inDock(event.target)) return;
      if (event.key === ' ' && part.el instanceof HTMLAnchorElement) {
        event.preventDefault();
        part.el.click();
        return;
      }
      if (!event.key.startsWith('Arrow')) return;
      event.preventDefault();
      towards(part, event.key)?.el.focus({ preventScroll: true });
    },
    { signal },
  );

  // Turning the figure. A touch turns it left and right only, so a vertical
  // swipe still scrolls the page.
  stage.addEventListener(
    'pointerdown',
    (event) => {
      if (event.button !== 0 || partOf(event.target) || inDock(event.target)) return;
      drag = {
        x: event.clientX,
        y: event.clientY,
        yaw: angles.yaw,
        tilt: angles.tilt,
        moved: false,
        touch: event.pointerType === 'touch',
      };
    },
    { signal },
  );
  stage.addEventListener(
    'pointermove',
    (event) => {
      if (!drag) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.moved) {
        if (Math.hypot(dx, dy) < 5) return;
        drag.moved = true;
        stage.setPointerCapture(event.pointerId);
        root.setAttribute('data-dragging', '');
      }
      angles = {
        yaw: clamp(drag.yaw + dx * 0.004, -42 * DEGREE, 42 * DEGREE),
        tilt: drag.touch ? drag.tilt : clamp(drag.tilt - dy * 0.004, 0, 70 * DEGREE),
      };
      go(0);
    },
    { signal },
  );
  const release = () => {
    if (!drag) return;
    if (drag.moved) {
      suppressClick = true;
      window.setTimeout(() => (suppressClick = false), 0);
      root.removeAttribute('data-dragging');
      // Nearly from above is meant as from above.
      if (angles.tilt < 9 * DEGREE) angles = { ...PLAN };
      showView();
      go(420);
    }
    drag = undefined;
  };
  stage.addEventListener('pointerup', release, { signal });
  stage.addEventListener('pointercancel', release, { signal });

  function showView() {
    const plan = angles.tilt === 0;
    for (const button of switcher.querySelectorAll<HTMLButtonElement>('button[data-view]')) {
      button.setAttribute('aria-pressed', String((button.dataset.view === 'plan') === plan));
    }
  }
  switcher.addEventListener(
    'click',
    (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-view]');
      if (!button) return;
      angles = button.dataset.view === 'plan' ? { ...PLAN } : { ...AXONOMETRIC };
      showView();
      go(1000);
    },
    { signal },
  );

  window.addEventListener('popstate', () => select(fromAddress(), false), { signal });

  /** Set until the figure has stood up for the first time. */
  let flat = false;
  const lieFlat = () => {
    stop();
    angles = { ...PLAN };
    state.splice(0, state.length, ...target());
    state[5] = 0;
    for (const pair of pairs) state[HEIGHTS + pair.index] = 0;
    angles = { ...AXONOMETRIC };
    render();
  };
  const resized = new ResizeObserver(() => {
    measure();
    if (flat) lieFlat();
    else go(0);
  });

  // ----- First frame -----
  measure();
  setRoving(roving);
  const initial = fromAddress();
  let watcher: IntersectionObserver | undefined;
  if (initial || still.matches) {
    if (initial) select(initial, false);
    stop();
    state.splice(0, state.length, ...target());
    render();
    root.setAttribute('data-ready', '');
    if (initial) stage.scrollIntoView({ block: 'center' });
  } else {
    // The one moment of the page that is not an answer to the reader: the
    // figure starts flat, as the matrix, and stands up once it is in view.
    flat = true;
    lieFlat();
    root.setAttribute('data-ready', '');
    watcher = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        watcher?.disconnect();
        window.setTimeout(() => {
          if (signal.aborted || !flat) return;
          flat = false;
          go(1500);
        }, 350);
      },
      { threshold: 0.3 },
    );
    watcher.observe(stage);
  }
  resized.observe(stage);
  void document.fonts?.ready.then(() => {
    if (signal.aborted) return;
    measure();
    if (root.hasAttribute('data-ready')) render();
  });

  return {
    destroy() {
      listeners.abort();
      cancelAnimationFrame(sway.frame);
      resized.disconnect();
      watcher?.disconnect();
      stop();
      for (const name of ['data-scene', 'data-ready', 'data-active', 'data-dragging']) root.removeAttribute(name);
      for (const part of parts.values()) {
        part.el.style.transform = '';
        for (const name of ['tabindex', 'data-lit', 'aria-expanded', 'aria-controls', 'aria-pressed']) {
          part.el.removeAttribute(name);
        }
      }
      ink.replaceChildren();
      dockBody.replaceChildren();
      dock.removeAttribute('data-open');
      dock.hidden = true;
      switcher.hidden = true;
    },
  };
}
