import { fetchStocks } from './fetchStocks';
import { checkIfPositive } from './checkIfPositive';
import { fetchRsi } from './fetchRsi';
import { checkDateTime } from './checkDateTime';
import fetch from 'node-fetch';

// Check pour 2 rouge puis 2 vertes

export async function checkBougie(
  stock: any[],
  start: number,
  end: number,
  price: number,
  minRsi: number,
  maxRsi: number,
  bougiePattern: string[],
) {
  let actionJours: string[] = [];
  let fetchPromises: any[] = [];
  let stopLoop = false;
  const bougieConfig = bougiePattern.map((bougie) => {
    return bougie === '1' ? true : false;
  });

  // console.log("bougieConfig",bougieConfig)

  for (let i = start; i < end; i++) {
    if (stopLoop) {
      break;
    }
    try {

      const fetchPromise = await fetchStocks(stock[i].symbol, bougiePattern.length).then((res) => {
        //Endroit prix action minimum
        if (parseFloat(res.values?.[0].close) > price) {

          const dateTime = checkDateTime(bougiePattern, res)

          if (
            dateTime === true 
          ) {

            const bougiePatternActionEnCour = [];

            for(let x = 0; x < bougiePattern.length; x++) {
              const bougie = checkIfPositive(res.values[x].open, res.values[x].close);
              bougiePatternActionEnCour.push(bougie);
            }

            function arraysHaveSameOrder(bougieConfig:boolean[], bougiePatternActionEnCour:boolean[]) {
              if (bougieConfig.length !== bougiePatternActionEnCour.length) {
                return false;
              }
            
              for (let i = 0; i < bougieConfig.length; i++) {
                if (bougieConfig[i] !== bougiePatternActionEnCour[i]) {
                  return false;
                }
              }
            
              return true;
            }

            // console.log('bougiePatternActionEnCourAvant',stock[i].symbol,bougiePatternActionEnCour);
            
            if (
              arraysHaveSameOrder(bougieConfig, bougiePatternActionEnCour)
            ) {

              // console.log('bougiePatternActionEnCourAprès',stock[i].symbol,bougiePatternActionEnCour);

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
