
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
      fast_period: number;
      series_type: string;
      signal_period: number;
      slow_period: number;
    };
  }
  
  interface Value {
    datetime: string;
    macd: string;
    macd_signal: string;
    macd_hist: string;
  }
  
  export interface MACDData {
    meta: Meta;
    values: Value[];
    status: string;
  }