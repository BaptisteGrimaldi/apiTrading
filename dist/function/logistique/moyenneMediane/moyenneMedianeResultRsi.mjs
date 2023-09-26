import {mediane } from '../mediane.mjs';;
//ResultSucees et resultFail sont des tableaux de dataResultBackTesting ou des variantes de ce type
export function moyenneMedianeResultRsi(resultSucess, resultFail) {
    const moyenneVariationSucess1 = [];
    const moyenneVariationSucessResult = [];
    const moyenneGapHautSucess = [];
    const moyenneGapBasSucess = [];
    try {
        for (const result of resultSucess) {
            moyenneVariationSucess1.push(result.bougieDataPlus1Variation);
            moyenneVariationSucessResult.push(result.bougieDataPlus2Result.variation);
            moyenneGapHautSucess.push(result.bougieDataPlus2Result.gapHaut);
            moyenneGapBasSucess.push(result.bougieDataPlus2Result.gapBas);
        }
    }
    catch (error) {
        console.log('moyenneVariationSucess error');
    }
    const moyenneVariationFail1 = [];
    const moyenneVariationFailResult = [];
    const moyenneGapHautFail = [];
    const moyenneGapBasFail = [];
    try {
        for (const result of resultFail) {
            moyenneVariationFail1.push(result.bougieDataPlus1Variation);
            moyenneVariationFailResult.push(result.bougieDataPlus2Result.variation);
            moyenneGapHautFail.push(result.bougieDataPlus2Result.gapHaut);
            moyenneGapBasFail.push(result.bougieDataPlus2Result.gapBas);
        }
    }
    catch (_a) {
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
    const minGapBasSucess = moyenneGapBasSucess.sort((a, b) => a - b)[0];
    const minGapBasFail = moyenneGapBasFail.sort((a, b) => a - b)[0];
    const minGapHautSucess = moyenneGapHautSucess.sort((a, b) => a - b)[0];
    const minGapHautFail = moyenneGapHautFail.sort((a, b) => a - b)[0];
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
