async function prixDepuis(jour: number) {
  const nbJour: number = jour;

  const today = new Date();
  const dayOfWeek = today.getDay();

  switch (dayOfWeek) {
    //Dimanche
    case 0:
      return [-2, -3];
    //lundi
    case 1:
      return [-3, -4];
    //Mardi
    case 2:
      return [-1, -4];
  }

  console.log(dayOfWeek);
}

prixDepuis(2);
