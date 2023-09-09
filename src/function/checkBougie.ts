import { fetchStocks } from './fetchStocks';
import { checkIfPositive } from './checkIfPositive';
import { fetchRsi } from './fetchRsi';
import { checkDateTime } from './checkDateTime';
import { arraysHaveSameOrder } from './checkTableauSimilaire';
import { fetchStockastique } from './fetchStockastique';
import { fetchMacd } from './fetchMacd';
import fetch from 'node-fetch';

interface UseOrNotUse {
  minRsi: () => boolean;
  maxRsi: () => boolean;
  stochastiqueSlowKmin: () => boolean;
  stochastiqueSlowKmax: () => boolean;
  stochastiqueSlowDmin: () => boolean;
  stochastiqueSlowDmax: () => boolean;
}

export async function checkBougie(
  stock: any[],
  start: number,
  end: number,
  price: number,
  minRsi: number | boolean,
  maxRsi: number | boolean,
  stochastiqueSlowKmin: number | boolean,
  stochoastiqueSlowKmax: number | boolean,
  stochastiqueSlowDmin: number | boolean,
  stochastiqueSlowDmax: number | boolean,
  bougiePattern: string[],
  useOrNotUse: UseOrNotUse
) {
  let actionJours: string[] = [];
  let fetchPromises: any[] = [];
  let stopLoop = false;
  const bougieConfig = bougiePattern.map((bougie) => {
    return bougie === '1' ? true : false;
  });

  let useOrNotUseConfig: boolean[] = [
    useOrNotUse.minRsi(),
    useOrNotUse.stochastiqueSlowKmin(),
    useOrNotUse.stochastiqueSlowDmin(),
  ];

  useOrNotUseConfig = useOrNotUseConfig.filter((value) => value === true);

  console.log("useOrNotUseConfig",useOrNotUseConfig)

  for (let i = start; i < end; i++) {
    if (stopLoop) {
      break;
    }
    try {
      const fetchPromise = await fetchStocks(
        stock[i].symbol,
        bougiePattern.length
      ).then((res) => {
        //Endroit prix action minimum
        if (parseFloat(res.values?.[0].close) > price) {
          const dateTime = checkDateTime(bougiePattern, res);

          if (dateTime === true) {
            const bougiePatternActionEnCour = [];

            for (let x = 0; x < bougiePattern.length; x++) {
              const bougie = checkIfPositive(
                res.values[x].open,
                res.values[x].close
              );
              bougiePatternActionEnCour.push(bougie);
            }

            if (arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour)) {
              const useOrNotUse: boolean[] = [];

              async function executeAll() {
                if (minRsi !== false && maxRsi !== false) {
                  const res = await fetchRsi(stock[i].symbol, minRsi, maxRsi);
                  if (res === true) {
                    useOrNotUse.push(true);
                  } else {
                    return;
                  }
                }
              
                if (
                  typeof stochastiqueSlowKmin === 'number' &&
                  typeof stochoastiqueSlowKmax === 'number'
                ) {
                  try {
                    const res = await fetchStockastique(
                      stock[i].symbol,
                      1,
                      stochastiqueSlowKmin,
                      stochoastiqueSlowKmax,
                      666,
                      666
                    );
                    if (res === true) {
                      useOrNotUse.push(true);
                    } else {
                      return;
                    }
                  } catch {
                    console.log('Erreur stochastiqueSlowKmin');
                  }
                }
              
                if (
                  typeof stochastiqueSlowDmin === 'number' &&
                  typeof stochastiqueSlowDmax === 'number'
                ) {
                  try {
                    const res = await fetchStockastique(
                      stock[i].symbol,
                      1,
                      666,
                      666,
                      stochastiqueSlowDmin,
                      stochastiqueSlowDmax
                    );
                    if (res === true) {
                      useOrNotUse.push(true);
                    } else {
                      return;
                    }
                  } catch {
                    console.log('Erreur stochastiqueSlowDmin');
                  }
                }

              

              }
              
              executeAll().then(() => {
                if (arraysHaveSameOrder(useOrNotUseConfig, useOrNotUse)) {
                  console.log('Action trouvée :', stock[i].symbol);
                  actionJours.push(stock[i].symbol);
                }
              });

              // fetchMacd(stock[i].symbol, 1).then((res) => {
              //   if (
              //     parseFloat(res.values[0].macd) >=
              //     parseFloat(res.values[0].macd_signal)
              //   ) {
              //     console.log('Action trouvée :', stock[i].symbol);
              //   }
              // });

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
}


