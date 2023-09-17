var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkIfPositive } from './function/logistique/checkIfPositive.mjs';;
import { fetchRsiDateTime } from './function/indicateurs/rsi/fetchRsiDateTime.mjs';;
import { fetchDataHistoric } from './function/fetchStock/fetchHistoric.mjs';;
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
                    const variation = ((closePrice - openPrice) / openPrice) * 100;
                    const gapHaut = ((highPrice - closePrice) / closePrice) * 100;
                    const gapBas = ((openPrice - lowPrice) / openPrice) * 100;
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
const actionAcheck = 'AAPL';
backTesting(actionAcheck)
    .then((res) => {
    const resultSucess = [];
    const resultFail = [];
    function execFetchTimeRsi() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultBougiePattern = res.bougiePatternActionEnCour;
            const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;
            for (let i = 0; i < resultBougiePattern.length; i++) {
                if (resultBougiePattern[i] === false && resultBougiePattern[i + 1] === true) {
                    // await waitPromesse(500);
                    const day1 = yield fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
                    const day2 = yield fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);
                    if (parseFloat(day1) <= 29 && parseFloat(day2) >= 34 && day1 !== 'error' && day2 !== 'error') {
                        if (resultBougiePattern[i + 2] === true) {
                            resultSucess.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                                bougieDataPlus2Result: res.bougieData[i + 2],
                                bougieDataPlus3: res.bougiePatternActionEnCour[i + 3],
                            });
                        }
                        else {
                            resultFail.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                                bougieDataPlus2Result: res.bougieData[i + 2],
                                bougieDataPlus3: res.bougiePatternActionEnCour[i + 3],
                            });
                        }
                    }
                }
            }
            console.log('resultSucess', resultSucess);
            console.log('---------------------------------------------------');
            console.log('resultFail', resultFail);
            const moyenneVariationSucess = [];
            const moyenneGapHautSucess = [];
            const moyenneGapBasSucess = [];
            for (const result of resultSucess) {
                moyenneVariationSucess.push(result.bougieDataPlus1Variation);
                moyenneGapHautSucess.push(result.bougieDataPlus2Result.gapHaut);
                moyenneGapBasSucess.push(result.bougieDataPlus2Result.gapBas);
            }
            const moyenneVariationFail = [];
            const moyenneGapHautFail = [];
            const moyenneGapBasFail = [];
            for (const result of resultFail) {
                moyenneVariationFail.push(result.bougieDataPlus1Variation);
                moyenneGapHautFail.push(result.bougieDataPlus2Result.gapHaut);
                moyenneGapBasFail.push(result.bougieDataPlus2Result.gapBas);
            }
            const moyenneVariationSucessResult = moyenneVariationSucess.reduce((a, b) => a + b, 0) / moyenneVariationSucess.length;
            const moyenneGapHautSucessResult = moyenneGapHautSucess.reduce((a, b) => a + b, 0) / moyenneGapHautSucess.length;
            const moyenneGapBasSucessResult = moyenneGapBasSucess.reduce((a, b) => a + b, 0) / moyenneGapBasSucess.length;
            const moyenneVariationFailResult = moyenneVariationFail.reduce((a, b) => a + b, 0) / moyenneVariationFail.length;
            const moyenneGapHautFailResult = moyenneGapHautFail.reduce((a, b) => a + b, 0) / moyenneGapHautFail.length;
            const moyenneGapBasFailResult = moyenneGapBasFail.reduce((a, b) => a + b, 0) / moyenneGapBasFail.length;
            console.log('moyenneVariationSucessResult', moyenneVariationSucessResult);
            console.log('moyenneGapHautSucessResult', moyenneGapHautSucessResult);
            console.log('moyenneGapBasSucessResult', moyenneGapBasSucessResult);
            console.log('---------------------------------------------------');
            console.log('moyenneVariationFailResult', moyenneVariationFailResult);
            console.log('moyenneGapHautFailResult', moyenneGapHautFailResult);
            console.log('moyenneGapBasFailResult', moyenneGapBasFailResult);
        });
    }
    execFetchTimeRsi().catch(() => console.log('Erreur dans execFetchTimeRsi'));
})
    .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
