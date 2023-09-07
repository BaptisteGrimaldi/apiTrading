interface Meta {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
    indicator: {
      name: string;
      fast_k_period: number;
      slow_d_period: number;
      slow_dma_type: string;
      slow_k_period: number;
      slow_kma_type: string;
    };
  }
  
  interface Value {
    datetime: string;
    slow_k: string;
    slow_d: string;
  }
  
  interface StochasticData {
    meta: Meta;
    values: Value[];
    status: string;
  }
  

export async function fetchStockastique(
    symbol: string,
    nbJour: number
  ): Promise<StochasticData> {
    try {
      const response: any = await fetch(
        `https://api.twelvedata.com/stoch?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=${nbJour}&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`
      );
      return response.json();
    } catch (error) {
      console.error("L'index de l'action n'existe pas");
      throw error;
    }
  }

//   fetchStockastique('IRON', 1).then((res) => {
//     console.log('res', res);
//   });