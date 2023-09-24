import fetch from "node-fetch";

import { dmiDataMinus } from "../../../types/dmiMinus";

const action = 'ABNB';

// Truc qui cloche à fixe
export async function fetchDmiMinus(action: string, end_date: string): Promise<string> {
    try {
        const response = await fetch(`https://api.twelvedata.com/minus_di?symbol=${action}&interval=1day&outputsize=1&time_period=14&format=JSON&end_date=${end_date}%209:00PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
        const data = await response.json() as dmiDataMinus;
        // console.log("avant exec ",start_date);
        return data.values[0].minus_di;
    } catch {
        console.log(`pas de donnés a cette date pour fetch dmiMinus : ${end_date}`);
        return 'error';
    }
}


// fetchDmiMinus(action, '2020-12-16')
// .then((data: string) => console.log(data))
// .catch((error) => console.error(error));
