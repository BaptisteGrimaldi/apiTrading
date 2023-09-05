import { fetchStocksList } from './function/fetchStocksList';
import { checkBougieVerte } from './function/checkBougieVerte';
import { waitPromesse } from './function/waitPromesse';
import { poserQuestionsEnSeries } from './function/questions';

poserQuestionsEnSeries().then((reponsesQuestion) => {
  const exchangeStock: Promise<any[]> = fetchStocksList(
    reponsesQuestion[0]
  ).then((res) => {
    return res.data;
  });

  const exchangeStockLength: Promise<number> = fetchStocksList(
    reponsesQuestion[0]
  ).then((res) => {
    return res.data.length;
  });

  Promise.all([exchangeStock, exchangeStockLength])
    .then(([stockData, stockDataLength]) => {
      let listeFinal: string[] = [];

      // Ici le nombre d'appel est limité à 500 par minute

      const nombreCycleIteration = Math.ceil(
        stockDataLength / reponsesQuestion[4]
      );

      resolveAllIndice(nombreCycleIteration).then(() => {
        console.log('VraiListeFinal', listeFinal);
      });

      async function resolveAllIndice(nombreCycleIteration: number) {
        for (let x = 1; x < nombreCycleIteration + 1; x++) {
          console.log('startAttente');
          await waitPromesse(70000);
          await initStrategie(
            (x - 1) * reponsesQuestion[4],
            x * reponsesQuestion[4]
          );
        }
      }

      async function initStrategie(
        start: number,
        end: number,
        strat: string = reponsesQuestion[1],
        price: number = reponsesQuestion[2],
        minRsi: number = reponsesQuestion[3]
      ) {
        switch (strat) {
          case 'check2BougiesVertes2Rouges':
            let strategie = await checkBougieVerte(
              stockData,
              start,
              end,
              price
            );
            await addList(strategie);
            break;
        }
      }

      async function addList(checkBougieVerteResult: string[]) {
        listeFinal = listeFinal.concat(checkBougieVerteResult);
        console.log('liste Intermédiaire', listeFinal);
      }
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
});
