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


  //optionel

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



  const useOrNotUse: UseOrNotUse = {
    minRsi: () => (minRsi === '' ? false : true),
    maxRsi: () => (maxRsi === '' ? false : true),
    stochastiqueSlowKmin: () => (stochastiqueSlowKmin === '' ? false : true),
    stochastiqueSlowKmax: () => (stochastiqueSlowKmax === '' ? false : true),
    ecartSlowkSlowd: () => (ecartSlowSlowk === '' ? false : true),
    macd: () => (macd === '' ? false : true),
  };

  const reponsesQuestion: ReponsesQuestion = {
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
}

// poserQuestionsEnSeries().then((reponsesQuestion) => {
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi);
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi());
// });
