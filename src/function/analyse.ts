import { fetchStocks } from './fetchStock/fetchStocks';
import { checkIfPositive } from './logistique/checkIfPositive';
import { checkFetchRsi } from './indicateurs/rsi/fetchRsi';
import { checkDateTime } from './logistique/checkDateTime';
import { arraysHaveSameOrder } from './logistique/checkTableauSimilaire';
import { fetchStockastique } from './indicateurs/fetchStockastique';
import { fetchMacd } from './indicateurs/fetchMacd';
import fetch from 'node-fetch';

import { UseOrNotUse } from './types/useOrNotUse';

export async function analyse(
  stock: any[],
  start: number,
  end: number,
  price: number,
  minRsi?: number | boolean,
  maxRsi?: number | boolean,
  stochastiqueSlowKmin?: number | boolean,
  stochoastiqueSlowKmax?: number | boolean,
  ecartSlowkSlowd?: number | boolean,
  macd?: number | boolean,
  bougiePattern?: string[],
  useOrNotUse?: UseOrNotUse
): Promise<string[]> {
  if (
    bougiePattern !== undefined &&
    useOrNotUse !== undefined &&
    minRsi !== undefined &&
    maxRsi !== undefined &&
    stochastiqueSlowKmin !== undefined &&
    stochoastiqueSlowKmax !== undefined &&
    ecartSlowkSlowd !== undefined &&
    macd !== undefined
  ) {
    let actionJours: string[] = [];
    let fetchPromises: any[] = [];
    let stopLoop = false;
    const bougieConfig = bougiePattern.map((bougie) => {
      return bougie === '1' ? true : false;
    });

    let useOrNotUseConfig: boolean[] = [useOrNotUse.minRsi(), useOrNotUse.stochastiqueSlowKmin(), useOrNotUse.ecartSlowkSlowd(), useOrNotUse.macd()];

    useOrNotUseConfig = useOrNotUseConfig.filter((value) => value === true);

    // console.log('useOrNotUseConfig', useOrNotUseConfig);

    for (let i = start; i < end; i++) {
      if (stopLoop) {
        break;
      }
      try {
        const fetchPromise = await fetchStocks(stock[i].symbol, bougiePattern.length).then((res) => {
          //Endroit prix action minimum
          if (parseFloat(res.values?.[0].close) > price) {
            const dateTime = checkDateTime(bougiePattern, res);

            if (dateTime === true) {
              const bougiePatternActionEnCour = [];

              for (let x = 0; x < bougiePattern.length; x++) {
                const bougie = checkIfPositive(res.values[x].open, res.values[x].close);
                bougiePatternActionEnCour.push(bougie);
              }

              if (arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour)) {
                const useOrNotUse: boolean[] = [];

                async function executeAll() {
                  if (minRsi !== false && maxRsi !== false && typeof minRsi === 'number' && typeof maxRsi === 'number') {
                    const res = await checkFetchRsi(stock[i].symbol, minRsi, maxRsi);
                    if (res === true) {
                      useOrNotUse.push(true);
                    } else {
                      return;
                    }
                  }

                  if (typeof stochastiqueSlowKmin === 'number' && typeof stochoastiqueSlowKmax === 'number') {
                    try {
                      const res = await fetchStockastique(stock[i].symbol, 1, stochastiqueSlowKmin, stochoastiqueSlowKmax);
                      if (res === true) {
                        useOrNotUse.push(true);
                      } else {
                        return;
                      }
                    } catch {
                      console.log('Erreur stochastiqueSlowKmin');
                    }
                  }

                  if (typeof ecartSlowkSlowd === 'number' && typeof stochastiqueSlowKmin === 'number' && typeof stochoastiqueSlowKmax === 'number') {
                    try {
                      const res = await fetchStockastique(stock[i].symbol, 1, stochastiqueSlowKmin, stochoastiqueSlowKmax, ecartSlowkSlowd);
                      if (res === true) {
                        useOrNotUse.push(true);
                      } else {
                        return;
                      }
                    } catch {
                      console.log('Erreur ecartSlowkSlowd');
                    }
                  }

                  if (typeof macd === 'number') {
                    try {
                      const res = await fetchMacd(stock[i].symbol, 1, macd);
                      if (res === true) {
                        useOrNotUse.push(true);
                      } else {
                        return;
                      }
                    } catch {
                      console.log('Erreur macd');
                    }
                  }
                }

                executeAll().then(() => {
                  if (arraysHaveSameOrder(useOrNotUseConfig, useOrNotUse)) {
                    actionJours.push(stock[i].symbol);
                  }
                });
              }
            } else {
              console.error("Les données n'ont pas de datetime.");
            }
          }
        });

        fetchPromises.push(fetchPromise);
      } catch {
        console.log(`L'index ${i} n'existe pas`);
        stopLoop = true;
      }
    }

    await Promise.all(fetchPromises).catch((error: any) => {
      console.error("Erreur lors de l'exécution des promesses :", error);
    });
    return actionJours;
  } else {
    return [];
  }
}
