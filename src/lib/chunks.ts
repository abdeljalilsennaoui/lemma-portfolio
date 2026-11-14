/**
 * Where the chunks of a text fall, by the rule of the Local AI Study
 * Assistant: each chunk is at most `size` characters, the next one starts
 * `overlap` characters before the last one ended, and always at least one
 * character further on, so the loop cannot stall.
 *
 * This is a model for the figure in the case study. It cuts at the exact
 * character; the project then looks back for a readable boundary.
 *
 * Returns how many chunks there are and the spans of the first `limit`.
 */
export function chunkSpans(
  length: number,
  size: number,
  overlap: number,
  limit = Infinity,
): { count: number; spans: [start: number, end: number][] } {
  const spans: [number, number][] = [];
  if (length <= size) return { count: 1, spans: [[0, length]] };
  let count = 0;
  let start = 0;
  while (start < length) {
    const end = Math.min(start + size, length);
    if (spans.length < limit) spans.push([start, end]);
    count += 1;
    if (end >= length) break;
    start = Math.max(end - overlap, start + 1);
  }
  return { count, spans };
}
