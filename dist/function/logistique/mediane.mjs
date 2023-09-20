export function mediane(tableau) {
    const sortedArray = [...tableau].sort((a, b) => a - b); // Triez le tableau dans l'ordre croissant
    const length = sortedArray.length;
    if (length % 2 === 1) {
        // Si la longueur est impaire
        return sortedArray[Math.floor(length / 2)]; // Élément du milieu
    }
    else {
        // Si la longueur est paire
        const middle1 = sortedArray[length / 2 - 1];
        const middle2 = sortedArray[length / 2];
        return (middle1 + middle2) / 2; // Moyenne des deux éléments du milieu
    }
}
