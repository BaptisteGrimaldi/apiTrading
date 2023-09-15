import { valueStock } from "../types/valueStock";

export function checkDateTime(
  bougiePattern: string[],
  res: valueStock
): boolean {
  for (let x = 0; x < bougiePattern.length; x++) {
    try {
      if (res.values?.[x]?.datetime) {
        if (x === bougiePattern.length - 1) {
          return true;
        }
      }
    } catch {
      return false;
    }
  }
  console.log("pas normal que ca s'exécute");
  return false;
}
