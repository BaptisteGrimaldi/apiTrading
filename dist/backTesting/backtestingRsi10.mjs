var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import {fetchRsiDateTime } from '../function/indicateurs/rsi/fetchRsiDateTime.mjs';;
import {moyenneMedianeResultRsi } from '../function/logistique/moyenneMediane/moyenneMedianeResultRsi.mjs';;
import {recupAllData } from './function/recupAllData.mjs';;
const actionAcheck = process.argv[2];
if (!actionAcheck) {
    console.error('Veuillez spécifier une valeur pour actionAcheck en ligne de commande.');
    process.exit(1);
}
recupAllData(actionAcheck)
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
                    if (parseFloat(day1) <= 30 && parseFloat(day2) >= 33 && day1 !== 'error' && day2 !== 'error') {
                        if (resultBougiePattern[i + 2] === true) {
                            resultSucess.push({
                                dateDebutPattern: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                                dateResult: resultDateTimeBougiePatternActionEnCour[i + 2],
                                bougieDataPlus2Result: res.bougieData[i + 2],
                                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 3],
                                bougieDataPlus3: res.bougieData[i + 3],
                            });
                        }
                        else {
                            resultFail.push({
                                dateDebutPattern: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                                dateResult: resultDateTimeBougiePatternActionEnCour[i + 2],
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
            // const resultSucessDate: string[] = [];
            // const resultFailDate: string[] = [];
            // for (let i = 0; i < resultSucess.length; i++) {
            //   resultSucessDate.push(resultSucess[i].dateResult);
            // }
            // for (let i = 0; i < resultFail.length; i++) {
            //   resultFailDate.push(resultFail[i].dateResult);
            // }
            // console.log('resultSucessDate', resultSucessDate);
            // console.log('---------------------------------------------------');
            // console.log('resultFailDate', resultFailDate);
            moyenneMedianeResultRsi(resultSucess, resultFail);
        });
    }
    execRsiVerif().catch(() => console.log('Erreur dans execRsiVerif'));
})
    .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
