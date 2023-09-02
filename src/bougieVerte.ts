import fetch from 'node-fetch';
import { checkIfPositive } from './function/checkIfPositive';

interface listStock {
  data: any[];
}

async function fetchStocksList(): Promise<listStock> {
  try {
    const response = await fetch(
      'https://api.twelvedata.com/stocks?exchange=NASDAQ'
    );
    return response.json();
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    throw error;
  }
}

interface valueStock {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: Array<{
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }>;
  status: string;
}

async function fetchStocks(symbol: string): Promise<valueStock> {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=2&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
    );
    return response.json();
  } catch (error) {
    console.error("L'index de l'action n'existe pas");
    throw error;
  }
}

const nasdaqStock: Promise<any[]> = fetchStocksList().then((res) => {
  return res.data;
})

const nasdaqStockLength: Promise<number> = fetchStocksList().then((res) => {
  // console.log(res.data.length)
  return res.data.length;
});

// console.log(nasdaqStockLength)

Promise.all([nasdaqStock, nasdaqStockLength])
  .then(([stockData, stockDataLength]) => {
    let action2joursPositifs: string[] = [];
    let fetchPromises = [];

    // let nombreCycleIteration = Math.ceil(stockDataLength/600)
    // console.log(nombreCycleIteration);

    // let numIndexAction = 0;
    // let numIteration = 1;

    // for( let j = 0; j <nombreCycleIteration; j++){
    //   console.log(j);
    // }

    // try{
    //   fetchStocks(stockData[6000].symbol).then((res)=>{
    //     console.log(res.meta.symbol)
    //   })
    // }catch{
    //   console.log("catch ereur")
    // }


    for (let i = 0; i < 600; i++) {
      const fetchPromise = fetchStocks(stockData[i].symbol)
        .then((res) => {
          if (res.values?.[0]?.datetime && res.values?.[1].datetime) {
            const day1 = checkIfPositive(
              res.values[0].open,
              res.values[0].close
            );

            const day2 = checkIfPositive(
              res.values[1].open,
              res.values[1].close
            );

            if (day1 === true && day2 === true) {
              action2joursPositifs.push(stockData[i].symbol);
            }
          } else {
            console.error(
              'Les données ne sont pas définies ou ne contiennent pas de datetime.'
            );
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la requête fetch :', error);
        });

      fetchPromises.push(fetchPromise);
    }

    Promise.all(fetchPromises)
      .then(() => {
        console.log('action2joursPositifs', action2joursPositifs);
      })
      .catch((error) => {
        console.error("Erreur lors de l'exécution des promesses :", error);
      });
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });
