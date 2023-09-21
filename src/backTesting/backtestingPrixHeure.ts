import fetch from 'node-fetch';
import { checkDay } from '../function/logistique/checkDay';
import { formatDateToYYYYMMDD } from '../function/logistique/formatDate';
import { intraday } from '../function/logistique/intraday';

//types :
import { valueStock } from '../function/types/valueStock';
import { DateTimeInfo } from '../function/types/dateTimeAncienne';
import { jourEnCour } from '../function/types/jourEnCour';
import { actionHeure } from '../function/types/actionHeure';
import { actionValues } from '../function/types/actionValues';

export async function backtestingPrixHeure(action: string): Promise<valueStock> {
  const today: Date = new Date();

  try {
    const plusAncienneDataAction: string = await fetch(
      `https://api.twelvedata.com/earliest_timestamp?symbol=${action}&interval=1day&apikey=b914fed0677e48cdaf1938b5be42956d`
    )
      .then((response) => response.json())
      .then((data) => data as DateTimeInfo)
      .then((data: DateTimeInfo) => {
        return data.datetime;
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération de la datetime la plus ancienne", error);
        return 'error';
      });

    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1h&format=JSON&start_date=${plusAncienneDataAction} 2:50 PM&end_date=${formatDateToYYYYMMDD(
        today
      )} 2:50 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
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

backtestingPrixHeure('SAIC').then((data) => {
  const dataResult: actionValues[] = data.values;
  intraday(dataResult);
});
