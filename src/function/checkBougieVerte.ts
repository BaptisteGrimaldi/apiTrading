import { fetchStocks } from './fetchStocks';
import { checkIfPositive } from './checkIfPositive';
import fetch from 'node-fetch';

// Check pour 2 rouge puis 2 vertes

export async function checkBougieVerte(
  stock: any[],
  start: number,
  end: number,
  price:number
) {
  let action2joursPositifs: string[] = [];
  let fetchPromises = [];
  let stopLoop = false;

  for (let i = start; i < end; i++) {
    if (stopLoop) {
      break;
    }
    //Stratégie précise : 
    try {
      const fetchPromise = fetchStocks(stock[i].symbol, 4)
        .then((res) => {
          //Endroit prix action minimum
          if (parseFloat(res.values?.[0].close) > price) {
            if (
              res.values?.[0]?.datetime &&
              res.values?.[1].datetime &&
              res.values?.[2]?.datetime
            ) {
              const day1 = checkIfPositive(
                res.values[0].open,
                res.values[0].close
              );

              const day2 = checkIfPositive(
                res.values[1].open,
                res.values[1].close
              );

              const day3 = checkIfPositive(
                res.values[2].open,
                res.values[2].close
              );

              const day4 = checkIfPositive(
                res.values[3].open,
                res.values[3].close
              );

              if (
                day1 === true &&
                day2 === true &&
                day3 === false &&
                day4 === false
              ) {
                // vrai fetch rsi ici

                async function fetchRsi(symbol: string) {
                  await fetch(
                    `https://api.twelvedata.com/rsi?symbol=${stock[i].symbol}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`
                  )
                    .then((res) => {
                      return res.json();
                    })
                    .then((res:any) => {
                      console.log(
                        `${stock[i].symbol}` + ' avant ' + res.values[0].rsi
                      );

                      if (res.values[0].rsi > 50) {
                        action2joursPositifs.push(stock[i].symbol);
                        console.log(
                          `${stock[i].symbol}` + ' après ' + res.values[0].rsi
                        );
                      }
                    })
                    .catch(() => {
                      console.log('RSI non trouvé', stock[i].symbol);
                    });
                }

                fetchRsi(stock[i].symbol);
              }
            } else {
              console.error("Les données n'ont pas de datetime.");
            }
          }
        })
        .catch(() => {
          console.error('function fetchStock potentielement problème ! ');
        });

      fetchPromises.push(fetchPromise);
    } catch {
      console.log(`L'index ${i} n'existe pas`);
      stopLoop = true;
    }
  }

  await Promise.all(fetchPromises).catch((error) => {
    console.error("Erreur lors de l'exécution des promesses :", error);
  });

  return action2joursPositifs;
}

// 3 bougie 1 verte : à voir !
