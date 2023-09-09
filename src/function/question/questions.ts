import {
  questionIndice,
  questionStrategie,
  questionPrix,
  questionMinRsi,
  questionMaxRsI,
  questionStochastiqueSlowDmin,
  questionStochastiqueSlowDmax,
  questionStochastiqueSlowKmin,
  questionStochastiqueSlowKmax,
  cycleApi,
  questionBougieConfig,
} from './questionSimple';

interface UseOrNotUse {
  minRsi: () => boolean;
  maxRsi: () => boolean;
  stochastiqueSlowKmin: () => boolean;
  stochastiqueSlowKmax: () => boolean;
  stochastiqueSlowDmin: () => boolean;
  stochastiqueSlowDmax: () => boolean;
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

  stochastiqueSlowDmin: number | boolean;
  stochastiqueSlowDmax: number | boolean;
  useOrNotUse: UseOrNotUse;
}

export async function poserQuestionsEnSeries(): Promise<ReponsesQuestion> {
  const indice: string = await questionIndice(
    'Quel indice voulez-vous checker ?'
  );
  const strategie: string = await questionStrategie(
    'Quel stratégie voulez-vous ?'
  );
  const prix: string = await questionPrix('Quel prix minimum voulez-vous ?');

  const minRsi: string = await questionMinRsi('Quel rsi minimum voulez-vous ?');
  const maxRsi: string = await questionMaxRsI('Quel rsi maximum voulez-vous ?');

  const stochastiqueSlowKmin: string = await questionStochastiqueSlowKmin(
    'Quel stochastique min slow K voulez-vous ? (barre bleu)'
  );
  const stochastiqueSlowKmax: string = await questionStochastiqueSlowKmax(
    'Quel stochastique max slow K voulez-vous ? (barre bleu)'
  );

  const stochastiqueSlowDmin: string = await questionStochastiqueSlowDmin(
    'Quel stochastique min slow D voulez-vous ? (barre orange)'
  );
  const stochastiqueSlowDmax: string = await questionStochastiqueSlowDmax(
    'Quel stochastique max slow D voulez-vous ? (barre orange)'
  );

  const api: string = await cycleApi('Nombre appel api par clycle ?');

  const bougieConfig: string = await questionBougieConfig(
    'Quel configuration de bougie voulez-vous ?'
  );

  const useOrNotUse: UseOrNotUse = {
    minRsi: () => (minRsi === '' ? false : true),
    maxRsi: () => (maxRsi === '' ? false : true),
    stochastiqueSlowKmin: () => (stochastiqueSlowKmin === '' ? false : true),
    stochastiqueSlowKmax: () => (stochastiqueSlowKmax === '' ? false : true),
    stochastiqueSlowDmin: () => (stochastiqueSlowDmin === '' ? false : true),
    stochastiqueSlowDmax: () => (stochastiqueSlowDmax === '' ? false : true),
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

    stochastiqueSlowDmin: useOrNotUse.stochastiqueSlowDmin()
      ? parseFloat(stochastiqueSlowDmin)
      : false,
    stochastiqueSlowDmax: useOrNotUse.stochastiqueSlowDmax()
      ? parseFloat(stochastiqueSlowDmax)
      : false,

    useOrNotUse: useOrNotUse,
  };

  return reponsesQuestion;
}

// poserQuestionsEnSeries().then((reponsesQuestion) => {
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi);
//   console.log('reponsesQuestion', reponsesQuestion.useOrNotUse.minRsi());
// });
