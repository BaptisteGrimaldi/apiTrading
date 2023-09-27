import { dataResultBackTesting4Bv } from '../../../types/dataResultBackTesting4Bv';
import { mediane } from '../mediane';

//ResultSucees et resultFail sont des tableaux de dataResultBackTesting ou des variantes de ce type

export function moyenneMedianeResult4Bv(resultSucess: dataResultBackTesting4Bv[], resultFail: dataResultBackTesting4Bv[]) {
  const moyenneVariationSucess1: number[] = [];

  const moyenneVariationSucessResult: number[] = [];
  const moyenneGapHautSucess: number[] = [];
  const moyenneGapBasSucess: number[] = [];

  try {
    for (const result of resultSucess) {
      moyenneVariationSucess1.push(result.bougieDataPlus1.variation);

      moyenneVariationSucessResult.push(result.bougieDataResult.variation);
      moyenneGapHautSucess.push(result.bougieDataResult.gapHaut);
      moyenneGapBasSucess.push(result.bougieDataResult.gapBas);
    }
  } catch (error) {
    console.log('moyenneVariationSucess error');
  }

  const moyenneVariationFail1: number[] = [];

  const moyenneVariationFailResult: number[] = [];
  const moyenneGapHautFail: number[] = [];
  const moyenneGapBasFail: number[] = [];

  try {
    for (const result of resultFail) {
      moyenneVariationFail1.push(result.bougieDataPlus1.variation);

      moyenneVariationFailResult.push(result.bougieDataResult.variation);
      moyenneGapHautFail.push(result.bougieDataResult.gapHaut);
      moyenneGapBasFail.push(result.bougieDataResult.gapBas);
    }
  } catch {
    console.log('moyenneVariationFail error');
  }

  // Pour suprimer le dernier élément du calcul qui est forcement undefined*

  //Fiable avant le marché

  // moyenneVariationFail1.pop();
  // moyenneVariationFail2.pop();
  // moyenneGapHautFail.pop();
  // moyenneGapBasFail.pop();

  console.log('moyenneVariationSucess', moyenneVariationSucess1.length);
  console.log('moyenneVariationFail', moyenneVariationFail1.length);

  console.log('chance de réussite :' + (moyenneVariationSucess1.length / (moyenneVariationSucess1.length + moyenneVariationFail1.length)) * 100 + '%');

  const moyenneVariationSucessResult1 = moyenneVariationSucess1.reduce((a, b) => a + b, 0) / moyenneVariationSucess1.length;

  const moyenneVariationSucessResult2 = moyenneVariationSucessResult.reduce((a, b) => a + b, 0) / moyenneVariationSucessResult.length;
  const moyenneGapHautSucessResult = moyenneGapHautSucess.reduce((a, b) => a + b, 0) / moyenneGapHautSucess.length;
  const moyenneGapBasSucessResult = moyenneGapBasSucess.reduce((a, b) => a + b, 0) / moyenneGapBasSucess.length;

  const moyenneVariationFailResult1 = moyenneVariationFail1.reduce((a, b) => a + b, 0) / moyenneVariationFail1.length;

  const moyenneVariationFailResult2 = moyenneVariationFailResult.reduce((a, b) => a + b, 0) / moyenneVariationFailResult.length;
  const moyenneGapHautFailResult = moyenneGapHautFail.reduce((a, b) => a + b, 0) / moyenneGapHautFail.length;
  const moyenneGapBasFailResult = moyenneGapBasFail.reduce((a, b) => a + b, 0) / moyenneGapBasFail.length;

  const minGapBasSucess = moyenneGapBasSucess.sort((a: number, b: number) => a - b)[0];
  const minGapBasFail = moyenneGapBasFail.sort((a: number, b: number) => a - b)[0];

  const minGapHautSucess = moyenneGapHautSucess.sort((a: number, b: number) => a - b)[0];
  const minGapHautFail = moyenneGapHautFail.sort((a: number, b: number) => a - b)[0];

  console.log('moyenneVariationSucessResultI+1', moyenneVariationSucessResult1.toFixed(2));
  console.log('medianeVariationSucessResultI+1', mediane(moyenneVariationSucess1).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneVariationSucessResultI', moyenneVariationSucessResult2.toFixed(2));
  console.log('medianeVariationSucessResultI', mediane(moyenneVariationSucessResult).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapHautSucessResultI', moyenneGapHautSucessResult.toFixed(2));
  console.log('medianeGapHautSucessResultI', mediane(moyenneGapHautSucess).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapBasSucessResultI', moyenneGapBasSucessResult.toFixed(2));
  console.log('medianeGapBasSucessResultI', mediane(moyenneGapBasSucess).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('---------------------------------------------------');
  console.log('moyenneVariationFailResultI+1', moyenneVariationFailResult1.toFixed(2));
  console.log('medianeVariationFailResultI+1', mediane(moyenneVariationFail1).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneVariationFailResultI', moyenneVariationFailResult2.toFixed(2));
  console.log('medianeVariationFailResultI', mediane(moyenneVariationFailResult).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapHautFailResultI', moyenneGapHautFailResult.toFixed(2));
  console.log('medianeGapHautFailResultI', mediane(moyenneGapHautFail).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('moyenneGapBasFailResultI', moyenneGapBasFailResult.toFixed(2));
  console.log('medianeGapBasFailResultI', mediane(moyenneGapBasFail).toFixed(2));
  console.log('---------------------------------------------------');
  console.log('Min gap bas Sucess', minGapBasSucess.toFixed(2));
  console.log('Min gap bas Fail', minGapBasFail.toFixed(2));
  console.log('---------------------------------------------------');
  console.log('Min gap haut Sucess', minGapHautSucess.toFixed(2));
  console.log('Min gap haut Fail', minGapHautFail.toFixed(2));
  console.log('---------------------------------------------------');
}
