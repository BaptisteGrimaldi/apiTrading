import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;
import { MACDData } from '../../types/macdData';

export async function fetchMacd(symbol: string, nbJour: number, macd: number): Promise<boolean> {
  return await fetch(`https://api.twelvedata.com/macd?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=${cleApi}`)
    .then((res) => {
      return res.json() as Promise<MACDData>;
    })
    .then((res) => {
      const macdVerif: boolean[] = [];

      if (macd !== 666) {
        if (parseFloat(res.values[0].macd) > macd) {
          macdVerif.push(true);
        } else {
          macdVerif.push(false);
        }
      } else {
        macdVerif.push(true);
      }

      if (parseFloat(res.values[0].macd) >= parseFloat(res.values[0].macd_signal)) {
        macdVerif.push(true);
      } else {
        macdVerif.push(false);
      }

      if (macdVerif.includes(false)) {
        return false;
      } else {
        return true;
      }
    });
}

// fetchMacd('IBKR', 1,666).then((res) => {
//   console.log('macd', res);
// });
