export function replacePrice(price) {
  const formatter = new Intl.NumberFormat('ko');
  return formatter.format(price);
}
