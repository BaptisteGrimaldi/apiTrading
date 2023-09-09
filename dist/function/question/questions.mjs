var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { questionIndice, questionStrategie, questionPrix, questionMinRsi, questionMaxRsI, questionStochastiqueSlowDmin, questionStochastiqueSlowDmax, questionStochastiqueSlowKmin, questionStochastiqueSlowKmax, cycleApi, questionBougieConfig, } from './questionSimple.mjs';;
export function poserQuestionsEnSeries() {
    return __awaiter(this, void 0, void 0, function* () {
        const indice = yield questionIndice('Quel indice voulez-vous checker ?');
        const strategie = yield questionStrategie('Quel stratégie voulez-vous ?');
        const prix = yield questionPrix('Quel prix minimum voulez-vous ?');
        const minRsi = yield questionMinRsi('Quel rsi minimum voulez-vous ?');
        const maxRsi = yield questionMaxRsI('Quel rsi maximum voulez-vous ?');
        const stochastiqueSlowKmin = yield questionStochastiqueSlowKmin('Quel stochastique min slow K voulez-vous ? (barre bleu)');
        const stochastiqueSlowKmax = yield questionStochastiqueSlowKmax('Quel stochastique max slow K voulez-vous ? (barre bleu)');
        const stochastiqueSlowDmin = yield questionStochastiqueSlowDmin('Quel stochastique min slow D voulez-vous ? (barre orange)');
        const stochastiqueSlowDmax = yield questionStochastiqueSlowDmax('Quel stochastique max slow D voulez-vous ? (barre orange)');
        const api = yield cycleApi('Nombre appel api par clycle ?');
        const bougieConfig = yield questionBougieConfig('Quel configuration de bougie voulez-vous ?');
        const useOrNotUse = {
            minRsi: () => (minRsi === '' ? false : true),
            maxRsi: () => (maxRsi === '' ? false : true),
            stochastiqueSlowKmin: () => (stochastiqueSlowKmin === '' ? false : true),
            stochastiqueSlowKmax: () => (stochastiqueSlowKmax === '' ? false : true),
            stochastiqueSlowDmin: () => (stochastiqueSlowDmin === '' ? false : true),
            stochastiqueSlowDmax: () => (stochastiqueSlowDmax === '' ? false : true),
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
            stochastiqueSlowDmin: useOrNotUse.stochastiqueSlowDmin()
                ? parseFloat(stochastiqueSlowDmin)
                : false,
            stochastiqueSlowDmax: useOrNotUse.stochastiqueSlowDmax()
                ? parseFloat(stochastiqueSlowDmax)
                : false,
            useOrNotUse: useOrNotUse,
        };
        return reponsesQuestion;
    });
}
// poserQuestionsEnSeries().then((reponsesQuestion) => {
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi);
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi());
// });
