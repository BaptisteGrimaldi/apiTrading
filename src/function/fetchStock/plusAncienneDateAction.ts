import { DateTimeInfo } from '../types/dateTimeAncienne';
import fetch from 'node-fetch';

export async function plusAncienneDateAction(action: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api.twelvedata.com/earliest_timestamp?symbol=${action}&interval=1day&apikey=b914fed0677e48cdaf1938b5be42956d`
      );
  
      if (!response.ok) {
        console.error("La requête a échoué avec un statut HTTP non OK:", response.status);
        throw new Error("La requête a échoué avec un statut HTTP non OK");
      }
  
      const data = await response.json() as DateTimeInfo;
  
      if (!data || !data.datetime) {
        console.error("Données JSON invalides ou manquantes dans la réponse.");
        throw new Error("Données JSON invalides ou manquantes dans la réponse.");
      }
  
      return data.datetime;
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération de la datetime la plus ancienne:", error);
      return 'error'; // Ou renvoyez une autre valeur explicite pour indiquer une erreur
    }
  }
  
