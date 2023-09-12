import { checkIfPositive } from './function/logistique/checkIfPositive';
import { checkRsiIndex } from './function/indicateurs/rsi/checkRsiIndex';

import fetch from 'node-fetch';

interface valueStock {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: Array<{
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }>;
  status: string;
}

async function backTesting(action: string) {
    try {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&dp=2&start_date=08/05/2005 6:05 PM&end_date=09/11/2023 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
      );
  
      if (!response.ok) {
        throw new Error("Échec de la récupération des données depuis l'API");
      }
  
      const data:any = await response.json();
      const bougiePatternActionEnCour:boolean[] = [];
      const dateTimeBougiePatternActionEnCour:string[] = [];


      const nombreCycleIteration = Math.ceil(data.values.length / 500);

      for(let i = 0 ; i < nombreCycleIteration; i++) { 
        await new Promise((resolve) => setTimeout(resolve, 70000));
        for (let x = 0; x < 500; x++) {
            const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
            const dateTime = data.values[x].datetime;
            bougiePatternActionEnCour.push(bougie);
            dateTimeBougiePatternActionEnCour.push(dateTime);
        }
      }
      return {
        bougiePatternActionEnCour : bougiePatternActionEnCour.reverse(),
        dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour
      };
    } catch (error) {
      console.error('Erreur :', error);
      throw error; // Renvoie l'erreur pour la gérer en dehors de cette fonction si nécessaire.
    }
  }
  
  backTesting('ATRC')
    .then((res) => {
        const resultBougiePattern = res.bougiePatternActionEnCour;
        // const resultDateTimeBougiePatternActionEnCour = res.dateTimeBougiePatternActionEnCour;

        console.log('resultBougiePattern', resultBougiePattern);

        // const patternValide:string[] = [];
        // const patternNonValide:string[] = [];

        // for(let i = 0; i < resultBougiePattern.length; i++) {
        //     if(resultBougiePattern[i] === false && resultBougiePattern[i+1] === true) {

        //         checkRsiIndex(['ATRC'], ['1','1','0'])
        //         .then((res:string[]) => {
        //             if(res.length > 0){
        //                 patternValide.push(resultDateTimeBougiePatternActionEnCour[i+1]);  
        //             }else {
        //                 patternNonValide.push(resultDateTimeBougiePatternActionEnCour[i+1]);
        //             }
        //         })
        //     }
        // }
    })
    .catch((error) => console.error('Erreur principale :', error));
  
