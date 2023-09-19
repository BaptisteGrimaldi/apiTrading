import { checkIfPositive } from '../function/logistique/checkIfPositive';

import { fetchRsiDateTime } from '../function/indicateurs/rsi/fetchRsiDateTime';
import { fetchDataHistoric } from '../function/fetchStock/fetchHistoric';
import { moyenneResult } from '../function/logistique/moyenneResult';

//Types :
import { valueStock } from '../function/types/valueStock';
import { backTestingReturn } from '../function/types/backTestingReturn';
import { bougieData } from '../function/types/bougieData';
import { dataResultBackTesting } from '../function/types/dataResultBackTesting';

//Debuging code :
import { insererElementsDansMySQL } from '../function/debug/mysql';

// 19h46 : start
// 20h00 : fin

async function backTesting(action: string): Promise<backTestingReturn> {
  try {
    const data: valueStock = await fetchDataHistoric(action);
    const bougiePatternActionEnCour: boolean[] = [];
    const dateTimeBougiePatternActionEnCour: string[] = [];
    const bougieData: bougieData[] = [];

    for (let x = 0; x < data.values.length; x++) {
      try {
        const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
        const dateTime = data.values[x].datetime;

        const openPrice = parseFloat(data.values[x].open);
        const closePrice = parseFloat(data.values[x].close);
        const highPrice = parseFloat(data.values[x].high);
        const lowPrice = parseFloat(data.values[x].low);

        let gapHaut: number;
        let gapBas: number;
        const variation = ((closePrice - openPrice) / openPrice) * 100;

        if (bougie === true) {
          if (highPrice === openPrice) {
            gapHaut = 0;
          } else {
            gapHaut = ((highPrice - closePrice) / closePrice) * 100;
          }

          if (lowPrice === openPrice) {
            gapBas = 0;
          } else {
            gapBas = ((openPrice - lowPrice) / openPrice) * 100;
          }
        } else {
          if (highPrice === closePrice) {
            gapHaut = 0;
          } else {
            gapHaut = ((highPrice - openPrice) / openPrice) * 100;
          }

          if (lowPrice === closePrice) {
            gapBas = 0;
          } else {
            gapBas = ((closePrice - lowPrice) / closePrice) * 100;
          }
        }

        bougieData.push({ variation: variation, gapHaut: gapHaut, gapBas: gapBas });
        bougiePatternActionEnCour.push(bougie);
        dateTimeBougiePatternActionEnCour.push(dateTime);
      } catch {
        console.log("l'index n'éxiste pas");
        break;
      }
    }
    return {
      bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
      dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour.reverse(),
      bougieData: bougieData.reverse(),
    };
  } catch (error) {
    console.error('backTesting function error');
    throw error;
  }
}

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
                bougieDataPlus2Result: res.bougieData[i + 2],
                bougieDataPlus3GainPerte: res.bougiePatternActionEnCour[i + 3],
                bougieDataPlus3: res.bougieData[i + 3],
              });
            } else {
              resultFail.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                bougieDataPlus1Variation: res.bougieData[i + 1].variation,
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

      moyenneResult(resultSucess, resultFail);
    }
    execRsiVerif().catch(() => console.log('Erreur dans execRsiVerif'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
