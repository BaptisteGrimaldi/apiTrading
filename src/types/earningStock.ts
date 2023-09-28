
interface EarningsData {
    date: string;
    time: string;
    eps_estimate: number;
    eps_actual: number;
    difference: number;
    surprise_prc: number;
  }
  
  interface MetaData {
    symbol: string;
    name: string;
    currency: string;
    exchange: string;
    mic_code: string;
    exchange_timezone: string;
  }
  
  export interface earningStock {
    meta: MetaData;
    earnings: EarningsData[];
    status: string;
  }
  