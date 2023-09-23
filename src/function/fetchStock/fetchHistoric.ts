import fetch from 'node-fetch';

//types :
import { valueStock } from '../../types/valueStock';
import { DateTimeInfo } from '../../types/dateTimeAncienne';

import { formatDateToYYYYMMDD } from '../logistique/formatDate';
import { plusAncienneDateAction } from './plusAncienneDateAction';

export async function fetchDataHistoric(action: string): Promise<valueStock> {
  const today: Date = new Date();

  try {
    const plusAncienneDataAction: string = await plusAncienneDateAction(action);

    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&start_date=${plusAncienneDataAction} 6:05 PM&end_date=${formatDateToYYYYMMDD(
        today
      )} 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
    );

    if (!response.ok) {
      throw new Error('Échec de la récupération des données historique');
    }

    const data = (await response.json()) as valueStock;
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données de fetchDataHistorique", error);
    throw error;
  }
}

// fetchDataHistoric('AAPL').then((data) => {
//     console.log(data.values[4999].datetime)
//     console.log(data.values[0].datetime)
// });
