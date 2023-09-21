import fetch from 'node-fetch';

import { valueStock } from '../types/valueStock';

export async function fetchActionDay(date: string, action: string): Promise<any> {

    const datePlus1 = new Date(date);

    datePlus1.setDate(datePlus1.getDate() + 1);
    const year = datePlus1.getFullYear();
    const month = (datePlus1.getMonth() + 1).toString().padStart(2, '0');
    const day = datePlus1.getDate().toString().padStart(2, '0');
    const nouvelleDate = `${year}-${month}-${day}`;

    console.log('nouvelleDate', nouvelleDate);


  try {
    const actionDay = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1h&format=JSON&start_date=${date}%209:00AM&end_date=${nouvelleDate}&apikey=b914fed0677e48cdaf1938b5be42956d`
    );
    const data = (await actionDay.json()) as valueStock;
    return data;
  } catch {
    console.log("erreur lors de la récupération des données de l'action");
  }
}

fetchActionDay('2023-05-05', 'AAPL').then((data) => console.log(data.values));
