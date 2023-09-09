interface Meta {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
  indicator: {
    name: string;
    fast_period: number;
    series_type: string;
    signal_period: number;
    slow_period: number;
  };
}

interface Value {
  datetime: string;
  macd: string;
  macd_signal: string;
  macd_hist: string;
}

interface MACDData {
  meta: Meta;
  values: Value[];
  status: string;
}

import fetch from 'node-fetch';

export async function fetchMacd(
  symbol: string,
  nbJour: number
): Promise<MACDData> {
  try {
    const response: any = await fetch(
      `https://api.twelvedata.com/macd?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
    );
    return response.json();
  } catch (error) {
    console.error("L'index de l'action  MACD n'existe pas");
    throw error;
  }
}

//   fetchMacd('AAPL', 1).then((res) => {
//     console.log('res', res);
//   });
