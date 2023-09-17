import { checkIfPositive } from './function/logistique/checkIfPositive';
import { checkRsiIndexRsiBas10 } from './function/indicateurs/rsi/checkRsiIndexRsiBas10';
import { waitPromesse } from './function/logistique/waitPromesse';

import fetch from 'node-fetch';
import { fetchRsiDateTime } from './function/indicateurs/rsi/fetchRsiDateTime';

//Types :
import { valueStock } from './function/types/valueStock';
import { backTestingReturn } from './function/types/backTestingReturn';

//Debuging code :
import{insererElementsDansMySQL} from './function/debug/mysql';

// import {ecrireDansFichier} from './debugging/ecrireDansFichier';

async function backTesting(action: string, startDate: string, endDate: string): Promise<backTestingReturn> {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&dp=2&start_date=${startDate} 6:05 PM&end_date=${endDate} 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
    );

    if (!response.ok) {
      throw new Error("Échec de la récupération des données depuis l'API");
    }

    const data: valueStock = (await response.json()) as valueStock;
    const bougiePatternActionEnCour: boolean[] = [];
    const dateTimeBougiePatternActionEnCour: string[] = [];

    const nombreCycleIteration = Math.ceil(data.values.length / 500);

    for (let i = 1; i < nombreCycleIteration + 1; i++) {
      console.log('startAttente');
      await waitPromesse(60000);

      //500 appel par minute normalement
      for (let x = (i - 1) * 500; x < i * 500; x++) {
        try {
          const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
          const dateTime = data.values[x].datetime;

          bougiePatternActionEnCour.push(bougie);
          dateTimeBougiePatternActionEnCour.push(dateTime);
        } catch {
          console.log("l'index n'éxiste pas");
          break;
        }
      }
    }
    return {
      bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
      dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour.reverse(),
    };
  } catch (error) {
    console.error('backTesting function error');
    throw error;
  }
}

const actionAcheck = 'AAPL';

backTesting(actionAcheck, '01/12/2008', '09/11/2023')
  .then((res: backTestingReturn) => {
    const resultSucess: object[] = [];
    const resultFail: object[] = [];

    async function execFetchTimeRsi() {
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (resultBougiePattern[i] === false && resultBougiePattern[i + 1] === true) {
          // await waitPromesse(500);

          const day1 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const day2 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);

          if (parseFloat(day1) <= 26 && parseFloat(day2) >= 34 && day1 !== 'error' && day2 !== 'error') {
            if (resultBougiePattern[i + 2] === true) {
              resultSucess.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                result: 'oui',
              });
            } else {
              resultFail.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                result: 'non',
              });
            }
          }
        }
      }
      console.log('resultBougiePattern', resultBougiePattern);
      console.log('resultDateTimeBougiePatternActionEnCour', resultDateTimeBougiePatternActionEnCour);
      console.log('resultSucess', resultSucess, 'resultFail', resultFail);
      // insererElementsDansMySQL(resultBougiePattern, 'resultBougiePattern', resultDateTimeBougiePatternActionEnCour, 'resultDateTimeBougiePatternActionEnCour');
    }
    execFetchTimeRsi().catch(() => console.log('Erreur dans execFetchTimeRsi'));
  })
  .catch((error) => console.error('Erreur principale :', "erreur dans l'execution de l'api"));
