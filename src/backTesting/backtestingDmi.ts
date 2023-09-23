
import { backTesting } from "./function/recupAllData";
import { moyenneMedianeResult } from "../function/logistique/moyenneMedianeResult";
import { fetchRsiDateTime } from "../function/indicateurs/rsi/fetchRsiDateTime";
import { fetchDmiPlus } from "../function/indicateurs/dmi/dmi+Fetch";
import { fetchDmiMinus } from "../function/indicateurs/dmi/dmi-Fetch";

//types
import { backTestingReturn } from "../types/backTestingReturn";
import { dataResultBackTesting } from "../types/dataResultBackTesting";


const actionAcheck = "ABNB";

backTesting(actionAcheck)
  .then((res: backTestingReturn) => {
    const resultSucess: dataResultBackTesting[] = [];
    const resultFail: dataResultBackTesting[] = [];

    async function execVerif() {
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (resultBougiePattern[i] === true) {
          const dayPlusActuel = await fetchDmiPlus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const dayMoinsActuel = await fetchDmiMinus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);

          const dayPlusPrecedent = await fetchDmiPlus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);
            const dayMoinsPrecedent = await fetchDmiMinus(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);

          if (parseFloat(dayPlusActuel) >= parseFloat(dayMoinsActuel) && parseFloat(dayMoinsPrecedent)>parseFloat(dayPlusPrecedent) &&dayPlusActuel !== 'error' && dayMoinsActuel !== 'error' && dayPlusPrecedent !== 'error' && dayMoinsPrecedent !== 'error') {
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
            } else {
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

      const resultSucessDate: string[] = [];
      const resultFailDate: string[] = [];

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
    execVerif().catch(() => console.log('Erreur dans execRsiVerif'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));

