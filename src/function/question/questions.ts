import {
  questionIndice,
  questionStrategie,
  questionPrix,
  questionMinRsi,
  questionMaxRsI,
  questionStochastiqueSlowKmin,
  questionStochastiqueSlowKmax,
  ecartSlowkSlowd,
  cycleApi,
  questionBougieConfig,
  questionMacd,
} from './questionSimple';

interface UseOrNotUse {
  minRsi: () => boolean;
  maxRsi: () => boolean;
  stochastiqueSlowKmin: () => boolean;
  stochastiqueSlowKmax: () => boolean;
  ecartSlowkSlowd: () => boolean;
  macd: () => boolean;
}

interface ReponsesQuestion {
  indice: string;
  strategie: string;
  prix: number;
  minRsi: number | boolean;
  maxRsi: number | boolean;
  api: number;
  bougieConfig: string[];

  stochastiqueSlowKmin: number | boolean;
  stochastiqueSlowKmax: number | boolean;
  ecartSlowkSlowd: number | boolean;
  macd: number | boolean;

  useOrNotUse: UseOrNotUse;
}



export async function poserQuestionsEnSeries(): Promise<ReponsesQuestion> {

  //obligatoire

  async function questionObligatoire(){

    const indice: string = await questionIndice(
      'Quel indice voulez-vous checker ?'
    );
  
    const prix: string = await questionPrix('Quel prix minimum voulez-vous ?');
  
    const api: string = await cycleApi('Nombre appel api par clycle ?');
  
    const bougieConfig: string = await questionBougieConfig(
      'Quel configuration de bougie voulez-vous ?'
    );
    
    const strategie: string = await questionStrategie(
      'Quel stratégie voulez-vous ?'
    );

    return {indice, prix, api, bougieConfig, strategie}

  }

  const questionObli = await questionObligatoire()


  interface QuestionOptionelStrat {
    minRsi: string;
    maxRsi: string;
    stochastiqueSlowKmin: string;
    stochastiqueSlowKmax: string;
    ecartSlowSlowk: string;
    macd: string;
  }

  let questionOptionelStrat:QuestionOptionelStrat = {minRsi: '', maxRsi: '', stochastiqueSlowKmin: '', stochastiqueSlowKmax: '', ecartSlowSlowk: '', macd: ''};


   switch (questionObli.strategie) {
    case 'check2BougiesVertes2Rouges': 

    const minRsi: string = await questionMinRsi('Quel rsi minimum voulez-vous ?');
    const maxRsi: string = await questionMaxRsI('Quel rsi maximum voulez-vous ?');
    const stochastiqueSlowKmin: string = await questionStochastiqueSlowKmin(
      'Quel stochastique min slow K voulez-vous ? (barre bleu) 666 si juste croisement slow K et slow D'
    );
    const stochastiqueSlowKmax: string = await questionStochastiqueSlowKmax(
      'Quel stochastique max slow K voulez-vous ? (barre bleu) 666 si juste croisement slow K et slow D'
    );
  
    const ecartSlowSlowk: string = await ecartSlowkSlowd(
      'Quel ecart entre slow K et slow D voulez-vous ?'
    );
  
    const macd: string = await questionMacd('Quel macd voulez-vous ? 666 si juste macd > macd signal');
  
    questionOptionelStrat =  {minRsi : minRsi, maxRsi : maxRsi, stochastiqueSlowKmin :stochastiqueSlowKmin, stochastiqueSlowKmax : stochastiqueSlowKmax, ecartSlowSlowk : ecartSlowSlowk, macd : macd}
    break;

    case 'rsiBas':
    break
  }

  //optionel

  const useOrNotUse: UseOrNotUse = {
    minRsi: () => (questionOptionelStrat.minRsi === '' ? false : true),
    maxRsi: () => (questionOptionelStrat.maxRsi === '' ? false : true),
    stochastiqueSlowKmin: () => (questionOptionelStrat.stochastiqueSlowKmin === '' ? false : true),
    stochastiqueSlowKmax: () => (questionOptionelStrat.stochastiqueSlowKmax === '' ? false : true),
    ecartSlowkSlowd: () => (questionOptionelStrat.ecartSlowSlowk === '' ? false : true),
    macd: () => (questionOptionelStrat.macd === '' ? false : true),
  };

  const reponsesQuestion: ReponsesQuestion = {
    indice: questionObli.indice,
    strategie: questionObli.strategie,
    prix: parseInt(questionObli.prix),

    minRsi: useOrNotUse.minRsi() ? parseFloat(questionOptionelStrat.minRsi) : false,
    maxRsi: useOrNotUse.maxRsi() ? parseFloat(questionOptionelStrat.maxRsi) : false,

    api: parseInt(questionObli.api),
    bougieConfig: questionObli.bougieConfig.split(''),

    stochastiqueSlowKmin: useOrNotUse.stochastiqueSlowKmin()
      ? parseFloat(questionOptionelStrat.stochastiqueSlowKmin)
      : false,
    stochastiqueSlowKmax: useOrNotUse.stochastiqueSlowKmax()
      ? parseFloat(questionOptionelStrat.stochastiqueSlowKmax)
      : false,

    ecartSlowkSlowd: useOrNotUse.ecartSlowkSlowd()
      ? parseFloat(questionOptionelStrat.ecartSlowSlowk)
      : false,

    macd: useOrNotUse.macd() ? parseFloat(questionOptionelStrat.macd) : false,

    useOrNotUse: useOrNotUse,
  };

  return reponsesQuestion;
}

// poserQuestionsEnSeries().then((reponsesQuestion) => {
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi);
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi());
// });
