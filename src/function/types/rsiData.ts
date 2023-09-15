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
      series_type: string;
      time_period: number;
    };
  }
  
  interface Value {
    datetime: string;
    rsi: string;
  }
  
  export interface RsiData {
    meta: Meta;
    values: Value[];
    status: string;
  }