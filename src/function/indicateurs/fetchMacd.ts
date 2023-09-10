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
  nbJour: number,
  macd: number
): Promise<any> {
  return await fetch(
    `https://api.twelvedata.com/macd?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
  )
    .then((res) => {
      return res.json();
    })
    .then((res: any) => {
      const macdVerif: boolean[] = [];

      if (macd !== 666) {
        if (res.values[0].macd > macd) {
          macdVerif.push(true);
        } else {
          macdVerif.push(false);
        }
      } else {
        macdVerif.push(true);
      }

      if (
        parseFloat(res.values[0].macd) >= parseFloat(res.values[0].macd_signal)
      ) {
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
