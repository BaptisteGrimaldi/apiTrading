import fetch from 'node-fetch';

import { valueStock } from '../types/valueStock';

export async function fetchStocks(symbol: string, nbJour: number): Promise<valueStock> {
  try {
    const response: any = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
    );
    return response.json();
  } catch (error) {
    console.error("L'index de l'action n'existe pas");
    throw error;
  }
}
