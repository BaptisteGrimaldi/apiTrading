var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function checkDateTime(bougiePattern, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
