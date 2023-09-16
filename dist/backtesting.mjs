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
import { waitPromesse } from './function/logistique/waitPromesse.mjs';;
import fetch from 'node-fetch';
import { fetchRsiDateTime } from './function/indicateurs/rsi/fetchRsiDateTime.mjs';;
//Debuging code :
// import {ecrireDansFichier} from './debugging/ecrireDansFichier.mjs';;
function backTesting(action, startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&dp=2&start_date=${startDate} 6:05 PM&end_date=${endDate} 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            if (!response.ok) {
                throw new Error("Échec de la récupération des données depuis l'API");
            }
            const data = yield response.json();
            const bougiePatternActionEnCour = [];
            const dateTimeBougiePatternActionEnCour = [];
            const nombreCycleIteration = Math.ceil(data.values.length / 500);
            for (let i = 1; i < nombreCycleIteration + 1; i++) {
                console.log('startAttente');
                yield waitPromesse(60000);
                //500 appel par minute normalement
                for (let x = (i - 1) * 500; x < i * 500; x++) {
                    try {
                        const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
                        const dateTime = data.values[x].datetime;
                        // console.log('dateTime', dateTime);
                        // console.log('bougie', bougie);
                        // console.log(data.values[x].open);
                        // console.log(data.values[x].close);
                        bougiePatternActionEnCour.push(bougie);
                        dateTimeBougiePatternActionEnCour.push(dateTime);
                    }
                    catch (_a) {
                        console.log("l'index n'éxiste pas");
                        break;
                    }
                }
            }
            return {
                bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
                dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour.reverse(),
            };
        }
        catch (error) {
            console.error('backTesting function error');
            throw error;
        }
    });
}
const actionAcheck = 'ATRC';
backTesting(actionAcheck, "08/05/2005", "09/11/2023")
    .then((res) => {
    const resultSucess = [];
    const resultFail = [];
    function execFetchTimeRsi() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultBougiePattern = res.bougiePatternActionEnCour;
            const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;
            console.log('resultBougiePattern', resultBougiePattern);
            console.log('resultDateTimeBougiePatternActionEnCour', resultDateTimeBougiePatternActionEnCour);
            for (let i = 0; i < resultBougiePattern.length; i++) {
                if (resultBougiePattern[i] === false &&
                    resultBougiePattern[i + 1] === true) {
                    // await waitPromesse(500);
                    const day1 = yield fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
                    const day2 = yield fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);
                    if (parseFloat(day1) < 30 && parseFloat(day2) > 30 && day1 !== 'error' && day2 !== 'error') {
                        if (resultBougiePattern[i + 2] === true) {
                            resultSucess.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                result: 'oui',
                            });
                        }
                        else {
                            resultFail.push({
                                date: resultDateTimeBougiePatternActionEnCour[i],
                                action: actionAcheck,
                                result: 'non',
                            });
                        }
                    }
                }
            }
            console.log('resultSucess', resultSucess, 'resultFail', resultFail);
            // ecrireDansFichier(`${resultBougiePattern}`, `${resultDateTimeBougiePatternActionEnCour}`, 'backTestingRsi.mjs');
        });
    }
    execFetchTimeRsi()
        .catch(() => console.log('Erreur dans execFetchTimeRsi'));
})
    .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
// https://api.twelvedata.com/rsi?symbol=ATRC&interval=1day&outputsize=5&format=JSON&start_date=2023-09-11%209:45%20PM&end_date=2023-09-12%209:47%20PM&apikey=b914fed0677e48cdaf1938b5be42956d
