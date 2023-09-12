import { fetchStocksList } from './function/fetchStock/fetchStocksList';
import { analyse } from './function/analyse';
import { waitPromesse } from './function/logistique/waitPromesse';
import { poserQuestionsEnSeries } from './function/question/questions';
import { checkRsiIndex } from './function/indicateurs/rsi/checkRsiIndex';

interface UseOrNotUse {
  minRsi: () => boolean;
  maxRsi: () => boolean;
  stochastiqueSlowKmin: () => boolean;
  stochastiqueSlowKmax: () => boolean;
  ecartSlowkSlowd: () => boolean;
  macd: () => boolean;
}

poserQuestionsEnSeries().then((reponsesQuestion) => {
  const exchangeStock: Promise<any[]> = fetchStocksList(
    reponsesQuestion.indice
  ).then((res) => {
    return res.data;
  });

  const exchangeStockLength: Promise<number> = fetchStocksList(
    reponsesQuestion.indice
  ).then((res) => {
    return res.data.length;
  });

  Promise.all([exchangeStock, exchangeStockLength])
    .then(([stockData, stockDataLength]) => {
      let listeFinal: string[] = [];

      // Ici le nombre d'appel est limité à 500 par minute

      const nombreCycleIteration = Math.ceil(
        stockDataLength / reponsesQuestion.api
      );

      resolveAllIndice(nombreCycleIteration).then(() => {
        console.log('VraiListeFinal', listeFinal);
      });

      async function resolveAllIndice(nombreCycleIteration: number) {
        for (let x = 1; x < nombreCycleIteration + 1; x++) {
          console.log('startAttente');
          await waitPromesse(70000);
          await initStrategie(
            (x - 1) * reponsesQuestion.api,
            x * reponsesQuestion.api
          );
        }
      }

      async function initStrategie(
        start: number,
        end: number,
        strat: string = reponsesQuestion.strategie,
        price: number = reponsesQuestion.prix,

        minRsi: number | boolean = reponsesQuestion.minRsi,
        maxRsi: number | boolean = reponsesQuestion.maxRsi,

        stochastiqueSlowKmin:
          | number
          | boolean = reponsesQuestion.stochastiqueSlowKmin,
        stochoastiqueSlowKmax:
          | number
          | boolean = reponsesQuestion.stochastiqueSlowKmax,

        ecartSlowkSlowd: number | boolean = reponsesQuestion.ecartSlowkSlowd,

        macd: number | boolean = reponsesQuestion.macd,

        bougiePattern: string[] = reponsesQuestion.bougieConfig,
        useOrNotUse: UseOrNotUse = reponsesQuestion.useOrNotUse
      ) {
        switch (strat) {
          case 'check2BougiesVertes2Rouges':
            let strategie = await analyse(
              stockData,
              start,
              end,
              price,
              minRsi,
              maxRsi,
              stochastiqueSlowKmin,
              stochoastiqueSlowKmax,
              ecartSlowkSlowd,
              macd,
              bougiePattern,
              useOrNotUse
            );
            await addList(strategie);
            break;
          case 'rsiBas':
            let strategie2 = await analyse(
              stockData,
              start,
              end,
              price,
              minRsi,
              maxRsi,
              stochastiqueSlowKmin,
              stochoastiqueSlowKmax,
              ecartSlowkSlowd,
              macd,
              bougiePattern,
              useOrNotUse
            ).then((res) => {
              return checkRsiIndex(res, bougiePattern);
            });
            await addList(strategie2);
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
