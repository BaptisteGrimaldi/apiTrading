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
export function fetchRsi(symbolStock, minRsi, maxRsi) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(`https://api.twelvedata.com/rsi?symbol=${symbolStock}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
            .then((res) => {
            return res.json();
        })
            .then((res) => {
            if (typeof minRsi === 'number' && typeof maxRsi === 'number') {
                if (parseFloat(res.values[0].rsi) >= minRsi && parseFloat(res.values[0].rsi) <= maxRsi) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                console.log("c'est pas censé arriver");
                return false;
            }
        })
            .catch((err) => {
            console.log('fetch RSI prob');
            return false;
        });
    });
}
