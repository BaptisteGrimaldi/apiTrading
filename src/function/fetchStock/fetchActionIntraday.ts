import fetch from "node-fetch";
import { valueStock } from "../../types/valueStock";


import * as dotenv from "dotenv";
dotenv.config();
const cleApi = process.env.cleApi;

import { absenceData } from "../../types/absenceData";
import { ajouterUnJour } from "../logistique/ajouterUnJour";


export async function fetchActionIntraday(action:string , date: string, interval: string) {

    try {
        const actionDay = await fetch(
          `https://api.twelvedata.com/time_series?symbol=${action}&interval=${interval}&format=JSON&start_date=${date}%209:30AM&end_date=${ajouterUnJour(date)}%209AM&apikey=${cleApi}`
        );
        let data = (await actionDay.json()) as valueStock | absenceData;
    
        if ('code' in data && 'message' in data && 'status' in data && 'meta' in data) {
          console.log('data non disponible ');
          return 'error';
        } else {
          return data;
        }
      } catch {
        console.log("erreur lors de la récupération des données de l'action en intraday");
        return 'error';
      }
}

// fetchActionIntraday("AAPl",'2021-09-24', '1h').then((res) => console.log(res)).catch(() => console.log('erreur dans le fetchActionIntraday'));