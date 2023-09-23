var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import {backTesting } from './function/recupAllData.mjs';;
import {moyenneMedianeResult } from '../function/logistique/moyenneMedianeResult.mjs';;
import {fetchDmiPlus } from '../function/indicateurs/dmi/dmi+Fetch.mjs';;
import {fetchDmiMinus } from '../function/indicateurs/dmi/dmi-Fetch.mjs';;
const actionAcheck = "ABNB";
backTesting(actionAcheck)
    .then((res) => {
    const resultSucess = [];
    const resultFail = [];
    function execVerif() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultBougiePattern = res.bougiePatternActionEnCour;
            const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;
            for (let i = 0; i < resultBougiePattern.length; i++) {
                if (resultBougiePattern[i] === true) {
                    const dayPlusActuel = yield fetchDmiPlus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
                    const dayMoinsActuel = yield fetchDmiMinus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
                    const dayPlusPrecedent = yield fetchDmiPlus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);
                    const dayMoinsPrecedent = yield fetchDmiMinus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);
                    if (parseFloat(dayPlusActuel) >= parseFloat(dayMoinsActuel) && parseFloat(dayMoinsPrecedent) > parseFloat(dayPlusPrecedent) && dayPlusActuel !== 'error' && dayMoinsActuel !== 'error' && dayPlusPrecedent !== 'error' && dayMoinsPrecedent !== 'error') {
                        if (resultBougiePattern[i + 1] === true) {
                            resultSucess.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i].variation,
                                dateResult: resultDateTimeBougiePatternActionEnCour[i + 1],
                                bougieDataPlus2Result: res.bougieData[i + 1],
                                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 2],
                                bougieDataPlus3: res.bougieData[i + 2],
                            });
                        }
                        else {
                            resultFail.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i].variation,
                                dateResult: resultDateTimeBougiePatternActionEnCour[i + 1],
                                bougieDataPlus2Result: res.bougieData[i + 1],
                                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 2],
                                bougieDataPlus3: res.bougieData[i + 2],
                            });
                        }
                    }
                }
            }
            console.log('resultSucess', resultSucess);
            console.log('---------------------------------------------------');
            console.log('resultFail', resultFail);
            const resultSucessDate = [];
            const resultFailDate = [];
            for (let i = 0; i < resultSucess.length; i++) {
                resultSucessDate.push(resultSucess[i].dateResult);
            }
            for (let i = 0; i < resultFail.length; i++) {
                resultFailDate.push(resultFail[i].dateResult);
            }
            console.log('resultSucessDate', resultSucessDate);
            console.log('---------------------------------------------------');
            console.log('resultFailDate', resultFailDate);
            moyenneMedianeResult(resultSucess, resultFail);
        });
    }
    execVerif().catch(() => console.log('Erreur dans execRsiVerif'));
})
    .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
