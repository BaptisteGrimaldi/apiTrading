import { checkIfPositive } from './function/logistique/checkIfPositive';
import { checkRsiIndexRsiBas10 } from './function/indicateurs/rsi/checkRsiIndexRsiBas10';
import { waitPromesse } from './function/logistique/waitPromesse';

import fetch from 'node-fetch';
import { fetchRsiDateTime } from './function/indicateurs/rsi/fetchRsiDateTime';

// start_date=08/05/2005
// end_date=09/11/2023

async function backTesting(action: string,startDate:string,endDate:string) {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&dp=2&start_date=${startDate} 6:05 PM&end_date=${endDate} 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
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

backTesting(actionAcheck,"08/05/2005","09/11/2023")
  .then((res: any) => {
    const resultSucess:object[] = [];
    const resultFail:object[] = [];

    async function execFetchTimeRsi (){
      const resultBougiePattern = res.bougiePatternActionEnCour;
      const resultDateTimeBougiePatternActionEnCour =
        res.dateTimeBougiePatternActionEnCour;
  
      console.log('resultBougiePattern', resultBougiePattern);
      console.log(
        'resultDateTimeBougiePatternActionEnCour',
        resultDateTimeBougiePatternActionEnCour
      );
  
      for (let i = 0; i < resultBougiePattern.length; i++) {
        if (
          resultBougiePattern[i] === false &&
          resultBougiePattern[i + 1] === true
        ) {

          const day1 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i]);
          const day2 = await fetchRsiDateTime(actionAcheck, resultDateTimeBougiePatternActionEnCour[i + 1]);

          if( parseFloat(day1)<30 && parseFloat(day2)>30){
            
            if(resultBougiePattern[i+2] === true){
              resultSucess.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                result: 'oui',
              });
            }else {
              resultFail.push({
                date: resultDateTimeBougiePatternActionEnCour[i],
                action: actionAcheck,
                result: 'non',
              });
            }
          }

        }
      }
    }
    execFetchTimeRsi()
    .then(()=>console.log('result', resultSucess,resultFail))
  })
  .catch((error) =>
    console.error('Erreur principale :', "erreur dans l'execution de l'api")
  );

// https://api.twelvedata.com/rsi?symbol=ATRC&interval=1day&outputsize=5&format=JSON&start_date=2023-09-11%209:45%20PM&end_date=2023-09-12%209:47%20PM&apikey=b914fed0677e48cdaf1938b5be42956d
