var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchStocksList } from './function/fetchStocksList.mjs';;
import { checkBougieVerte } from './function/checkBougieVerte.mjs';;
import { waitPromesse } from './function/waitPromesse.mjs';;
import inquirer from 'inquirer';
function questionIndice(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'list',
                name: 'indice',
                message: question,
                choices: ['Nasdaq', 'NYSE', 'AMEX'],
            },
        ]);
        return reponse.indice;
    });
}
function questionStrategie(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'list',
                name: 'strategie',
                message: question,
                choices: ['check2BougiesVertes2Rouges'],
            },
        ]);
        return reponse.strategie;
    });
}
function poserQuestionsEnSeries() {
    return __awaiter(this, void 0, void 0, function* () {
        // const reponse1: string = await poserQuestion('Quel indice voulez-vous checker ? (Nasdaq)','Nasdaq');
        // const reponse2: string = await poserQuestion('Quel stratégie voulez-vous ? (check2BougiesVertes2Rouges)','check2BougiesVertes2Rouges');
        const question1 = yield questionIndice('Quel indice voulez-vous checker ?');
        const question2 = yield questionStrategie('Quel stratégie voulez-vous ?');
        const reponses = [question1, question2];
        return reponses;
    });
}
poserQuestionsEnSeries().then((reponses) => {
    const nasdaqStock = fetchStocksList(reponses[0]).then((res) => {
        return res.data;
    });
    const nasdaqStockLength = fetchStocksList(reponses[0]).then((res) => {
        return res.data.length;
    });
    Promise.all([nasdaqStock, nasdaqStockLength])
        .then(([stockData, stockDataLength]) => {
        let listeFinal = [];
        const nombreCycleIteration = Math.ceil(stockDataLength / 500);
        resolveAllIndice(nombreCycleIteration).then(() => {
            console.log('VraiListeFinal', listeFinal);
        });
        function resolveAllIndice(nombreCycleIteration) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let x = 1; x < nombreCycleIteration + 1; x++) {
                    console.log('startAttente');
                    yield waitPromesse(70000);
                    yield initStrategie((x - 1) * 500, x * 500);
                }
            });
        }
        function initStrategie(start, end, strat = reponses[1]) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (strat) {
                    case 'check2BougiesVertes2Rouges':
                        let strategie = yield checkBougieVerte(stockData, start, end);
                        yield addList(strategie);
                        break;
                }
            });
        }
        function addList(checkBougieVerteResult) {
            return __awaiter(this, void 0, void 0, function* () {
                listeFinal = listeFinal.concat(checkBougieVerteResult);
                console.log('liste Intermédiaire', listeFinal);
            });
        }
    })
        .catch((error) => {
        console.error("Une erreur s'est produite :", error);
    });
});
