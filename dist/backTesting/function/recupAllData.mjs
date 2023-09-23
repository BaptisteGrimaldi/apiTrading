var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import {fetchDataHistoric } from '../../function/fetchStock/fetchHistoric.mjs';;
import {checkIfPositive } from '../../function/logistique/checkIfPositive.mjs';;
export function backTesting(action) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchDataHistoric(action);
            const bougiePatternActionEnCour = [];
            const dateTimeBougiePatternActionEnCour = [];
            const bougieData = [];
            for (let x = 0; x < data.values.length; x++) {
                try {
                    const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
                    const dateTime = data.values[x].datetime;
                    const openPrice = parseFloat(data.values[x].open);
                    const closePrice = parseFloat(data.values[x].close);
                    const highPrice = parseFloat(data.values[x].high);
                    const lowPrice = parseFloat(data.values[x].low);
                    let gapHaut;
                    let gapBas;
                    const variation = ((closePrice - openPrice) / openPrice) * 100;
                    if (bougie === true) {
                        if (highPrice === openPrice) {
                            gapHaut = 0;
                        }
                        else {
                            gapHaut = ((highPrice - closePrice) / closePrice) * 100;
                        }
                        if (lowPrice === openPrice) {
                            gapBas = 0;
                        }
                        else {
                            gapBas = ((openPrice - lowPrice) / openPrice) * 100;
                        }
                    }
                    else {
                        if (highPrice === closePrice) {
                            gapHaut = 0;
                        }
                        else {
                            gapHaut = ((highPrice - openPrice) / openPrice) * 100;
                        }
                        if (lowPrice === closePrice) {
                            gapBas = 0;
                        }
                        else {
                            gapBas = ((closePrice - lowPrice) / closePrice) * 100;
                        }
                    }
                    bougieData.push({ variation: variation, gapHaut: gapHaut, gapBas: gapBas });
                    bougiePatternActionEnCour.push(bougie);
                    dateTimeBougiePatternActionEnCour.push(dateTime);
                }
                catch (_a) {
                    console.log("l'index n'éxiste pas");
                    break;
                }
            }
            return {
                bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
                dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour.reverse(),
                bougieData: bougieData.reverse(),
            };
        }
        catch (error) {
            console.error('backTesting function error');
            throw error;
        }
    });
}
