import { recupAllData } from './function/recupAllData';
import { moyenneMedianeResult4Bv } from '../function/logistique/moyenneMediane/moyenneMedianeResult4Bv';
import { fetchActionDay } from '../function/fetchStock/fetchActionday';

//types
import { backTestingReturn } from '../types/backTestingReturn';
import { dataResultBackTesting4Bv } from '../types/dataResultBackTesting4Bv';
// action récente : GMFI

const actionAcheck = 'AAPL';

recupAllData(actionAcheck)
  .then((res: backTestingReturn) => {
    const resultSucess: dataResultBackTesting4Bv[] = [];
    const resultFail: dataResultBackTesting4Bv[] = [];

    async function execRsiVerif() {
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (resultBougiePattern[i] === true && resultBougiePattern[i + 1] === true && resultBougiePattern[i + 2] === true && resultBougiePattern[i + 3] === true) {
          const day1 = await fetchActionDay(resultDateTimeBougiePatternActionEnCour[i], actionAcheck, '1day');
          const day2 = await fetchActionDay(resultDateTimeBougiePatternActionEnCour[i + 1], actionAcheck, '1day');
          const day3 = await fetchActionDay(resultDateTimeBougiePatternActionEnCour[i + 2], actionAcheck, '1day');
          const day4 = await fetchActionDay(resultDateTimeBougiePatternActionEnCour[i + 3], actionAcheck, '1day');

          if (day1 !== 'error' && day2 !== 'error' && day3 !== 'error' && day4 !== 'error') {

            if (resultBougiePattern[i + 4] === true) {
              resultSucess.push({
                dateDebutPattern: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                dateResult: resultDateTimeBougiePatternActionEnCour[i + 4],
                bougieDataResult: res.bougieData[i + 4],
                bougieDataPlus1GainPerte: res.bougiePatternActionEnCour[i + 5],
                bougieDataPlus1: res.bougieData[i + 5],
              });
            } else {
              resultFail.push({
                dateDebutPattern: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                dateResult: resultDateTimeBougiePatternActionEnCour[i + 4],
                bougieDataResult: res.bougieData[i + 4],
                bougieDataPlus1GainPerte: res.bougiePatternActionEnCour[i + 5],
                bougieDataPlus1: res.bougieData[i + 5],
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

        moyenneMedianeResult4Bv(resultSucess, resultFail);
    }
    execRsiVerif().catch(() => console.log('Erreur dans execRsiVerif'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
