import { fetchRsiDateTime } from '../function/indicateurs/rsi/fetchRsiDateTime';
import { moyenneMedianeResultRsi } from '../function/logistique/moyenneMediane/moyenneMedianeResultRsi';
import { recupAllData } from './function/recupAllData';

//Types :
import { backTestingReturn } from '../types/backTestingReturn';
import { dataResultBackTesting } from '../types/dataResultBackTestingRsi';
import { actionValues } from '../types/actionValues';

const actionAcheck = process.argv[2];

if (!actionAcheck) {
  console.error('Veuillez spécifier une valeur pour actionAcheck en ligne de commande.');
  process.exit(1);
}

recupAllData(actionAcheck)
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
            } else {
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
    }
    execRsiVerif().catch(() => console.log('Erreur dans execRsiVerif'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
