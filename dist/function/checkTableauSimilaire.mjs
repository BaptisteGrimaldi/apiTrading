export function arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour) {
    if (bougieConfig.length !== bougiePatternActionEnCour.length) {
        return false;
    }
    for (let i = 0; i < bougieConfig.length; i++) {
        if (bougieConfig[i] !== bougiePatternActionEnCour[i]) {
            return false;
        }
    }
    return true;
}
