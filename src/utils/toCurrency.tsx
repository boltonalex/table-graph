export function toCurrency(numberString: string): string | null {
  if (numberString === null) return null;
  let number = parseFloat(numberString);
  return number.toLocaleString();
}