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
import fetch from 'node-fetch';
function backTesting(action) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&dp=2&start_date=08/05/2005 6:05 PM&end_date=09/11/2023 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            if (!response.ok) {
                throw new Error("Échec de la récupération des données depuis l'API");
            }
            const data = yield response.json();
            const bougiePatternActionEnCour = [];
            const dateTimeBougiePatternActionEnCour = [];
            const nombreCycleIteration = Math.ceil(data.values.length / 500);
            for (let i = 0; i < nombreCycleIteration; i++) {
                yield new Promise((resolve) => setTimeout(resolve, 70000));
                for (let x = 0; x < 500; x++) {
                    const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
                    const dateTime = data.values[x].datetime;
                    bougiePatternActionEnCour.push(bougie);
                    dateTimeBougiePatternActionEnCour.push(dateTime);
                }
            }
            return {
                bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
                dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour
            };
        }
        catch (error) {
            console.error('Erreur :', error);
            throw error; // Renvoie l'erreur pour la gérer en dehors de cette fonction si nécessaire.
        }
    });
}
backTesting('ATRC')
    .then((res) => {
    const resultBougiePattern = res.bougiePatternActionEnCour;
    // const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;
    console.log('resultBougiePattern', resultBougiePattern);
    // const patternValide:string[] = [];
    // const patternNonValide:string[] = [];
    // for(let i = 0; i < resultBougiePattern.length; i++) {
    //     if(resultBougiePattern[i] === false && resultBougiePattern[i+1] === true) {
    //         checkRsiIndex(['ATRC'], ['1','1','0'])
    //         .then((res:string[]) => {
    //             if(res.length > 0){
    //                 patternValide.push(resultDateTimeBougiePatternActionEnCour[i+1]);  
    //             }else {
    //                 patternNonValide.push(resultDateTimeBougiePatternActionEnCour[i+1]);
    //             }
    //         })
    //     }
    // }
})
    .catch((error) => console.error('Erreur principale :', error));
