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

export async function checkDateTime(
  bougiePattern: string[],
  res: valueStock
): Promise<boolean> {
  for (let x = 0; x < bougiePattern.length; x++) {
    try {
      if (res.values?.[x]?.datetime) {
        if (x === bougiePattern.length - 1) {
          return true;
        }
      }
    } catch {
      return false;
    }
  }
  console.log("pas normal que ca s'exécute");
  return false;
}
