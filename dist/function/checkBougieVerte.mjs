var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchStocks } from './fetchStocks.mjs';;
import { checkIfPositive } from './checkIfPositive.mjs';;
import fetch from 'node-fetch';
// Check pour 2 rouge puis 2 vertes
export function checkBougieVerte(stock, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        let action2joursPositifs = [];
        let fetchPromises = [];
        let stopLoop = false;
        for (let i = start; i < end; i++) {
            if (stopLoop) {
                break;
            }
            try {
                const fetchPromise = fetchStocks(stock[i].symbol, 4)
                    .then((res) => {
                    var _a, _b, _c, _d, _e, _f;
                    //Endroit prix action minimum
                    if (parseFloat((_a = res.values) === null || _a === void 0 ? void 0 : _a[0].close) > 20) {
                        if (((_c = (_b = res.values) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.datetime) &&
                            ((_d = res.values) === null || _d === void 0 ? void 0 : _d[1].datetime) &&
                            ((_f = (_e = res.values) === null || _e === void 0 ? void 0 : _e[2]) === null || _f === void 0 ? void 0 : _f.datetime)) {
                            const day1 = checkIfPositive(res.values[0].open, res.values[0].close);
                            const day2 = checkIfPositive(res.values[1].open, res.values[1].close);
                            const day3 = checkIfPositive(res.values[2].open, res.values[2].close);
                            const day4 = checkIfPositive(res.values[3].open, res.values[3].close);
                            if (day1 === true &&
                                day2 === true &&
                                day3 === false &&
                                day4 === false) {
                                // faudra typer + truc bizare tous ne passe pas reprendre la meme forme que fetch stock!!!
                                function fetchRsi(symbol) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        yield fetch(`https://api.twelvedata.com/rsi?symbol=${stock[i].symbol}&interval=1day&time_period=34&apikey=b914fed0677e48cdaf1938b5be42956d`)
                                            .then((res) => {
                                            return res.json();
                                        })
                                            .then((res) => {
                                            console.log(`${stock[i].symbol}` + " " + res.values[0].rsi);
                                            if (res.values[0].rsi > 50) {
                                                action2joursPositifs.push(stock[i].symbol);
                                            }
                                        })
                                            .catch(() => {
                                            console.log('RSI non trouvé', stock[i].symbol);
                                        });
                                    });
                                }
                                fetchRsi(stock[i].symbol);
                            }
                        }
                        else {
                            console.error("Les données n'ont pas de datetime.");
                        }
                    }
                })
                    .catch(() => {
                    console.error('function fetchStock potentielement problème ! ');
                });
                fetchPromises.push(fetchPromise);
            }
            catch (_a) {
                console.log(`L'index ${i} n'existe pas`);
                stopLoop = true;
            }
        }
        yield Promise.all(fetchPromises).catch((error) => {
            console.error("Erreur lors de l'exécution des promesses :", error);
        });
        return action2joursPositifs;
    });
}
