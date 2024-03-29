import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;

import { RsiData } from '../../../types/rsiData';

export async function checkFetchRsi(symbolStock: string, minRsi: number | boolean, maxRsi: number | boolean): Promise<boolean> {
  return await fetch(`https://api.twelvedata.com/rsi?symbol=${symbolStock}&interval=1day&time_period=14&apikey=${cleApi}`)
    .then((res) => {
      return res.json() as Promise<RsiData>;
    })
    .then((res: RsiData) => {
      if (typeof minRsi === 'number' && typeof maxRsi === 'number') {
        if (parseFloat(res.values[0].rsi) >= minRsi && parseFloat(res.values[0].rsi) <= maxRsi) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("c'est pas censé arriver");
        return false;
      }
    })
    .catch((err) => {
      console.log('fetch RSI prob');
      return false;
    });
}
