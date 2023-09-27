import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;
import { formatDateToYYYYMMDD } from '../function/logistique/formatDate';
import { intraday } from '../function/logistique/intraday';

//types :
import { valueStock } from '../types/valueStock';
import { actionValues } from '../types/actionValues';
import { plusAncienneDateAction } from '../function/fetchStock/plusAncienneDateAction';

export async function backtestingPrixHeure(action: string, interval: string, start_date: string, end_date: string): Promise<any> {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=${interval}&format=JSON&start_date=${start_date} 2:50 PM&end_date=${end_date} 2:50 PM&apikey=${cleApi}`
    );

    if (!response.ok) {
      throw new Error('Échec de la récupération des données historique');
    }

    const data = (await response.json()) as valueStock;

    const dateLaPlusAncienneFetcher = data.values[data.values.length - 1].datetime.split(' ')[0];

    return { data: data, dateLaPlusAncienneFetcher: dateLaPlusAncienneFetcher };
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données de fetchDataHistorique", error);
  }
}

const action = process.argv[2];

const tempoPlusAncienneDateTimeAction: string = await (async () => {
  const plusAncienneDataAction: string = await plusAncienneDateAction(action);
  return plusAncienneDataAction;
})();


const today: Date = new Date();
const dateAujourdhui: string = formatDateToYYYYMMDD(today);

backtestingPrixHeure(action, '1h',tempoPlusAncienneDateTimeAction, dateAujourdhui).then((data) => {

  let dataResult: actionValues[] = data.data.values;
  let dataResultLength: number = dataResult.length;

  let dateLaPlusAncienneFetcher: string = data.dateLaPlusAncienneFetcher;

  console.log(JSON.stringify(intraday(dataResult), null, 2));


  async function processIntradayData() {
    while (dataResultLength % 5000 === 0) {
      const data = await backtestingPrixHeure(action, '1h', tempoPlusAncienneDateTimeAction, dateLaPlusAncienneFetcher);
      dataResult = data.data.values;
      dateLaPlusAncienneFetcher = data.dateLaPlusAncienneFetcher;

      if (data.data.values.length === 5000) {
        dataResultLength += 5000;
        console.log(JSON.stringify(intraday(dataResult), null, 2));
      } else {
        console.log(JSON.stringify(intraday(dataResult), null, 2));
        return;
      }
    }
  }

  (async () => {
    await processIntradayData();
    console.log('Toutes les itérations de la boucle sont terminées.');
  })();
});
