export function round(input: number, dp = 2) {
  const factor = Math.pow(10, dp);

  return Math.round(input * factor) / factor;
}
