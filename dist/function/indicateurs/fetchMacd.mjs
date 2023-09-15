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
export function fetchMacd(symbol, nbJour, macd) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(`https://api.twelvedata.com/macd?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`)
            .then((res) => {
            return res.json();
        })
            .then((res) => {
            const macdVerif = [];
            if (macd !== 666) {
                if (parseFloat(res.values[0].macd) > macd) {
                    macdVerif.push(true);
                }
                else {
                    macdVerif.push(false);
                }
            }
            else {
                macdVerif.push(true);
            }
            if (parseFloat(res.values[0].macd) >= parseFloat(res.values[0].macd_signal)) {
                macdVerif.push(true);
            }
            else {
                macdVerif.push(false);
            }
            if (macdVerif.includes(false)) {
                return false;
            }
            else {
                return true;
            }
        });
    });
}
// fetchMacd('IBKR', 1,666).then((res) => {
//   console.log('macd', res);
// });
