export function isIntegerNumber(str) {
  if (!str.length) return true;
  return /^\d+$/.test(str);
}

export function isDecimalNumber(str) {
  if (!str.length) return true;
  const strArr = str.split(".");
  if (strArr.length > 2) return false;
  return strArr.filter((n) => !isIntegerNumber(n)).length === 0;
}
