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
import { checkBougieVerte } from './function/checkBougieVerte.mjs';;
const nasdaqStock = fetchStocksList('Nasdaq').then((res) => {
    return res.data;
});
const nasdaqStockLength = fetchStocksList('Nasdaq').then((res) => {
    return res.data.length;
});
Promise.all([nasdaqStock, nasdaqStockLength])
    .then(([stockData, stockDataLength]) => {
    let listeFinal = [];
    const nombreCycleIteration = Math.ceil(stockDataLength / 500);
    resolveAllIndice(nombreCycleIteration).then(() => {
        console.log('VraiListeFinal', listeFinal);
    });
    function resolveAllIndice(nombreCycleIteration) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let x = 1; x < nombreCycleIteration + 1; x++) {
                console.log('startAttente');
                yield waitPromesse(70000); // Attendez 70 secondes avant chaque itération
                yield checkBougieVerteIteration((x - 1) * 500, x * 500);
            }
        });
    }
    function waitPromesse(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("promesse d'attente finis");
                resolve();
            }, ms);
        });
    }
    function checkBougieVerteIteration(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkBougieVerteResult = yield checkBougieVerte(stockData, start, end);
            listeFinal = listeFinal.concat(checkBougieVerteResult);
            console.log('listeIntermédiaire', listeFinal);
        });
    }
})
    .catch((error) => {
    console.error("Une erreur s'est produite :", error);
});
