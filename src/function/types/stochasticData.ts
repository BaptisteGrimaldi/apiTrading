
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
  
  export interface StochasticData {
    meta: Meta;
    values: Value[];
    status: string;
  }