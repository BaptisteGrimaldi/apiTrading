export function checkDateTime(bougiePattern, res) {
    var _a, _b;
    for (let x = 0; x < bougiePattern.length; x++) {
        try {
            if ((_b = (_a = res.values) === null || _a === void 0 ? void 0 : _a[x]) === null || _b === void 0 ? void 0 : _b.datetime) {
                if (x === bougiePattern.length - 1) {
                    return true;
                }
            }
        }
        catch (_c) {
            return false;
        }
    }
    console.log("pas normal que ca s'exécute");
    return false;
}
