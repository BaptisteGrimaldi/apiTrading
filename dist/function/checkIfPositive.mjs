export function checkIfPositive(open, close) {
    let openStock = parseFloat(open);
    let closeStock = parseFloat(close);
    if (closeStock - openStock >= 0) {
        return true;
    }
    else {
        return false;
    }
}
