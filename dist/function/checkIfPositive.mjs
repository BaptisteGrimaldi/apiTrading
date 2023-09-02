export function checkIfPositive(open, close) {
    let openStock = parseInt(open);
    let closeStock = parseInt(close);
    if (closeStock - openStock > 0) {
        return true;
    }
    else {
        return false;
    }
}
