
import { fetchRsiDateTime } from '../function/indicateurs/rsi/fetchRsiDateTime';
import { moyenneMedianeResult } from '../function/logistique/moyenneMedianeResult';
import { backTesting } from './function/recupAllData';

//Types :
import { backTestingReturn } from '../types/backTestingReturn';
import { dataResultBackTesting } from '../types/dataResultBackTesting';
import { actionValues } from '../types/actionValues';


const actionAcheck = process.argv[2];

if (!actionAcheck) {
  console.error('Veuillez spécifier une valeur pour actionAcheck en ligne de commande.');
  process.exit(1);
}

backTesting(actionAcheck)
  .then((res: backTestingReturn) => {
    const resultSucess: dataResultBackTesting[] = [];
    const resultFail: dataResultBackTesting[] = [];

    async function execRsiVerif() {
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (resultBougiePattern[i] === false && resultBougiePattern[i + 1] === true) {
          const day1 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const day2 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);

          if (parseFloat(day1) <= 29 && parseFloat(day2) >= 33 && day1 !== 'error' && day2 !== 'error') {
            if (resultBougiePattern[i + 2] === true) {
              resultSucess.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
                dateResult: resultDateTimeBougiePatternActionEnCour[i + 2],
                bougieDataPlus2Result: res.bougieData[i + 2],
                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 3],
                bougieDataPlus3: res.bougieData[i + 3],
              });
            } else {
              resultFail.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
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

      const resultSucessDate: string[] = [];
      const resultFailDate: string[] = [];

      const resultSucessActionValue: actionValues[][] = [];
      const resultFailActionValue: actionValues[][] = [];

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
    }
    execRsiVerif().catch(() => console.log('Erreur dans execRsiVerif'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
