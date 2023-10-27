export function isNotEmptyObj(obj) {
  return Object.keys(obj).length !== 0 && typeof obj === "object" && !Array.isArray(obj) && obj !== null;
}

export function isNotEmptyArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

export function isPosInt(n) {
  if (typeof n === "string") {
    n = parseInt(n);
  }
  return Number.isInteger(n) && n >= 0;
}

export function isString(str) {
  return typeof str === "string";
}
