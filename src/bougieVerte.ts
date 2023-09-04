import { checkIfPositive } from './function/checkIfPositive';
import { fetchStocksList } from './function/fetchStocksList';
import { fetchStocks } from './function/fetchStocks';
import { checkBougieVerte } from './function/checkBougieVerte';

const nasdaqStock: Promise<any[]> = fetchStocksList('Nasdaq').then((res) => {
  return res.data;
});

const nasdaqStockLength: Promise<number> = fetchStocksList('Nasdaq').then(
  (res) => {
    return res.data.length;
  }
);

Promise.all([nasdaqStock, nasdaqStockLength])
  .then(([stockData, stockDataLength]) => {
    let listeFinal: string[] = [];

    const nombreCycleIteration = Math.ceil(stockDataLength / 500);

    resolveAllIndice(nombreCycleIteration).then(() => {
      console.log('VraiListeFinal', listeFinal);
    });

    async function resolveAllIndice(nombreCycleIteration: number) {
      for (let x = 1; x < nombreCycleIteration + 1; x++) {
        console.log('startAttente');
        await waitPromesse(70000); // Attendez 70 secondes avant chaque itération
        await checkBougieVerteIteration((x - 1) * 500, x * 500);
      }
    }

    function waitPromesse(ms: number) {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("promesse d'attente finis");
          resolve();
        }, ms);
      });
    }

    async function addList(checkBougieVerteResult:string[]) {
      listeFinal = listeFinal.concat(checkBougieVerteResult);
      console.log("liste Intermédiaire", listeFinal)
    }

    async function checkBougieVerteIteration(start: number, end: number) {
      let checkBougieVerteResult = await checkBougieVerte(
        stockData,
        start,
        end
      );
      await addList(checkBougieVerteResult)
    }
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });
