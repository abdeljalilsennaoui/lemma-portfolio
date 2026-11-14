/**
 * Axonometric drawing: a parallel projection of a small three-dimensional
 * model onto the screen, the way an engineering drawing shows one.
 *
 * The model's ground is the x–y plane and z is height. The view turns the
 * model about the vertical axis (`yaw`) and tips it toward the reader
 * (`tilt`): a tilt of 0 looks straight down and gives the plan, where height
 * disappears. Parallel lines stay parallel, so a flat part of the model can
 * be drawn once and placed with a single affine transform.
 */
export interface View {
  /** Rotation about the vertical axis, in radians. */
  yaw: number;
  /** 0 is the plan, seen from above; π/2 would be the elevation. */
  tilt: number;
  /** Screen pixels per model unit. */
  zoom: number;
  /** Where the model's origin falls on the screen. */
  ox: number;
  oy: number;
}

export type Point = readonly [x: number, y: number, z?: number];

export function project(view: View, x: number, y: number, z = 0): [number, number] {
  const cos = Math.cos(view.yaw);
  const sin = Math.sin(view.yaw);
  return [
    view.ox + view.zoom * (x * cos - y * sin),
    view.oy + view.zoom * ((x * sin + y * cos) * Math.cos(view.tilt) - z * Math.sin(view.tilt)),
  ];
}

/** The SVG transform that places anything drawn on the ground plane. */
export function groundTransform(view: View): string {
  const cos = Math.cos(view.yaw);
  const sin = Math.sin(view.yaw);
  const flat = Math.cos(view.tilt);
  const n = (value: number) => value.toFixed(4);
  return `matrix(${n(view.zoom * cos)} ${n(view.zoom * sin * flat)} ${n(-view.zoom * sin)} ${n(view.zoom * cos * flat)} ${n(view.ox)} ${n(view.oy)})`;
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The zoom and origin that set a group of model points inside a box on the
 * screen, centred, at the given angles. Points in `heightOnly` must fit
 * between the top and bottom of the box but may run off its sides.
 */
export function frame(
  points: Point[],
  angles: Pick<View, 'yaw' | 'tilt'>,
  box: Box,
  zoomRange: [min: number, max: number],
  heightOnly: Point[] = [],
): Pick<View, 'zoom' | 'ox' | 'oy'> {
  const unit: View = { ...angles, zoom: 1, ox: 0, oy: 0 };
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [x, y, z] of points) {
    const [sx, sy] = project(unit, x, y, z);
    minX = Math.min(minX, sx);
    maxX = Math.max(maxX, sx);
    minY = Math.min(minY, sy);
    maxY = Math.max(maxY, sy);
  }
  for (const [x, y, z] of heightOnly) {
    const [, sy] = project(unit, x, y, z);
    minY = Math.min(minY, sy);
    maxY = Math.max(maxY, sy);
  }
  const spanX = Math.max(maxX - minX, 1);
  const spanY = Math.max(maxY - minY, 1);
  const zoom = Math.min(Math.max(Math.min(box.width / spanX, box.height / spanY), zoomRange[0]), zoomRange[1]);
  // What does not fit is kept against the left and the top, not centred.
  return {
    zoom,
    ox: box.x + Math.max(0, (box.width - spanX * zoom) / 2) - minX * zoom,
    oy: box.y + Math.max(0, (box.height - spanY * zoom) / 2) - minY * zoom,
  };
}

/** Slow at both ends: the pace of a camera that starts and settles. */
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Move a list of numbers from where they are to where they should be,
 * calling `draw` on every frame. Returns a function that stops the motion
 * where it stands, so a new one can start from there.
 */
export function animate(
  values: number[],
  target: readonly number[],
  duration: number,
  draw: () => void,
  done?: () => void,
): () => void {
  const start = values.slice();
  if (duration <= 0) {
    for (let i = 0; i < values.length; i += 1) values[i] = target[i] ?? start[i]!;
    draw();
    done?.();
    return () => {};
  }
  let frameId = 0;
  let began = 0;
  const step = (now: number) => {
    if (!began) began = now;
    const t = Math.min((now - began) / duration, 1);
    const eased = easeInOut(t);
    for (let i = 0; i < values.length; i += 1) {
      values[i] = start[i]! + ((target[i] ?? start[i]!) - start[i]!) * eased;
    }
    draw();
    if (t < 1) frameId = requestAnimationFrame(step);
    else done?.();
  };
  frameId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frameId);
}
