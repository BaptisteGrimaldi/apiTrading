import fetch from "node-fetch";

import { dmiDataMinus } from "../../../types/dmiMinus";

const action = 'ABNB';

// Truc qui cloche à fixe
export async function fetchDmiMinus(action: string, start_date: string): Promise<string> {
    try {
        const response = await fetch(`https://api.twelvedata.com/minus_di?symbol=${action}&interval=1day&outputsize=1&time_period=14&format=JSON&start_date=${start_date}%209:00AM&apikey=b914fed0677e48cdaf1938b5be42956d`);
        const data = await response.json() as dmiDataMinus;
        console.log(data);
        return data.values[0].minus_di;
    } catch {
        console.log("erreur fetch dmiDataMinus");
        console.log(start_date)
        return 'error';
    }
}

fetchDmiMinus(action, '2022-03-28')
.then((data: string) => console.log(data))
.catch((error) => console.error(error));
