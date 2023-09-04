import { fetchStocksList } from './function/fetchStocksList';
import { checkBougieVerte } from './function/checkBougieVerte';
import { waitPromesse } from './function/waitPromesse';

import inquirer from 'inquirer';

async function questionIndice(question: string){
  const reponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: question,
      choices: ['Nasdaq', 'NYSE', 'AMEX'],
    },
  ]);

  return reponse.indice;
}
async function questionStrategie(question: string){
  const reponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'strategie',
      message: question,
      choices: ['check2BougiesVertes2Rouges'],
    },
  ]);

  return reponse.strategie;
}



async function poserQuestionsEnSeries(): Promise<string[]> {
  // const reponse1: string = await poserQuestion('Quel indice voulez-vous checker ? (Nasdaq)','Nasdaq');
  // const reponse2: string = await poserQuestion('Quel stratégie voulez-vous ? (check2BougiesVertes2Rouges)','check2BougiesVertes2Rouges');

  const question1: string = await questionIndice('Quel indice voulez-vous checker ?');
  const question2: string = await questionStrategie('Quel stratégie voulez-vous ?');

  const reponses: string[] = [question1, question2];

  return reponses;
}

poserQuestionsEnSeries().then((reponses) => {

  const nasdaqStock: Promise<any[]> = fetchStocksList(reponses[0]).then((res) => {
    return res.data;
  });
  
  const nasdaqStockLength: Promise<number> = fetchStocksList(reponses[0]).then(
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
          await waitPromesse(70000);
          await initStrategie((x - 1) * 500, x * 500);
        }
      }
      
      async function initStrategie(start: number, end: number,strat:string = reponses[1]) {

        switch (strat) {
          case 'check2BougiesVertes2Rouges':
            let strategie = await checkBougieVerte(stockData, start, end);
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
    