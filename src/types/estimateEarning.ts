interface Earnings {
  date: string;
  time: string;
  eps_estimate: number | null;
  eps_actual: number | null;
  difference: number | null;
  surprise_prc: number | null;
}

interface Meta {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  exchange_timezone: string;
}

export interface CompanyData {
  meta: Meta;
  earnings: Earnings[];
  status: string;
}
