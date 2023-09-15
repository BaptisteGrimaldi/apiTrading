import { checkIfPositive } from './function/logistique/checkIfPositive';
import { checkRsiIndexRsiBas10 } from './function/indicateurs/rsi/checkRsiIndexRsiBas10';
import { waitPromesse } from './function/logistique/waitPromesse';

import fetch from 'node-fetch';
import { fetchRsiDateTime } from './function/indicateurs/rsi/fetchRsiDateTime';


async function backTesting(action: string) {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&dp=2&start_date=08/05/2005 6:05 PM&end_date=09/11/2023 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
    );

    if (!response.ok) {
      throw new Error("Échec de la récupération des données depuis l'API");
    }

    const data: any = await response.json();
    const bougiePatternActionEnCour: boolean[] = [];
    const dateTimeBougiePatternActionEnCour: string[] = [];

    const nombreCycleIteration = Math.ceil(data.values.length / 500);

    for (let i = 1; i < nombreCycleIteration + 1; i++) {
      console.log('startAttente');
      await waitPromesse(60000);

      //500 appel par minute normalement
      for (let x = (i - 1) * 500; x < i * 500; x++) {
        try {
          const bougie = checkIfPositive(
            data.values[x].open,
            data.values[x].close
          );
          const dateTime = data.values[x].datetime;

          console.log('dateTime', dateTime);
          console.log('bougie', bougie);
          console.log(data.values[x].open);
          console.log(data.values[x].close);

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
      dateTimeBougiePatternActionEnCour:
        dateTimeBougiePatternActionEnCour.reverse(),
    };
  } catch (error) {
    console.error('fetch ?');
  }
}

const actionAcheck = 'ATRC';

backTesting(actionAcheck)
  .then((res: any) => {
    async function execFetchTimeRsi (){
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour =
        res.dateTimeBougiePatternActionEnCour;
  
      console.log('resultBougiePattern', resultBougiePattern);
      console.log(
        'resultDateTimeBougiePatternActionEnCour',
        resultDateTimeBougiePatternActionEnCour
      );
  
      const patternValide: string[] = [];
      const patternNonValide: string[] = [];
  
      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (
          resultBougiePattern[i] === false &&
          resultBougiePattern[i + 1] === true
        ) {

          const day1 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const day2 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);


        }
      }
    }
    execFetchTimeRsi();
  })
  .catch((error) =>
    console.error('Erreur principale :', "erreur dans l'execution de l'api")
  );

// https://api.twelvedata.com/rsi?symbol=ATRC&interval=1day&outputsize=5&format=JSON&start_date=2023-09-11%209:45%20PM&end_date=2023-09-12%209:47%20PM&apikey=b914fed0677e48cdaf1938b5be42956d
