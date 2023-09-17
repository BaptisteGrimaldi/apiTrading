import fetch from 'node-fetch';

interface listStock {
  data: any[];
}

export async function fetchStocksList(exchange: string): Promise<listStock> {
  try {
    const response: any = await fetch(`https://api.twelvedata.com/stocks?exchange=${exchange.toUpperCase()}`);
    return response.json();
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    throw error;
  }
}
