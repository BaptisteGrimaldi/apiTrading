

import { fetchStocks } from "./fetchStocks";

//types
import { valueStock } from "../../types/valueStock";
import { actionValues } from "../../types/actionValues";

export async function moyenneVolumeJourAction(listeActions: string[],outputsizeJour:number) {
    let actionVolumeVerifTrue: string[] = [];
  for(let action of listeActions){
      await fetchStocks(action,outputsizeJour)
      .then((res:valueStock) => {

        const sommeVolumeAction = res.values.reduce((total, action:actionValues) => {
          const volumeAction = parseFloat(action.volume);
          return total + volumeAction;
        }, 0);
      
        const moyenneSommeActionVolume =  sommeVolumeAction / res.values.length;
      
        if(moyenneSommeActionVolume > 100000){
          actionVolumeVerifTrue.push(action);
        }else {
          // Rien
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite dans la moyenneVolume", error);
        throw error;
      });
    }

    return actionVolumeVerifTrue;
  }