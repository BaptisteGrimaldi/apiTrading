
export function ajouterUnJour(dateStr:string) {

    const date = new Date(dateStr);
  
    date.setDate(date.getDate() + 1);
  
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0'); 
    const jour = String(date.getDate()).padStart(2, '0');
  
    const nouvelleDateStr = `${annee}-${mois}-${jour}`;
  
    return nouvelleDateStr;
  }
  
  // const dateInitiale = "2023-09-25";
  // const nouvelleDate = ajouterUnJour(dateInitiale);
  
  // console.log(nouvelleDate);
  