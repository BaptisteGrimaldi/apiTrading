

export async function fetchRsiDateTime(actionAcheck: string, dateTime: string) {
    try {
      const response = await fetch(
        `https://api.twelvedata.com/rsi?symbol=${actionAcheck}&interval=1day&outputsize=1&format=JSON&end_date=${dateTime}%209:47%20PM&apikey=b914fed0677e48cdaf1938b5be42956d`
      );
  
      if (!response.ok) {
        throw new Error('La requête a échoué avec un statut non OK');
      }
  
      const data = await response.json();
      // Faites quelque chose avec 'data' si nécessaire
      return data.values[0].rsi;
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      throw error; // Vous pouvez choisir de relancer l'erreur ici ou de la gérer différemment
    }
  }

