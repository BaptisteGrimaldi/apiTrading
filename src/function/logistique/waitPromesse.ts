export function waitPromesse(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // console.log("promesse d'attente finis");
      resolve();
    }, ms);
  });
}
