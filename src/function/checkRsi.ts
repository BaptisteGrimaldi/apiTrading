import fetch from 'node-fetch';


//C'est le border c'est à fixer ne pas utiliser

export async function fetchRsi(symbolAction: string, minRsi: number) {

    // console.log(symbolAction,minRsi)

    let urlFetch = `https://api.twelvedata.com/rsi?symbol=${symbolAction}&interval=1day&time_period=34&apikey=b914fed0677e48cdaf1938b5be42956d`



  await fetch(
    urlFetch
  )
    .then((res) => {
        console.log(urlFetch);
      return res.json();
    })
    .catch(() => {
      console.log('RSI non trouvé', symbolAction);
    });
}
