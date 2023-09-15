import { StochasticData } from '../types/stochasticData';

import fetch from 'node-fetch';

export async function fetchStockastique(
  symbol: string,
  nbJour: number,
  stochastiqueSlowKmin?: number,
  stochoastiqueSlowKmax?: number,
  ecartSlowkSlowd?: number
): Promise<boolean> {
  try {
    const verifBleuEtOrange: boolean[] = [];

    return await fetch(
      `https://api.twelvedata.com/stoch?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
    )
      .then((res: any) => {
        return res.json() as Promise<StochasticData>;
      })
      .then((res: StochasticData) => {

        if (
          stochastiqueSlowKmin !== undefined &&
          stochoastiqueSlowKmax !== undefined &&
          (stochastiqueSlowKmin !== 666 || stochoastiqueSlowKmax !== 666)
        ) {
          if (
            parseFloat(res.values[0].slow_k) >= stochastiqueSlowKmin &&
            parseFloat(res.values[0].slow_k) <= stochoastiqueSlowKmax &&
            parseFloat(res.values[0].slow_k) > parseFloat(res.values[0].slow_d)
          ) {
            verifBleuEtOrange.push(true);
          } else {
            verifBleuEtOrange.push(false);
          }
        } else {
          verifBleuEtOrange.push(true);
        }

        if (stochastiqueSlowKmin === 666 && stochoastiqueSlowKmax === 666) {
          if (
            parseFloat(res.values[0].slow_k) > parseFloat(res.values[0].slow_d)
          ) {
            verifBleuEtOrange.push(true);
          } else {
            verifBleuEtOrange.push(false);
          }
        } else {
          verifBleuEtOrange.push(true);
        }

        if (typeof ecartSlowkSlowd === 'number') {
          if (
            parseFloat(res.values[0].slow_k) >
            parseFloat(res.values[0].slow_d) + ecartSlowkSlowd
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

// fetchStockastique('CHSCM', 1,110,120).then((res) => {
//   console.log('res', res);
// });
