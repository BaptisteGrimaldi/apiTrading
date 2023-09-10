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
export function fetchStockastique(symbol, nbJour, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verifBleuEtOrange = [];
            return yield fetch(`https://api.twelvedata.com/stoch?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`)
                .then((res) => {
                return res.json();
            })
                .then((res) => {
                // console.log('res', res);
                if (stochastiqueSlowKmin !== undefined &&
                    stochoastiqueSlowKmax !== undefined &&
                    (stochastiqueSlowKmin !== 666 || stochoastiqueSlowKmax !== 666)) {
                    if (parseFloat(res.values[0].slow_k) >= stochastiqueSlowKmin &&
                        parseFloat(res.values[0].slow_k) <= stochoastiqueSlowKmax &&
                        parseFloat(res.values[0].slow_k) > parseFloat(res.values[0].slow_d)) {
                        verifBleuEtOrange.push(true);
                    }
                    else {
                        verifBleuEtOrange.push(false);
                    }
                }
                else {
                    verifBleuEtOrange.push(true);
                }
                if (stochastiqueSlowKmin === 666 && stochoastiqueSlowKmax === 666) {
                    if (parseFloat(res.values[0].slow_k) > parseFloat(res.values[0].slow_d)) {
                        verifBleuEtOrange.push(true);
                    }
                    else {
                        verifBleuEtOrange.push(false);
                    }
                }
                else {
                    verifBleuEtOrange.push(true);
                }
                if (typeof ecartSlowkSlowd === 'number') {
                    if (parseFloat(res.values[0].slow_k) >
                        parseFloat(res.values[0].slow_d) + ecartSlowkSlowd) {
                        verifBleuEtOrange.push(true);
                    }
                    else {
                        verifBleuEtOrange.push(false);
                    }
                }
                if (verifBleuEtOrange.includes(false)) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
        catch (error) {
            console.error("L'index de l'action fetchSochastique n'existe pas");
            return false;
        }
    });
}
// fetchStockastique('CHSCM', 1,110,120).then((res) => {
//   console.log('res', res);
// });
