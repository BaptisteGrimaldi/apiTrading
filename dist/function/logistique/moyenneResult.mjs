export function moyenneResult(resultSucess, resultFail) {
    const moyenneVariationSucess1 = [];
    const moyenneVariationSucess2 = [];
    const moyenneGapHautSucess = [];
    const moyenneGapBasSucess = [];
    try {
        for (const result of resultSucess) {
            moyenneVariationSucess1.push(result.bougieDataPlus1Variation);
            moyenneVariationSucess2.push(result.bougieDataPlus2Result.variation);
            moyenneGapHautSucess.push(result.bougieDataPlus2Result.gapHaut);
            moyenneGapBasSucess.push(result.bougieDataPlus2Result.gapBas);
        }
    }
    catch (error) {
        console.log('moyenneVariationSucess error');
    }
    const moyenneVariationFail1 = [];
    const moyenneVariationFail2 = [];
    const moyenneGapHautFail = [];
    const moyenneGapBasFail = [];
    try {
        for (const result of resultFail) {
            moyenneVariationFail1.push(result.bougieDataPlus1Variation);
            moyenneVariationFail2.push(result.bougieDataPlus2Result.variation);
            moyenneGapHautFail.push(result.bougieDataPlus2Result.gapHaut);
            moyenneGapBasFail.push(result.bougieDataPlus2Result.gapBas);
        }
    }
    catch (_a) {
        console.log('moyenneVariationFail error');
    }
    console.log('moyenneVariationSucess', moyenneVariationSucess1.length);
    console.log('moyenneVariationFail', moyenneVariationFail1.length);
    console.log("chance de réussite :" + moyenneVariationSucess1.length / (moyenneVariationSucess1.length + moyenneVariationFail1.length) * 100 + '%');
    const moyenneVariationSucessResult1 = moyenneVariationSucess1.reduce((a, b) => a + b, 0) / moyenneVariationSucess1.length;
    const moyenneVariationSucessResult2 = moyenneVariationSucess2.reduce((a, b) => a + b, 0) / moyenneVariationSucess2.length;
    const moyenneGapHautSucessResult = moyenneGapHautSucess.reduce((a, b) => a + b, 0) / moyenneGapHautSucess.length;
    const moyenneGapBasSucessResult = moyenneGapBasSucess.reduce((a, b) => a + b, 0) / moyenneGapBasSucess.length;
    const moyenneVariationFailResult1 = moyenneVariationFail1.reduce((a, b) => a + b, 0) / moyenneVariationFail1.length;
    const moyenneVariationFailResult2 = moyenneVariationFail2.reduce((a, b) => a + b, 0) / moyenneVariationFail2.length;
    const moyenneGapHautFailResult = moyenneGapHautFail.reduce((a, b) => a + b, 0) / moyenneGapHautFail.length;
    const moyenneGapBasFailResult = moyenneGapBasFail.reduce((a, b) => a + b, 0) / moyenneGapBasFail.length;
    console.log('moyenneVariationSucessResultI+1', moyenneVariationSucessResult1);
    console.log('moyenneVariationSucessResultI+2', moyenneVariationSucessResult2);
    console.log('moyenneGapHautSucessResultI+2', moyenneGapHautSucessResult);
    console.log('moyenneGapBasSucessResultI+2', moyenneGapBasSucessResult);
    console.log('---------------------------------------------------');
    console.log('moyenneVariationFailResultI+1', moyenneVariationFailResult1);
    console.log('moyenneVariationFailResultI+2', moyenneVariationFailResult2);
    console.log('moyenneGapHautFailResultI+2', moyenneGapHautFailResult);
    console.log('moyenneGapBasFailResultI+2', moyenneGapBasFailResult);
}
