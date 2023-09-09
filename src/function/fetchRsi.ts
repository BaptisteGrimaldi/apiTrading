import fetch from 'node-fetch';

export async function fetchRsi(
  symbolStock: string,
  minRsi: number | boolean,
  maxRsi: number | boolean
) {
  return await fetch(
    `https://api.twelvedata.com/rsi?symbol=${symbolStock}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`
  )
    .then((res) => {
      return res.json();
    })
    .then((res: any) => {
      // console.log(`${symbolStock}` + ' avant ' + res.values[0].rsi);

      if (res.values[0].rsi >= minRsi && res.values[0].rsi <= maxRsi) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log('fetch RSI prob');
      return false;
    });
}
