import { fetchStocks } from './fetchStocks';
import { checkIfPositive } from './checkIfPositive';
import { fetchRsi } from './fetchRsi';
import fetch from 'node-fetch';

// Check pour 2 rouge puis 2 vertes

export async function checkBougie(
  stock: any[],
  start: number,
  end: number,
  price: number,
  minRsi: number,
  maxRsi: number,
  bougiePattern : string[]
) {
  let actionJours: string[] = [];
  let fetchPromises: any[] = [];
  let stopLoop = false;

  // Renvoie undefined je sais pas pourquoi
  // console.log(bougiePattern.length)

  for (let i = start; i < end; i++) {
    if (stopLoop) {
      break;
    }
    //Stratégie précise :
    try {
      // try{
      // // console.log("bougieNumber",bougiePattern.length)
      // console.log(price)   
      // }catch{
      //   console.log("Erreur bougiePattern")
      // }

      const fetchPromise = await fetchStocks(stock[i].symbol, 4).then((res) => {
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

              fetchRsi(stock[i].symbol, minRsi,maxRsi)
                .then((res: boolean) => {
                  if (res === true) {
                    actionJours.push(stock[i].symbol);
                  }
                })
                .catch(() => {
                  console.log('RSI non trouvé', stock[i].symbol);
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

}

// 3 bougie 1 verte : à voir !
