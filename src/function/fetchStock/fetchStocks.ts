import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;

//types
import { valueStock } from '../../types/valueStock';
import { actionValues } from '../../types/actionValues';

export async function fetchStocks(symbol: string, nbJour: number): Promise<valueStock> {
  try {
    const response: any = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=${cleApi}`
    );
    return response.json() as Promise<valueStock>;
  } catch (error) {
    console.error("L'index de l'action n'existe pas");
    throw error;
  }
}

// fetchStocks("AAPL",10)
// .then((res:valueStock) => {
//   console.log(res.values)

//   const sommeVolumeAction = res.values.reduce((total, action:actionValues) => {
//     const volumeAction = parseFloat(action.volume);
//     return total + volumeAction;
//   }, 0);

//   const moyenneSommeActionVolume =  sommeVolumeAction / res.values.length;

//   if(moyenneSommeActionVolume > 100000){
//     return true;
//   }else {
//     return false;
//   }
// })
// .catch((error) => console.error(error));
