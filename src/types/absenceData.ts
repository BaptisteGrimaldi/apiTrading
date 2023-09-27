
export interface absenceData {
    code: number;
    message: string;
    status: string;
    meta: {
      symbol: string;
      interval: string;
      exchange: string;
    };
  }