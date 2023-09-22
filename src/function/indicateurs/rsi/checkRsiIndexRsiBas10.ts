import fetch from 'node-fetch';

import { RsiData } from '../../types/rsiData';

export async function checkRsiIndexRsiBas10(listeActionPattern: string[], bougiePattern: string[]): Promise<string[]> {
  const actionRsiPatternOk: string[] = [];
  const promises = [];

  for (const action of listeActionPattern) {
    const promise = await fetch(`https://api.twelvedata.com/rsi?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
      .then((res) => res.json() as Promise<RsiData>)
      .then((res: RsiData) => {
        const tableauPatternRsi: boolean[] = [];

        for (let i = 0; i < bougiePattern.length; i++) {
          if (bougiePattern[i] === '1') {
            if (parseFloat(res.values[i].rsi) >= 33) {
              tableauPatternRsi.push(true);
            } else {
              tableauPatternRsi.push(false);
            }
          }
          if (bougiePattern[i] === '0') {
            if (parseFloat(res.values[i].rsi) <= 30) {
              tableauPatternRsi.push(true);
            } else {
              tableauPatternRsi.push(false);
            }
          }
        }

        if (tableauPatternRsi[0] && tableauPatternRsi[tableauPatternRsi.length - 1]) {
          actionRsiPatternOk.push(action);
        }
      });
    promises.push(promise);
  }

  await Promise.all(promises);

  return actionRsiPatternOk;
}

// checkRsiIndex(['AAPL', 'MSFT', 'TSLA'], ['1', '0'])
