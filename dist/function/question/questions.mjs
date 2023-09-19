var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { questionIndice, questionStrategie, questionPrix, questionMinRsi, questionMaxRsI, questionStochastiqueSlowKmin, questionStochastiqueSlowKmax, ecartSlowkSlowd, cycleApi, questionBougieConfig, questionMacd, } from './questionSimple.mjs';;
export function poserQuestionsEnSeries() {
    return __awaiter(this, void 0, void 0, function* () {
        //obligatoire
        function questionObligatoire() {
            return __awaiter(this, void 0, void 0, function* () {
                const indice = yield questionIndice('Quel indice voulez-vous checker ?');
                const prix = yield questionPrix('Quel prix minimum voulez-vous ?');
                const api = yield cycleApi('Nombre appel api par clycle ?');
                const bougieConfig = yield questionBougieConfig('Quel configuration de bougie voulez-vous ?');
                const strategie = yield questionStrategie('Quel stratégie voulez-vous ?');
                return { indice, prix, api, bougieConfig, strategie };
            });
        }
        const questionObli = yield questionObligatoire();
        let questionOptionelStrat = {
            minRsi: '',
            maxRsi: '',
            stochastiqueSlowKmin: '',
            stochastiqueSlowKmax: '',
            ecartSlowSlowk: '',
            macd: '',
        };
        switch (questionObli.strategie) {
            case 'check2BougiesVertes2Rouges':
                const minRsi = yield questionMinRsi('Quel rsi minimum voulez-vous ?');
                const maxRsi = yield questionMaxRsI('Quel rsi maximum voulez-vous ?');
                const stochastiqueSlowKmin = yield questionStochastiqueSlowKmin('Quel stochastique min slow K voulez-vous ? (barre bleu) 666 si juste croisement slow K et slow D');
                const stochastiqueSlowKmax = yield questionStochastiqueSlowKmax('Quel stochastique max slow K voulez-vous ? (barre bleu) 666 si juste croisement slow K et slow D');
                const ecartSlowSlowk = yield ecartSlowkSlowd('Quel ecart entre slow K et slow D voulez-vous ?');
                const macd = yield questionMacd('Quel macd voulez-vous ? 666 si juste macd > macd signal');
                questionOptionelStrat = {
                    minRsi: minRsi,
                    maxRsi: maxRsi,
                    stochastiqueSlowKmin: stochastiqueSlowKmin,
                    stochastiqueSlowKmax: stochastiqueSlowKmax,
                    ecartSlowSlowk: ecartSlowSlowk,
                    macd: macd,
                };
                break;
            case 'rsiBas10':
                const minRsiRsiBas = yield questionMinRsi('Quel rsi minimum voulez-vous pour la première bougie ?');
                const maxRsiRsiBas = yield questionMaxRsI('Quel rsi maximum voulez-vous pour la première bougie?');
                questionOptionelStrat = {
                    minRsi: minRsiRsiBas,
                    maxRsi: maxRsiRsiBas,
                    stochastiqueSlowKmin: '',
                    stochastiqueSlowKmax: '',
                    ecartSlowSlowk: '',
                    macd: '',
                };
                break;
            case 'dmiAdx':
                break;
        }
        //optionel
        const useOrNotUse = {
            minRsi: () => (questionOptionelStrat.minRsi === '' ? false : true),
            maxRsi: () => (questionOptionelStrat.maxRsi === '' ? false : true),
            stochastiqueSlowKmin: () => (questionOptionelStrat.stochastiqueSlowKmin === '' ? false : true),
            stochastiqueSlowKmax: () => (questionOptionelStrat.stochastiqueSlowKmax === '' ? false : true),
            ecartSlowkSlowd: () => (questionOptionelStrat.ecartSlowSlowk === '' ? false : true),
            macd: () => (questionOptionelStrat.macd === '' ? false : true),
        };
        const reponsesQuestion = {
            indice: questionObli.indice,
            strategie: questionObli.strategie,
            prix: parseInt(questionObli.prix),
            minRsi: useOrNotUse.minRsi() ? parseFloat(questionOptionelStrat.minRsi) : false,
            maxRsi: useOrNotUse.maxRsi() ? parseFloat(questionOptionelStrat.maxRsi) : false,
            api: parseInt(questionObli.api),
            bougieConfig: questionObli.bougieConfig.split(''),
            stochastiqueSlowKmin: useOrNotUse.stochastiqueSlowKmin() ? parseFloat(questionOptionelStrat.stochastiqueSlowKmin) : false,
            stochastiqueSlowKmax: useOrNotUse.stochastiqueSlowKmax() ? parseFloat(questionOptionelStrat.stochastiqueSlowKmax) : false,
            ecartSlowkSlowd: useOrNotUse.ecartSlowkSlowd() ? parseFloat(questionOptionelStrat.ecartSlowSlowk) : false,
            macd: useOrNotUse.macd() ? parseFloat(questionOptionelStrat.macd) : false,
            useOrNotUse: useOrNotUse,
        };
        return reponsesQuestion;
    });
}
// poserQuestionsEnSeries().then((reponsesQuestion) => {
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi);
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi());
// });
