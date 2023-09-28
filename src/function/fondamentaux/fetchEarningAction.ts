

import fetch from "node-fetch";
import * as dotenv from 'dotenv';
dotenv.config();
const cleApi = process.env.cleApi;

//types 
import { earningStock } from "../../types/earningStock";

export  async function fetchEarningAction  (action: string){
  const response = await fetch(
    `https://api.twelvedata.com/earnings_calendar?symbol=${action}&apikey=${cleApi}`
  );
  const data = await response.json();
  return data;
};


fetchEarningAction("GOOGL")
.then((res:any) => console.log(res.earnings))
.catch(() => console.log('erreur dans le earningAction'));