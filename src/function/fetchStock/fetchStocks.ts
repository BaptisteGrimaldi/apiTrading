import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;

import { valueStock } from '../../types/valueStock';

export async function fetchStocks(symbol: string, nbJour: number): Promise<valueStock> {
  try {
    const response: any = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=${cleApi}`
    );
    return response.json();
  } catch (error) {
    console.error("L'index de l'action n'existe pas");
    throw error;
  }
}
