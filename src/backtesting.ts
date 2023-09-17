import { checkIfPositive } from './function/logistique/checkIfPositive';
import { waitPromesse } from './function/logistique/waitPromesse';

import { fetchRsiDateTime } from './function/indicateurs/rsi/fetchRsiDateTime';
import { fetchDataHistoric } from './function/fetchStock/fetchHistoric';

//Types :
import { valueStock } from './function/types/valueStock';
import { backTestingReturn } from './function/types/backTestingReturn';
import { bougieData } from './function/types/bougieData';
import { dataResultBackTesting } from './function/types/dataResultBackTesting';

//Debuging code :
import { insererElementsDansMySQL } from './function/debug/mysql';

// 19h46 : start
// 20h00 : fin


async function backTesting(action: string): Promise<backTestingReturn> {
  try {

    const data: valueStock = await fetchDataHistoric(action);
    const bougiePatternActionEnCour: boolean[] = [];
    const dateTimeBougiePatternActionEnCour: string[] = [];
    const bougieData:bougieData[] = [];

      for (let x = 0 ; x < data.values.length ; x++) {
        try {
          const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
          const dateTime = data.values[x].datetime;

          const openPrice = parseFloat(data.values[x].open);
          const closePrice = parseFloat(data.values[x].close);
          const highPrice = parseFloat(data.values[x].high);
          const lowPrice = parseFloat(data.values[x].low);
          
          const variation = ((closePrice - openPrice) / openPrice) * 100;
          const gapHaut = ((highPrice - closePrice) / closePrice) * 100;
          const gapBas = ((openPrice - lowPrice) / openPrice) * 100;

          bougieData.push({variation : variation, gapHaut:gapHaut, gapBas:gapBas});
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

const actionAcheck = 'AAPL';

backTesting(actionAcheck)
  .then((res: backTestingReturn) => {
    const resultSucess: dataResultBackTesting[] = [];
    const resultFail: dataResultBackTesting[] = [];

    async function execFetchTimeRsi() {
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (resultBougiePattern[i] === false && resultBougiePattern[i + 1] === true) {
          // await waitPromesse(500);

          const day1 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const day2 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);

          if (parseFloat(day1) <= 28 && parseFloat(day2) >= 33 && day1 !== 'error' && day2 !== 'error') {
            if (resultBougiePattern[i + 2] === true) {
              resultSucess.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                bougieDataPlus1Variation: res.bougieData[i+1].variation,
                bougieDataPlus2Result: res.bougieData[i+2],
                bougieDataPlus3: res.bougiePatternActionEnCour[i+3],
              });
            } else {
              resultFail.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                bougieDataPlus1Variation: res.bougieData[i+1].variation,
                bougieDataPlus2Result: res.bougieData[i+2],
                bougieDataPlus3: res.bougiePatternActionEnCour[i+3],
              });
            }
          }
        }
      }
      console.log('resultSucess', resultSucess);
      console.log('---------------------------------------------------')
      console.log('resultFail', resultFail);

      const moyenneVariationSucess:number[] = [];
      const moyenneGapHautSucess:number[] = [];
      const moyenneGapBasSucess:number[] = [];

      for( const result of resultSucess){
        moyenneVariationSucess.push(result.bougieDataPlus1Variation);
        moyenneGapHautSucess.push(result.bougieDataPlus2Result.gapHaut);
        moyenneGapBasSucess.push(result.bougieDataPlus2Result.gapBas);
      }

      const moyenneVariationFail:number[] = [];
      const moyenneGapHautFail:number[] = [];
      const moyenneGapBasFail:number[] = [];

      for( const result of resultFail){
        moyenneVariationFail.push(result.bougieDataPlus1Variation);
        moyenneGapHautFail.push(result.bougieDataPlus2Result.gapHaut);
        moyenneGapBasFail.push(result.bougieDataPlus2Result.gapBas);
      }

      const moyenneVariationSucessResult = moyenneVariationSucess.reduce((a,b) => a + b, 0) / moyenneVariationSucess.length;
      const moyenneGapHautSucessResult = moyenneGapHautSucess.reduce((a,b) => a + b, 0) / moyenneGapHautSucess.length;
      const moyenneGapBasSucessResult = moyenneGapBasSucess.reduce((a,b) => a + b, 0) / moyenneGapBasSucess.length;

      const moyenneVariationFailResult = moyenneVariationFail.reduce((a,b) => a + b, 0) / moyenneVariationFail.length;
      const moyenneGapHautFailResult = moyenneGapHautFail.reduce((a,b) => a + b, 0) / moyenneGapHautFail.length;
      const moyenneGapBasFailResult = moyenneGapBasFail.reduce((a,b) => a + b, 0) / moyenneGapBasFail.length;

      console.log('moyenneVariationSucessResultI+1', moyenneVariationSucessResult);
      console.log('moyenneGapHautSucessResultI+2', moyenneGapHautSucessResult);
      console.log('moyenneGapBasSucessResultI+2', moyenneGapBasSucessResult);
      console.log('---------------------------------------------------')
      console.log('moyenneVariationFailResultI+1', moyenneVariationFailResult);
      console.log('moyenneGapHautFailResultI+2', moyenneGapHautFailResult);
      console.log('moyenneGapBasFailResultI+2', moyenneGapBasFailResult);

    }
    execFetchTimeRsi().catch(() => console.log('Erreur dans execFetchTimeRsi'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
