export function snap(
  value: number,
  increment: number,
  fn = Math.floor
): number {
  return fn(value / increment) * increment;
}
