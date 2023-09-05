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
//C'est le border c'est à fixer ne pas utiliser
export function fetchRsi(symbolAction, minRsi) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(symbolAction,minRsi)
        let urlFetch = `https://api.twelvedata.com/rsi?symbol=${symbolAction}&interval=1day&time_period=34&apikey=b914fed0677e48cdaf1938b5be42956d`;
        yield fetch(urlFetch)
            .then((res) => {
            console.log(urlFetch);
            return res.json();
        })
            .catch(() => {
            console.log('RSI non trouvé', symbolAction);
        });
    });
}
