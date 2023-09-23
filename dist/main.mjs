var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchStocksList } from './function/fetchStock/fetchStocksList.mjs';;
import { analyse } from './function/analyse.mjs';;
import { waitPromesse } from './function/logistique/waitPromesse.mjs';;
import { poserQuestionsEnSeries } from './function/question/questions.mjs';;
import { checkRsiIndexRsiBas10 } from './function/indicateurs/rsi/checkRsiIndexRsiBas10.mjs';;
import { dmiAdx } from './function/indicateurs/dmiAdx.mjs';;
poserQuestionsEnSeries().then((reponsesQuestion) => {
    const exchangeStock = fetchStocksList(reponsesQuestion.indice).then((res) => {
        return res.data;
    });
    const exchangeStockLength = fetchStocksList(reponsesQuestion.indice).then((res) => {
        return res.data.length;
    });
    Promise.all([exchangeStock, exchangeStockLength])
        .then(([stockData, stockDataLength]) => {
        let listeFinal = [];
        const nombreCycleIteration = Math.ceil(stockDataLength / reponsesQuestion.api);
        resolveAllIndice(nombreCycleIteration).then(() => {
            console.log('VraiListeFinal', listeFinal);
        });
        function resolveAllIndice(nombreCycleIteration) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let x = 1; x < nombreCycleIteration + 1; x++) {
                    console.log('startAttente');
                    yield waitPromesse(70000);
                    yield initStrategie((x - 1) * reponsesQuestion.api, x * reponsesQuestion.api);
                }
            });
        }
        function initStrategie(start, end, strat = reponsesQuestion.strategie, price = reponsesQuestion.prix, minRsi = reponsesQuestion.minRsi, maxRsi = reponsesQuestion.maxRsi, stochastiqueSlowKmin = reponsesQuestion.stochastiqueSlowKmin, stochoastiqueSlowKmax = reponsesQuestion.stochastiqueSlowKmax, ecartSlowkSlowd = reponsesQuestion.ecartSlowkSlowd, macd = reponsesQuestion.macd, bougiePattern = reponsesQuestion.bougieConfig, useOrNotUse = reponsesQuestion.useOrNotUse) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (strat) {
                    case 'check2BougiesVertes2Rouges':
                        let strategie = yield analyse(stockData, start, end, price, minRsi, maxRsi, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd, macd, bougiePattern, useOrNotUse);
                        yield addList(strategie);
                        break;
                    case 'rsiBas10':
                        let strategie2 = yield analyse(stockData, start, end, price, minRsi, maxRsi, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd, macd, bougiePattern, useOrNotUse).then((res) => {
                            return checkRsiIndexRsiBas10(res, bougiePattern);
                        });
                        yield addList(strategie2);
                        break;
                    case 'dmiAdx':
                        let strategie3 = yield analyse(stockData, start, end, price, minRsi, maxRsi, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd, macd, bougiePattern, useOrNotUse).then((res) => {
                            return dmiAdx(res);
                        });
                        yield addList(strategie3);
                        break;
                }
            });
        }
        function addList(checkBougieVerteResult) {
            return __awaiter(this, void 0, void 0, function* () {
                listeFinal = listeFinal.concat(checkBougieVerteResult);
                console.log('liste Intermédiaire', listeFinal);
            });
        }
    })
        .catch((error) => {
        console.error("Une erreur s'est produite :", error);
    });
});
