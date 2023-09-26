import { fetchDataHistoric } from '../../function/fetchStock/fetchHistoric';
import { valueStock } from '../../types/valueStock';
import { bougieData } from '../../types/bougieData';
import { backTestingReturn } from '../../types/backTestingReturn';
import { checkIfPositive } from '../../function/logistique/checkIfPositive';

export async function recupAllData(action: string): Promise<backTestingReturn> {
  try {
    const data: valueStock = await fetchDataHistoric(action);
    const bougiePatternActionEnCour: boolean[] = [];
    const dateTimeBougiePatternActionEnCour: string[] = [];
    const bougieData: bougieData[] = [];

    for (let x = 0; x < data.values.length; x++) {
      try {
        const bougie = checkIfPositive(data.values[x].open, data.values[x].close);
        const dateTime = data.values[x].datetime;

        const openPrice = parseFloat(data.values[x].open);
        const closePrice = parseFloat(data.values[x].close);
        const highPrice = parseFloat(data.values[x].high);
        const lowPrice = parseFloat(data.values[x].low);

        let gapHaut: number;
        let gapBas: number;
        const variation = ((closePrice - openPrice) / openPrice) * 100;

        if (bougie === true) {
          if (highPrice === openPrice) {
            gapHaut = 0;
          } else {
            gapHaut = ((highPrice - closePrice) / closePrice) * 100;
          }

          if (lowPrice === openPrice) {
            gapBas = 0;
          } else {
            gapBas = ((openPrice - lowPrice) / openPrice) * 100;
          }
        } else {
          if (highPrice === closePrice) {
            gapHaut = 0;
          } else {
            gapHaut = ((highPrice - openPrice) / openPrice) * 100;
          }

          if (lowPrice === closePrice) {
            gapBas = 0;
          } else {
            gapBas = ((closePrice - lowPrice) / closePrice) * 100;
          }
        }

        bougieData.push({ variation: variation, gapHaut: gapHaut, gapBas: gapBas });
        bougiePatternActionEnCour.push(bougie);
        dateTimeBougiePatternActionEnCour.push(dateTime);
      } catch {
        console.log("l'index n'éxiste pas");
        break;
      }
    }
    return {
      bougiePatternActionEnCour: bougiePatternActionEnCour.reverse(),
      dateTimeBougiePatternActionEnCour: dateTimeBougiePatternActionEnCour.reverse(),
      bougieData: bougieData.reverse(),
    };
  } catch (error) {
    console.error('backTesting function error');
    throw error;
  }
}
