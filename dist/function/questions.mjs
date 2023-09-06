var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function questionPrix(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'input',
                name: 'prix',
                message: question,
            },
        ]);
        return reponse.prix;
    });
}
function questionMinRsi(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'input',
                name: 'prix',
                message: question,
            },
        ]);
        return reponse.prix;
    });
}
function questionMaxRsI(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'input',
                name: 'maxRSI',
                message: question,
            },
        ]);
        return reponse.maxRSI;
    });
}
function cycleApi(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'input',
                name: 'api',
                message: question,
            },
        ]);
        return reponse.api;
    });
}
function questionBougieConfig(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield inquirer.prompt([
            {
                type: 'input',
                name: 'bougie',
                message: question,
            },
        ]);
        return reponse.bougie;
    });
}
export function poserQuestionsEnSeries() {
    return __awaiter(this, void 0, void 0, function* () {
        const indice = yield questionIndice('Quel indice voulez-vous checker ?');
        const strategie = yield questionStrategie('Quel stratégie voulez-vous ?');
        const prix = yield questionPrix('Quel prix minimum voulez-vous ?');
        const minRsi = yield questionMinRsi('Quel rsi minimum voulez-vous ?');
        const maxRsi = yield questionMaxRsI('Quel rsi maximum voulez-vous ?');
        const api = yield cycleApi('Nombre appel api par clycle ?');
        const bougieConfig = yield questionBougieConfig('Quel configuration de bougie voulez-vous ?');
        const reponsesQuestion = {
            indice: indice,
            strategie: strategie,
            prix: parseInt(prix),
            minRsi: parseFloat(minRsi),
            maxRsi: parseFloat(maxRsi),
            api: parseInt(api),
            bougieConfig: bougieConfig.split(''),
        };
        return reponsesQuestion;
    });
}
