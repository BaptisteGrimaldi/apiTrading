export function waitPromesse(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("promesse d'attente finis");
            resolve();
        }, ms);
    });
}
