import fetch from 'node-fetch';
import { checkDay } from '../function/logistique/checkDay';
import { formatDateToYYYYMMDD } from '../function/logistique/formatDate';
import { intraday } from '../function/logistique/intraday';

//types :
import { valueStock } from '../types/valueStock';
import { DateTimeInfo } from '../types/dateTimeAncienne';
import { jourEnCour } from '../types/jourEnCour';
import { actionHeure } from '../types/actionHeure';
import { actionValues } from '../types/actionValues';
import { plusAncienneDateAction } from '../function/fetchStock/plusAncienneDateAction';

export async function backtestingPrixHeure(action: string, interval: string,start_date:string,end_date:string): Promise<any> {

  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=${interval}&format=JSON&start_date=${start_date} 2:50 PM&end_date=${end_date} 2:50 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
    );

    if (!response.ok) {
      throw new Error('Échec de la récupération des données historique');
    }

    const data = (await response.json()) as valueStock;

    const dateLaPlusAncienneFetcher = data.values[data.values.length - 1].datetime.split(' ')[0];

    return { data: data, dateLaPlusAncienneFetcher: dateLaPlusAncienneFetcher};
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données de fetchDataHistorique", error);
  }
}

const action = process.argv[2];

const tempo:string = await (async () => {
  const plusAncienneDataAction: string = await plusAncienneDateAction(action);
  return plusAncienneDataAction;
}
)();

const today: Date = new Date();
const dateAujourdhui: string =formatDateToYYYYMMDD(today);

backtestingPrixHeure(action, '1h',tempo,dateAujourdhui).then((data) => {

  const intradayGlobal:any = [];
  
  let dataResult: actionValues[] = data.data.values;
  let dataResultLength:number = dataResult.length;

  let dateLaPlusAncienneFetcher:string = data.dateLaPlusAncienneFetcher;

  intradayGlobal.push(intraday(dataResult));

  async function processIntradayData() {
    while (dataResultLength % 5000 === 0) {
      const data = await backtestingPrixHeure(action, '1h', tempo, dateLaPlusAncienneFetcher);
      dataResult = data.data.values;
      dateLaPlusAncienneFetcher = data.dateLaPlusAncienneFetcher;
  
      if (data.data.values.length === 5000) {
        dataResultLength += 5000;
        intradayGlobal.push(intraday(dataResult));
      } else {
        intradayGlobal.push(intraday(dataResult));
        return;
      }
    }
  }
  
  (async () => {
    await processIntradayData();
    // Le code ici ne sera exécuté qu'après que processIntradayData() soit terminé
    console.log("Toutes les itérations de la boucle sont terminées.");
    // console.log(intradayGlobal);
  })();
});
