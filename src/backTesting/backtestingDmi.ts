import { recupAllData } from './function/recupAllData';
import { fetchRsiDateTime } from '../function/indicateurs/rsi/fetchRsiDateTime';
import { fetchDmiPlus } from '../function/indicateurs/dmi/dmi+Fetch';
import { fetchDmiMinus } from '../function/indicateurs/dmi/dmi-Fetch';
import { waitPromesse } from '../function/logistique/waitPromesse';
import { moyenneMedianeResultDmi } from '../function/logistique/moyenneMediane/moyenneMedianeResultDmi';

//types
import { backTestingReturn } from '../types/backTestingReturn';
import { dataResultBackTesting } from '../types/dataResultBackTestingRsi';
import { dataResultBackTestingDmi } from '../types/dataResultBackTestingDmi';

const actionAcheck = 'ABNB';

recupAllData(actionAcheck)
  .then((res: backTestingReturn) => {
    const resultSucess: dataResultBackTestingDmi[] = [];
    const resultFail: dataResultBackTestingDmi[] = [];

    async function execVerif() {
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

      for (let i = 0; i < resultBougiePattern.length; i++) {
        await waitPromesse(250);

        if (resultBougiePattern[i] === true) {
          const dayPlusActuel = await fetchDmiPlus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const dayMoinsActuel = await fetchDmiMinus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);

          const dayPlusPrecedent = await fetchDmiPlus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i - 1]);
          const dayMoinsPrecedent = await fetchDmiMinus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i - 1]);

          if (
            parseFloat(dayPlusActuel) >= parseFloat(dayMoinsActuel) &&
            parseFloat(dayMoinsPrecedent) > parseFloat(dayPlusPrecedent) &&
            dayPlusActuel !== 'error' &&
            dayMoinsActuel !== 'error' &&
            dayPlusPrecedent !== 'error' &&
            dayMoinsPrecedent !== 'error'
          ) {
            if (resultBougiePattern[i + 1] === true) {
              resultSucess.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                bougieDataMoin1Variation: res.bougieData[i].variation,
                dateResult: resultDateTimeBougiePatternActionEnCour[i + 1],
                bougieDataPlus1Result: res.bougieData[i + 1],
                bougieDataPlus2GainPerte: res.bougiePatternActionEnCour[i + 2],
                bougieDataPlus2: res.bougieData[i + 2],
              });
            } else {
              resultFail.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                bougieDataMoin1Variation: res.bougieData[i].variation,
                dateResult: resultDateTimeBougiePatternActionEnCour[i + 1],
                bougieDataPlus1Result: res.bougieData[i + 1],
                bougieDataPlus2GainPerte: res.bougiePatternActionEnCour[i + 2],
                bougieDataPlus2: res.bougieData[i + 2],
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

      for (let i = 0; i < resultSucess.length; i++) {
        resultSucessDate.push(resultSucess[i].dateResult);
      }

      for (let i = 0; i < resultFail.length; i++) {
        resultFailDate.push(resultFail[i].dateResult);
      }
      console.log('---------------------------------------------------');

      console.log('resultSucessDate', resultSucessDate);
      console.log('---------------------------------------------------');
      console.log('resultFailDate', resultFailDate);

      moyenneMedianeResultDmi(resultSucess, resultFail);
    }
    execVerif().catch(() => console.log('Erreur dans execRsiVerif'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
