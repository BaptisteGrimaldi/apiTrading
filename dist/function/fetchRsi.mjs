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
            // console.log(`${symbolStock}` + ' avant ' + res.values[0].rsi);
            if (res.values[0].rsi >= minRsi && res.values[0].rsi <= maxRsi) {
                console.log(`${symbolStock}` + ' après ' + res.values[0].rsi);
                return true;
            }
            else {
                return false;
            }
        });
    });
}
