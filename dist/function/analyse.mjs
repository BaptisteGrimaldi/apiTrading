var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchStocks } from './fetchStock/fetchStocks.mjs';;
import { checkIfPositive } from './logistique/checkIfPositive.mjs';;
import { fetchRsi } from './indicateurs/rsi/fetchRsi.mjs';;
import { checkDateTime } from './logistique/checkDateTime.mjs';;
import { arraysHaveSameOrder } from './logistique/checkTableauSimilaire.mjs';;
import { fetchStockastique } from './indicateurs/fetchStockastique.mjs';;
import { fetchMacd } from './indicateurs/fetchMacd.mjs';;
export function analyse(stock, start, end, price, minRsi, maxRsi, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd, macd, bougiePattern, useOrNotUse) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bougiePattern !== undefined &&
            useOrNotUse !== undefined &&
            minRsi !== undefined &&
            maxRsi !== undefined &&
            stochastiqueSlowKmin !== undefined &&
            stochoastiqueSlowKmax !== undefined &&
            ecartSlowkSlowd !== undefined &&
            macd !== undefined) {
            let actionJours = [];
            let fetchPromises = [];
            let stopLoop = false;
            const bougieConfig = bougiePattern.map((bougie) => {
                return bougie === '1' ? true : false;
            });
            let useOrNotUseConfig = [
                useOrNotUse.minRsi(),
                useOrNotUse.stochastiqueSlowKmin(),
                useOrNotUse.ecartSlowkSlowd(),
                useOrNotUse.macd(),
            ];
            useOrNotUseConfig = useOrNotUseConfig.filter((value) => value === true);
            // console.log('useOrNotUseConfig', useOrNotUseConfig);
            for (let i = start; i < end; i++) {
                if (stopLoop) {
                    break;
                }
                try {
                    const fetchPromise = yield fetchStocks(stock[i].symbol, bougiePattern.length).then((res) => {
                        var _a;
                        //Endroit prix action minimum
                        if (parseFloat((_a = res.values) === null || _a === void 0 ? void 0 : _a[0].close) > price) {
                            const dateTime = checkDateTime(bougiePattern, res);
                            if (dateTime === true) {
                                const bougiePatternActionEnCour = [];
                                for (let x = 0; x < bougiePattern.length; x++) {
                                    const bougie = checkIfPositive(res.values[x].open, res.values[x].close);
                                    bougiePatternActionEnCour.push(bougie);
                                }
                                if (arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour)) {
                                    const useOrNotUse = [];
                                    function executeAll() {
                                        return __awaiter(this, void 0, void 0, function* () {
                                            if (minRsi !== false &&
                                                maxRsi !== false &&
                                                typeof minRsi === 'number' &&
                                                typeof maxRsi === 'number') {
                                                const res = yield fetchRsi(stock[i].symbol, minRsi, maxRsi);
                                                if (res === true) {
                                                    useOrNotUse.push(true);
                                                }
                                                else {
                                                    return;
                                                }
                                            }
                                            if (typeof stochastiqueSlowKmin === 'number' &&
                                                typeof stochoastiqueSlowKmax === 'number') {
                                                try {
                                                    const res = yield fetchStockastique(stock[i].symbol, 1, stochastiqueSlowKmin, stochoastiqueSlowKmax);
                                                    if (res === true) {
                                                        useOrNotUse.push(true);
                                                    }
                                                    else {
                                                        return;
                                                    }
                                                }
                                                catch (_a) {
                                                    console.log('Erreur stochastiqueSlowKmin');
                                                }
                                            }
                                            if (typeof ecartSlowkSlowd === 'number' &&
                                                typeof stochastiqueSlowKmin === 'number' &&
                                                typeof stochoastiqueSlowKmax === 'number') {
                                                try {
                                                    const res = yield fetchStockastique(stock[i].symbol, 1, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd);
                                                    if (res === true) {
                                                        useOrNotUse.push(true);
                                                    }
                                                    else {
                                                        return;
                                                    }
                                                }
                                                catch (_b) {
                                                    console.log('Erreur ecartSlowkSlowd');
                                                }
                                            }
                                            if (typeof macd === 'number') {
                                                try {
                                                    const res = yield fetchMacd(stock[i].symbol, 1, macd);
                                                    if (res === true) {
                                                        useOrNotUse.push(true);
                                                    }
                                                    else {
                                                        return;
                                                    }
                                                }
                                                catch (_c) {
                                                    console.log('Erreur macd');
                                                }
                                            }
                                        });
                                    }
                                    executeAll().then(() => {
                                        if (arraysHaveSameOrder(useOrNotUseConfig, useOrNotUse)) {
                                            actionJours.push(stock[i].symbol);
                                        }
                                    });
                                }
                            }
                            else {
                                console.error("Les données n'ont pas de datetime.");
                            }
                        }
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
            return actionJours;
        }
        else {
            return [];
        }
    });
}
