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
    time_period: number;
  };
}

interface Value {
  datetime: string;
  plus_di: string;
}

export interface dmiDataPlus {
  meta: Meta;
  values: Value[];
  status: string;
}
