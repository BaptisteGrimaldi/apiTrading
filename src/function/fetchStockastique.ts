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
    fast_k_period: number;
    slow_d_period: number;
    slow_dma_type: string;
    slow_k_period: number;
    slow_kma_type: string;
  };
}

interface Value {
  datetime: string;
  slow_k: string;
  slow_d: string;
}

interface StochasticData {
  meta: Meta;
  values: Value[];
  status: string;
}

import fetch from 'node-fetch';

export async function fetchStockastique(
  symbol: string,
  nbJour: number,
  stochastiqueSlowKmin?: number,
  stochoastiqueSlowKmax?: number,
  stochastiqueSlowDmin?: number,
  stochastiqueSlowDmax?: number
): Promise<any> {
  try {
    const verifBleuEtOrange: boolean[] = [];

    return await fetch(
      `https://api.twelvedata.com/stoch?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
    )
      .then((res: any) => {
        return res.json();
      })
      .then((res: StochasticData) => {
        // console.log('res', res);
        if (
          stochastiqueSlowKmin !== undefined &&
          stochoastiqueSlowKmax !== undefined &&
          (stochastiqueSlowKmin !== 666 || stochoastiqueSlowKmax !== 666)
        ) {
          if (
            (parseFloat(res.values[0].slow_k) >= stochastiqueSlowKmin &&
            parseFloat(res.values[0].slow_k) <= stochoastiqueSlowKmax) && res.values[0].slow_k !>res.values[0].slow_d
          ) {

            verifBleuEtOrange.push(true);
          } else {
            verifBleuEtOrange.push(false);
          }
        }

        if (
          stochastiqueSlowDmin !== undefined &&
          stochastiqueSlowDmax !== undefined &&
          (stochastiqueSlowDmin !== 666 || stochastiqueSlowDmax !== 666)
        ) {

          if (
            parseFloat(res.values[0].slow_d) >= stochastiqueSlowDmin &&
            parseFloat(res.values[0].slow_d) <= stochastiqueSlowDmax
          ) {
            verifBleuEtOrange.push(true);
          } else {
            verifBleuEtOrange.push(false);
          }
        }

        if (verifBleuEtOrange.includes(false)) {
          return false;
        } else {
          return true;
        }
      });
  } catch (error) {
    console.error("L'index de l'action fetchSochastique n'existe pas");
    return false;
  }
}

// fetchStockastique('CHSCM', 1,60,80,666,666).then((res) => {
//   console.log('res', res);
// });
