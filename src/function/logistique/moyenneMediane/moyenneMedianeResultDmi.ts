
import { dataResultBackTestingDmi } from '../../../types/dataResultBackTestingDmi';
import { mediane } from '../mediane';

export function moyenneMedianeResultDmi(
  resultSuccess: dataResultBackTestingDmi[],
  resultFail: dataResultBackTestingDmi[]
) {
  const moyenneVariationSuccess1: number[] = [];

  const moyenneVariationSuccessResult: number[] = [];
  const moyenneGapHautSuccess: number[] = [];
  const moyenneGapBasSuccess: number[] = [];

  try {
    for (const result of resultSuccess) {
      moyenneVariationSuccess1.push(result.bougieDataMoin1Variation);

      moyenneVariationSuccessResult.push(result.bougieDataPlus1Result.variation);
      moyenneGapHautSuccess.push(result.bougieDataPlus1Result.gapHaut);
      moyenneGapBasSuccess.push(result.bougieDataPlus1Result.gapBas);
    }
  } catch (error) {
    console.log('moyenneVariationSuccess error');
  }

  const moyenneVariationFail1: number[] = [];

  const moyenneVariationFail2: number[] = [];
  const moyenneGapHautFail: number[] = [];
  const moyenneGapBasFail: number[] = [];

  try {
    for (const result of resultFail) {
      moyenneVariationFail1.push(result.bougieDataMoin1Variation);

      moyenneVariationFail2.push(result.bougieDataPlus1Result.variation);
      moyenneGapHautFail.push(result.bougieDataPlus1Result.gapHaut);
      moyenneGapBasFail.push(result.bougieDataPlus1Result.gapBas);
    }
  } catch {
    console.log('moyenneVariationFail error');
  }

  // Pour supprimer le dernier élément du calcul qui est forcément undefined*

  // Fiable avant le marché

  // moyenneVariationFail1.pop();
  // moyenneVariationFail2.pop();
  // moyenneGapHautFail.pop();
  // moyenneGapBasFail.pop();

  console.log('moyenneVariationSuccess', moyenneVariationSuccess1.length);
  console.log('moyenneVariationFail', moyenneVariationFail1.length);

  console.log(
    'chance de réussite :' +
      ((moyenneVariationSuccess1.length /
        (moyenneVariationSuccess1.length + moyenneVariationFail1.length)) *
        100 +
        '%')
  );

  const moyenneVariationSuccessResult1 =
    moyenneVariationSuccess1.reduce((a, b) => a + b, 0) /
    moyenneVariationSuccess1.length;

  const moyenneVariationSuccessResultReal =
  moyenneVariationSuccessResult.reduce((a, b) => a + b, 0) /
  moyenneVariationSuccessResult.length;
  const moyenneGapHautSuccessResult =
    moyenneGapHautSuccess.reduce((a, b) => a + b, 0) /
    moyenneGapHautSuccess.length;
  const moyenneGapBasSuccessResult =
    moyenneGapBasSuccess.reduce((a, b) => a + b, 0) /
    moyenneGapBasSuccess.length;

  const moyenneVariationFailResult1 =
    moyenneVariationFail1.reduce((a, b) => a + b, 0) /
    moyenneVariationFail1.length;

  const moyenneVariationFailResult2 =
    moyenneVariationFail2.reduce((a, b) => a + b, 0) /
    moyenneVariationFail2.length;
  const moyenneGapHautFailResult =
    moyenneGapHautFail.reduce((a, b) => a + b, 0) /
    moyenneGapHautFail.length;
  const moyenneGapBasFailResult =
    moyenneGapBasFail.reduce((a, b) => a + b, 0) /
    moyenneGapBasFail.length;

  console.log('moyenneVariationSuccessResultI-1', moyenneVariationSuccessResult1.toFixed(2));
  console.log('medianeVariationSuccessResultI-1', mediane(moyenneVariationSuccess1).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneVariationSuccessResultI+1', moyenneVariationSuccessResultReal.toFixed(2));
  console.log('medianeVariationSuccessResultI+1', mediane(moyenneVariationSuccessResult).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapHautSuccessResultI+1', moyenneGapHautSuccessResult.toFixed(2));
  console.log('medianeGapHautSuccessResultI+1', mediane(moyenneGapHautSuccess).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapBasSuccessResultI+1', moyenneGapBasSuccessResult.toFixed(2));
  console.log('medianeGapBasSuccessResultI+1', mediane(moyenneGapBasSuccess).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('---------------------------------------------------');
  console.log('moyenneVariationFailResultI-1', moyenneVariationFailResult1.toFixed(2));
  console.log('medianeVariationFailResultI-1', mediane(moyenneVariationFail1).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneVariationFailResultI+1', moyenneVariationFailResult2.toFixed(2));
  console.log('medianeVariationFailResultI+1', mediane(moyenneVariationFail2).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapHautFailResultI+1', moyenneGapHautFailResult.toFixed(2));
  console.log('medianeGapHautFailResultI+1', mediane(moyenneGapHautFail).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapBasFailResultI+1', moyenneGapBasFailResult.toFixed(2));
  console.log('medianeGapBasFailResultI+1', mediane(moyenneGapBasFail).toFixed(2));
}
