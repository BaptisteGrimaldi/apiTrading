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
        const indice = yield questionIndice('Quel indice voulez-vous checker ?');
        const prix = yield questionPrix('Quel prix minimum voulez-vous ?');
        const api = yield cycleApi('Nombre appel api par clycle ?');
        const bougieConfig = yield questionBougieConfig('Quel configuration de bougie voulez-vous ?');
        const strategie = yield questionStrategie('Quel stratégie voulez-vous ?');
        //optionel
        const minRsi = yield questionMinRsi('Quel rsi minimum voulez-vous ?');
        const maxRsi = yield questionMaxRsI('Quel rsi maximum voulez-vous ?');
        const stochastiqueSlowKmin = yield questionStochastiqueSlowKmin('Quel stochastique min slow K voulez-vous ? (barre bleu) 666 si juste croisement slow K et slow D');
        const stochastiqueSlowKmax = yield questionStochastiqueSlowKmax('Quel stochastique max slow K voulez-vous ? (barre bleu) 666 si juste croisement slow K et slow D');
        const ecartSlowSlowk = yield ecartSlowkSlowd('Quel ecart entre slow K et slow D voulez-vous ?');
        const macd = yield questionMacd('Quel macd voulez-vous ? 666 si juste macd > macd signal');
        const useOrNotUse = {
            minRsi: () => (minRsi === '' ? false : true),
            maxRsi: () => (maxRsi === '' ? false : true),
            stochastiqueSlowKmin: () => (stochastiqueSlowKmin === '' ? false : true),
            stochastiqueSlowKmax: () => (stochastiqueSlowKmax === '' ? false : true),
            ecartSlowkSlowd: () => (ecartSlowSlowk === '' ? false : true),
            macd: () => (macd === '' ? false : true),
        };
        const reponsesQuestion = {
            indice: indice,
            strategie: strategie,
            prix: parseInt(prix),
            minRsi: useOrNotUse.minRsi() ? parseFloat(minRsi) : false,
            maxRsi: useOrNotUse.maxRsi() ? parseFloat(maxRsi) : false,
            api: parseInt(api),
            bougieConfig: bougieConfig.split(''),
            stochastiqueSlowKmin: useOrNotUse.stochastiqueSlowKmin()
                ? parseFloat(stochastiqueSlowKmin)
                : false,
            stochastiqueSlowKmax: useOrNotUse.stochastiqueSlowKmax()
                ? parseFloat(stochastiqueSlowKmax)
                : false,
            ecartSlowkSlowd: useOrNotUse.ecartSlowkSlowd()
                ? parseFloat(ecartSlowSlowk)
                : false,
            macd: useOrNotUse.macd() ? parseFloat(macd) : false,
            useOrNotUse: useOrNotUse,
        };
        return reponsesQuestion;
    });
}
// poserQuestionsEnSeries().then((reponsesQuestion) => {
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi);
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi());
// });
