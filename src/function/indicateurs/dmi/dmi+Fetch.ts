import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;

import { dmiDataPlus } from '../../../types/dmiPlus';

const action = 'ABNB';

export async function fetchDmiPlus(action: string, end_date: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/plus_di?symbol=${action}&interval=1day&outputsize=1&time_period=14&format=JSON&end_date=${end_date}%209:00PM&apikey=${cleApi}`
    );
    const data = (await response.json()) as dmiDataPlus;
    // console.log("avant exec ",start_date);
    return data.values[0].plus_di;
  } catch {
    console.log(`pas de donnés a cette date pour fetch dmiPlus : ${end_date}`);
    return 'error';
  }
}

// fetchDmiPlus(action, '2020-12-16')
//     .then((data: string) => console.log(data))
