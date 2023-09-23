import fetch from 'node-fetch';
import { RsiData } from '../../../types/rsiData';

export async function fetchRsiDateTime(actionAcheck: string, dateTime: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/rsi?symbol=${actionAcheck}&interval=1day&outputsize=1&format=JSON&end_date=${dateTime}%209:47%20PM&apikey=b914fed0677e48cdaf1938b5be42956d`
    );

    if (!response.ok) {
      throw new Error('La requête a échoué avec un statut non OK');
    }
    const data = (await response.json()) as RsiData;
    return data.values[0].rsi;
  } catch (error) {
    console.log(`l ' ${actionAcheck} à ${dateTime} n'a pas pu être récupéré`);
    return 'error';
  }
}
