import fetch from 'node-fetch';

import { valueStock } from '../../types/valueStock';
import * as dotenv from 'dotenv';

//types : 
import { absenceData } from '../../types/absenceData';


dotenv.config();
const cleApi = process.env.cleApi;

export async function fetchActionDay(date: string, action: string, interval: string): Promise<valueStock | 'error'> {
  const datePlus1 = new Date(date);

  datePlus1.setDate(datePlus1.getDate() + 1);
  const year = datePlus1.getFullYear();
  const month = (datePlus1.getMonth() + 1).toString().padStart(2, '0');
  const day = datePlus1.getDate().toString().padStart(2, '0');
  const nouvelleDate = `${year}-${month}-${day}`;

  try {
    const actionDay = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=${interval}&format=JSON&start_date=${date}%209:00AM&end_date=${nouvelleDate}&apikey=${cleApi}`
    );
    let data = (await actionDay.json()) as valueStock | absenceData;

    if ('code' in data && 'message' in data && 'status' in data && 'meta' in data) {
      console.log('data non disponible ');
      return 'error';
    } else {
      return data;
    }
  } catch {
    console.log("erreur lors de la récupération des données de l'action",nouvelleDate);
    return 'error';
  }
}






