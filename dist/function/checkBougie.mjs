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
import { fetchRsi } from './fetchRsi.mjs';;
import { checkDateTime } from './checkDateTime.mjs';;
// Check pour 2 rouge puis 2 vertes
export function checkBougie(stock, start, end, price, minRsi, maxRsi, bougiePattern) {
    return __awaiter(this, void 0, void 0, function* () {
        let actionJours = [];
        let fetchPromises = [];
        let stopLoop = false;
        const bougieConfig = bougiePattern.map((bougie) => {
            return bougie === '1' ? true : false;
        });
        // console.log("bougieConfig",bougieConfig)
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
                            function arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour) {
                                if (bougieConfig.length !== bougiePatternActionEnCour.length) {
                                    return false;
                                }
                                for (let i = 0; i < bougieConfig.length; i++) {
                                    if (bougieConfig[i] !== bougiePatternActionEnCour[i]) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                            // console.log('bougiePatternActionEnCourAvant',stock[i].symbol,bougiePatternActionEnCour);
                            if (arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour)) {
                                // console.log('bougiePatternActionEnCourAprès',stock[i].symbol,bougiePatternActionEnCour);
                                fetchRsi(stock[i].symbol, minRsi, maxRsi)
                                    .then((res) => {
                                    if (res === true) {
                                        actionJours.push(stock[i].symbol);
                                    }
                                })
                                    .catch(() => {
                                    console.log('RSI non trouvé', stock[i].symbol);
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
    });
}
// 3 bougie 1 verte : à voir !
