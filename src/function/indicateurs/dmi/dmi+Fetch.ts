
import fetch from "node-fetch";

import { dmiDataPlus } from "../../../types/dmiPlus";

const action = 'AAPL';


export async function fetchDmiPlus(action: string, start_date: string): Promise<string> {
    try {
        const response = await fetch(`https://api.twelvedata.com/plus_di?symbol=${action}&interval=1day&outputsize=1&time_period=14&format=JSON&start_date=${start_date}%209:00AM&apikey=b914fed0677e48cdaf1938b5be42956d`);
        const data = await response.json() as dmiDataPlus;
        return data.values[0].plus_di;
    } catch {
        console.log("erreur fetch dmiDataPlus");
        console.log(start_date)
        return 'error';
    }
}

// fetchDmiPlus(action, '2021-05-05')
//     .then((data: string) => console.log(data))

