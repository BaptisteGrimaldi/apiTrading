var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchStocksList } from './function/fetchStocksList.mjs';;
import { checkBougie } from './function/checkBougie.mjs';;
import { waitPromesse } from './function/waitPromesse.mjs';;
import { poserQuestionsEnSeries } from './function/questions.mjs';;
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
        // Ici le nombre d'appel est limité à 500 par minute
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
        function initStrategie(start, end, strat = reponsesQuestion.strategie, price = reponsesQuestion.prix, minRsi = reponsesQuestion.minRsi, maxRsi = reponsesQuestion.maxRsi, bougiePattern = reponsesQuestion.bougieConfig) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (strat) {
                    case 'check2BougiesVertes2Rouges':
                        let strategie = yield checkBougie(stockData, start, end, price, minRsi, maxRsi, bougiePattern);
                        yield addList(strategie);
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
