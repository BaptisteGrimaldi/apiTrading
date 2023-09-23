var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkIfPositive } from '../function/logistique/checkIfPositive.mjs';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
import { fetchRsiDateTime } from '../function/indicateurs/rsi/fetchRsiDateTime.mjs';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
import { fetchDataHistoric } from '../function/fetchStock/fetchHistoric.mjs';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
import { moyenneResult } from '../function/logistique/moyenneResult.mjs';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// 19h46 : start
// 20h00 : fin
function backTesting(action) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchDataHistoric(action);
            const bougiePatternActionEnCour = [];
            const dateTimeBougiePatternActionEnCour = [];
            const bougieData = [];
            for (let x = 0; x < data.values.length; x++) {
                try {
                    const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
                    const dateTime = data.values[x].datetime;
                    const openPrice = parseFloat(data.values[x].open);
                    const closePrice = parseFloat(data.values[x].close);
                    const highPrice = parseFloat(data.values[x].high);
                    const lowPrice = parseFloat(data.values[x].low);
                    let gapHaut;
                    let gapBas;
                    const variation = ((closePrice - openPrice) / openPrice) * 100;
                    if (highPrice === openPrice) {
                        gapHaut = 0;
                    }
                    else {
                        gapHaut = ((highPrice - closePrice) / closePrice) * 100;
                    }
                    if (lowPrice === openPrice) {
                        gapBas = 0;
                    }
                    else {
                        gapBas = ((openPrice - lowPrice) / openPrice) * 100;
                    }
                    bougieData.push({ variation: variation, gapHaut: gapHaut, gapBas: gapBas });
                    bougiePatternActionEnCour.push(bougie);
                    dateTimeBougiePatternActionEnCour.push(dateTime);
                }
                catch (_a) {
                    console.log("l'index n'éxiste pas");
                    break;
                }
            }
            return {
                bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
                dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour.reverse(),
                bougieData: bougieData.reverse(),
            };
        }
        catch (error) {
            console.error('backTesting function error');
            throw error;
        }
    });
}
const actionAcheck = process.argv[2];
if (!actionAcheck) {
    console.error('Veuillez spécifier une valeur pour actionAcheck en ligne de commande.');
    process.exit(1);
}
backTesting(actionAcheck)
    .then((res) => {
    const resultSucess = [];
    const resultFail = [];
    function execRsiVerif() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultBougiePattern = res.bougiePatternActionEnCour;
            const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;
            for (let i = 0; i < resultBougiePattern.length; i++) {
                if (resultBougiePattern[i] === false && resultBougiePattern[i + 1] === true) {
                    const day1 = yield fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
                    const day2 = yield fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);
                    if (parseFloat(day1) <= 29 && parseFloat(day2) >= 33 && day1 !== 'error' && day2 !== 'error') {
                        if (resultBougiePattern[i + 2] === true) {
                            resultSucess.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                                bougieDataPlus2Result: res.bougieData[i + 2],
                                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 3],
                                bougieDataPlus3: res.bougieData[i + 3],
                            });
                        }
                        else {
                            resultFail.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                                bougieDataPlus2Result: res.bougieData[i + 2],
                                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 3],
                                bougieDataPlus3: res.bougieData[i + 3],
                            });
                        }
                    }
                }
            }
            console.log('resultSucess', resultSucess);
            console.log('---------------------------------------------------');
            console.log('resultFail', resultFail);
            moyenneResult(resultSucess, resultFail);
        });
    }
    execRsiVerif().catch(() => console.log('Erreur dans execRsiVerif'));
})
    .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
