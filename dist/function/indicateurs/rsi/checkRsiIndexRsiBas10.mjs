var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
export function checkRsiIndexRsiBas10(listeActionPattern, bougiePattern) {
    return __awaiter(this, void 0, void 0, function* () {
        const actionRsiPatternOk = [];
        const promises = [];
        for (const action of listeActionPattern) {
            const promise = yield fetch(`https://api.twelvedata.com/rsi?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
                .then((res) => res.json())
                .then((res) => {
                const tableauPatternRsi = [];
                for (let i = 0; i < bougiePattern.length; i++) {
                    if (bougiePattern[i] === '1') {
                        if (parseFloat(res.values[i].rsi) >= 33) {
                            tableauPatternRsi.push(true);
                        }
                        else {
                            tableauPatternRsi.push(false);
                        }
                    }
                    if (bougiePattern[i] === '0') {
                        if (parseFloat(res.values[i].rsi) <= 30) {
                            tableauPatternRsi.push(true);
                        }
                        else {
                            tableauPatternRsi.push(false);
                        }
                    }
                }
                if (tableauPatternRsi[0] && tableauPatternRsi[tableauPatternRsi.length - 1]) {
                    actionRsiPatternOk.push(action);
                }
            });
            promises.push(promise);
        }
        yield Promise.all(promises);
        return actionRsiPatternOk;
    });
}
// checkRsiIndex(['AAPL', 'MSFT', 'TSLA'], ['1', '0'])
