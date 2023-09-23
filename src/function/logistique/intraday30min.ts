import { actionValues } from '../../types/actionValues';
import { actionHeure } from '../../types/actionHeure';
import { jourEnCour } from '../../types/jourEnCour';

import { checkDay } from './checkDay';

export function intraday30min(dataResult: actionValues[]) {
  const resultDay: actionValues[][] = [];

  for (const heure of dataResult) {
    const datetime = heure.datetime.split(' ')[0];
    const jour = dataResult.filter((heure) => heure.datetime.split(' ')[0] === datetime);

    if (!resultDay.some((day) => JSON.stringify(day) === JSON.stringify(jour))) {
      resultDay.push(jour);
    }
  }

  const openHeure: jourEnCour[][] = [];

  for (let i = 0; i < resultDay.length; i++) {
    const jourEncour: jourEnCour[] = [];

    resultDay[i].forEach((sequence: actionHeure) => {
      jourEncour.push({
        open: parseFloat(sequence.open),
        heure: sequence.datetime.split(' ')[1],
        day: checkDay(sequence.datetime.split(' ')[0]),
        date: sequence.datetime.split(' ')[0],
      });
    });

    openHeure.push(jourEncour);
  }

  const heureTriGlobal: string[][] = [];

  for (let i = 0; i < openHeure.length; i++) {
    const heureCroissant: string[] = [];

    const day = openHeure[i];
    const triDay = day.sort((a: jourEnCour, b: jourEnCour) => a.open - b.open);
    triDay.forEach((heure: jourEnCour) => {
      heureCroissant.push(heure.heure);
    });
    heureTriGlobal.push(heureCroissant);
  }

  const achatIdeal: string[] = [];

  heureTriGlobal.forEach((jour: string[]) => {
    achatIdeal.push(jour[0]);
  });

  const achatSecondaire: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    achatSecondaire.push(jour[1]);
  });

  const achat3eme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    achat3eme.push(jour[2]);
  });

  const achat4eme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    achat4eme.push(jour[3]);
  });

  const achat5eme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    achat5eme.push(jour[4]);
  });

  const neutre: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    neutre.push(jour[5]);
  });

  const neutre2: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    neutre2.push(jour[6]);
  });

  const neutre3: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    neutre3.push(jour[7]);
  });

  const vente5: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    vente5.push(jour[8]);
  });

  const vente4eme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    vente4eme.push(jour[9]);
  });

  const vente3eme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    vente3eme.push(jour[10]);
  });

  const venteSecondaire: string[] = [];

  heureTriGlobal.forEach((jour: string[]) => {
    venteSecondaire.push(jour[11]);
  });

  const venteIdeal: string[] = [];

  heureTriGlobal.forEach((jour: string[]) => {
    venteIdeal.push(jour[12]);
  });

  const achatIdeal9h30 = achatIdeal.filter((heure) => heure === '09:30:00');
  const achatIdeal10h00 = achatIdeal.filter((heure) => heure === '10:00:00');
  const achatIdeal10h30 = achatIdeal.filter((heure) => heure === '10:30:00');
  const achatIdeal11h00 = achatIdeal.filter((heure) => heure === '11:00:00');
  const achatIdeal11h30 = achatIdeal.filter((heure) => heure === '11:30:00');
  const achatIdeal12h00 = achatIdeal.filter((heure) => heure === '12:00:00');
  const achatIdeal12h30 = achatIdeal.filter((heure) => heure === '12:30:00');
  const achatIdeal13h00 = achatIdeal.filter((heure) => heure === '13:00:00');
  const achatIdeal13h30 = achatIdeal.filter((heure) => heure === '13:30:00');
  const achatIdeal14h00 = achatIdeal.filter((heure) => heure === '14:00:00');
  const achatIdeal14h30 = achatIdeal.filter((heure) => heure === '14:30:00');
  const achatIdeal15h00 = achatIdeal.filter((heure) => heure === '15:00:00');
  const achatIdeal15h30 = achatIdeal.filter((heure) => heure === '15:30:00');

  const triAchatIdeal = [
    {
      '9h30': achatIdeal9h30.length,
      '10h00': achatIdeal10h00.length,
      '10h30': achatIdeal10h30.length,
      '11h00': achatIdeal11h00.length,
      '11h30': achatIdeal11h30.length,
      '12h00': achatIdeal12h00.length,
      '12h30': achatIdeal12h30.length,
      '13h00': achatIdeal13h00.length,
      '13h30': achatIdeal13h30.length,
      '14h00': achatIdeal14h00.length,
      '14h30': achatIdeal14h30.length,
      '15h00': achatIdeal15h00.length,
      '15h30': achatIdeal15h30.length,
    },
  ];

  console.log('----------------------------------------------');
  console.log("Heure de prix d'achat idéal : ", triAchatIdeal);

  const achatSecondaire9h30 = achatSecondaire.filter((heure) => heure === '09:30:00');
  const achatSecondaire10h00 = achatSecondaire.filter((heure) => heure === '10:00:00');
  const achatSecondaire10h30 = achatSecondaire.filter((heure) => heure === '10:30:00');
  const achatSecondaire11h00 = achatSecondaire.filter((heure) => heure === '11:00:00');
  const achatSecondaire11h30 = achatSecondaire.filter((heure) => heure === '11:30:00');
  const achatSecondaire12h00 = achatSecondaire.filter((heure) => heure === '12:00:00');
  const achatSecondaire12h30 = achatSecondaire.filter((heure) => heure === '12:30:00');
  const achatSecondaire13h00 = achatSecondaire.filter((heure) => heure === '13:00:00');
  const achatSecondaire13h30 = achatSecondaire.filter((heure) => heure === '13:30:00');
  const achatSecondaire14h00 = achatSecondaire.filter((heure) => heure === '14:00:00');
  const achatSecondaire14h30 = achatSecondaire.filter((heure) => heure === '14:30:00');
  const achatSecondaire15h00 = achatSecondaire.filter((heure) => heure === '15:00:00');
  const achatSecondaire15h30 = achatSecondaire.filter((heure) => heure === '15:30:00');

  const triAchatSecondaire = [
    {
      '9h30': achatSecondaire9h30.length,
      '10h00': achatSecondaire10h00.length,
      '10h30': achatSecondaire10h30.length,
      '11h00': achatSecondaire11h00.length,
      '11h30': achatSecondaire11h30.length,
      '12h00': achatSecondaire12h00.length,
      '12h30': achatSecondaire12h30.length,
      '13h00': achatSecondaire13h00.length,
      '13h30': achatSecondaire13h30.length,
      '14h00': achatSecondaire14h00.length,
      '14h30': achatSecondaire14h30.length,
      '15h00': achatSecondaire15h00.length,
      '15h30': achatSecondaire15h30.length,
    },
  ];
  console.log("Seconde heure de prix d'achat : ", triAchatSecondaire);

  const achat3eme9h30 = achat3eme.filter((heure) => heure === '09:30:00');
  const achat3eme10h00 = achat3eme.filter((heure) => heure === '10:00:00');
  const achat3eme10h30 = achat3eme.filter((heure) => heure === '10:30:00');
  const achat3eme11h00 = achat3eme.filter((heure) => heure === '11:00:00');
  const achat3eme11h30 = achat3eme.filter((heure) => heure === '11:30:00');
  const achat3eme12h00 = achat3eme.filter((heure) => heure === '12:00:00');
  const achat3eme12h30 = achat3eme.filter((heure) => heure === '12:30:00');
  const achat3eme13h00 = achat3eme.filter((heure) => heure === '13:00:00');
  const achat3eme13h30 = achat3eme.filter((heure) => heure === '13:30:00');
  const achat3eme14h00 = achat3eme.filter((heure) => heure === '14:00:00');
  const achat3eme14h30 = achat3eme.filter((heure) => heure === '14:30:00');
  const achat3eme15h00 = achat3eme.filter((heure) => heure === '15:00:00');
  const achat3eme15h30 = achat3eme.filter((heure) => heure === '15:30:00');

  const triAchat3eme = [
    {
      '9h30': achat3eme9h30.length,
      '10h00': achat3eme10h00.length,
      '10h30': achat3eme10h30.length,
      '11h00': achat3eme11h00.length,
      '11h30': achat3eme11h30.length,
      '12h00': achat3eme12h00.length,
      '12h30': achat3eme12h30.length,
      '13h00': achat3eme13h00.length,
      '13h30': achat3eme13h30.length,
      '14h00': achat3eme14h00.length,
      '14h30': achat3eme14h30.length,
      '15h00': achat3eme15h00.length,
      '15h30': achat3eme15h30.length,
    },
  ];

  console.log("Troisième heure de prix d'achat : ", triAchat3eme);

  const achat4eme9h30 = achat4eme.filter((heure) => heure === '09:30:00');
  const achat4eme10h00 = achat4eme.filter((heure) => heure === '10:00:00');
  const achat4eme10h30 = achat4eme.filter((heure) => heure === '10:30:00');
  const achat4eme11h00 = achat4eme.filter((heure) => heure === '11:00:00');
  const achat4eme11h30 = achat4eme.filter((heure) => heure === '11:30:00');
  const achat4eme12h00 = achat4eme.filter((heure) => heure === '12:00:00');
  const achat4eme12h30 = achat4eme.filter((heure) => heure === '12:30:00');
  const achat4eme13h00 = achat4eme.filter((heure) => heure === '13:00:00');
  const achat4eme13h30 = achat4eme.filter((heure) => heure === '13:30:00');
  const achat4eme14h00 = achat4eme.filter((heure) => heure === '14:00:00');
  const achat4eme14h30 = achat4eme.filter((heure) => heure === '14:30:00');
  const achat4eme15h00 = achat4eme.filter((heure) => heure === '15:00:00');
  const achat4eme15h30 = achat4eme.filter((heure) => heure === '15:30:00');

  const triAchat4eme = [
    {
      '9h30': achat4eme9h30.length,
      '10h00': achat4eme10h00.length,
      '10h30': achat4eme10h30.length,
      '11h00': achat4eme11h00.length,
      '11h30': achat4eme11h30.length,
      '12h00': achat4eme12h00.length,
      '12h30': achat4eme12h30.length,
      '13h00': achat4eme13h00.length,
      '13h30': achat4eme13h30.length,
      '14h00': achat4eme14h00.length,
      '14h30': achat4eme14h30.length,
      '15h00': achat4eme15h00.length,
      '15h30': achat4eme15h30.length,
    },
  ];

  console.log("Quatrième heure de prix d'achat : ", triAchat4eme);

  const achat5eme9h30 = achat5eme.filter((heure) => heure === '09:30:00');
  const achat5eme10h00 = achat5eme.filter((heure) => heure === '10:00:00');
  const achat5eme10h30 = achat5eme.filter((heure) => heure === '10:30:00');
  const achat5eme11h00 = achat5eme.filter((heure) => heure === '11:00:00');
  const achat5eme11h30 = achat5eme.filter((heure) => heure === '11:30:00');
  const achat5eme12h00 = achat5eme.filter((heure) => heure === '12:00:00');
  const achat5eme12h30 = achat5eme.filter((heure) => heure === '12:30:00');
  const achat5eme13h00 = achat5eme.filter((heure) => heure === '13:00:00');
  const achat5eme13h30 = achat5eme.filter((heure) => heure === '13:30:00');
  const achat5eme14h00 = achat5eme.filter((heure) => heure === '14:00:00');
  const achat5eme14h30 = achat5eme.filter((heure) => heure === '14:30:00');
  const achat5eme15h00 = achat5eme.filter((heure) => heure === '15:00:00');
  const achat5eme15h30 = achat5eme.filter((heure) => heure === '15:30:00');

  const triAchat5eme = [
    {
      '9h30': achat5eme9h30.length,
      '10h00': achat5eme10h00.length,
      '10h30': achat5eme10h30.length,
      '11h00': achat5eme11h00.length,
      '11h30': achat5eme11h30.length,
      '12h00': achat5eme12h00.length,
      '12h30': achat5eme12h30.length,
      '13h00': achat5eme13h00.length,
      '13h30': achat5eme13h30.length,
      '14h00': achat5eme14h00.length,
      '14h30': achat5eme14h30.length,
      '15h00': achat5eme15h00.length,
      '15h30': achat5eme15h30.length,
    },
  ];

  console.log("Cinquième heure de prix d'achat : ", triAchat5eme);

  const neutre9h30 = neutre.filter((heure) => heure === '09:30:00');
  const neutre10h00 = neutre.filter((heure) => heure === '10:00:00');
  const neutre10h30 = neutre.filter((heure) => heure === '10:30:00');
  const neutre11h00 = neutre.filter((heure) => heure === '11:00:00');
  const neutre11h30 = neutre.filter((heure) => heure === '11:30:00');
  const neutre12h00 = neutre.filter((heure) => heure === '12:00:00');
  const neutre12h30 = neutre.filter((heure) => heure === '12:30:00');
  const neutre13h00 = neutre.filter((heure) => heure === '13:00:00');
  const neutre13h30 = neutre.filter((heure) => heure === '13:30:00');
  const neutre14h00 = neutre.filter((heure) => heure === '14:00:00');
  const neutre14h30 = neutre.filter((heure) => heure === '14:30:00');
  const neutre15h00 = neutre.filter((heure) => heure === '15:00:00');
  const neutre15h30 = neutre.filter((heure) => heure === '15:30:00');

  const triNeutre = [
    {
      '9h30': neutre9h30.length,
      '10h00': neutre10h00.length,
      '10h30': neutre10h30.length,
      '11h00': neutre11h00.length,
      '11h30': neutre11h30.length,
      '12h00': neutre12h00.length,
      '12h30': neutre12h30.length,
      '13h00': neutre13h00.length,
      '13h30': neutre13h30.length,
      '14h00': neutre14h00.length,
      '14h30': neutre14h30.length,
      '15h00': neutre15h00.length,
      '15h30': neutre15h30.length,
    },
  ];
  console.log('Heure de prix neutre : ', triNeutre);

  const neutre29h30 = neutre2.filter((heure) => heure === '09:30:00');
  const neutre210h00 = neutre2.filter((heure) => heure === '10:00:00');
  const neutre210h30 = neutre2.filter((heure) => heure === '10:30:00');
  const neutre211h00 = neutre2.filter((heure) => heure === '11:00:00');
  const neutre211h30 = neutre2.filter((heure) => heure === '11:30:00');
  const neutre212h00 = neutre2.filter((heure) => heure === '12:00:00');
  const neutre212h30 = neutre2.filter((heure) => heure === '12:30:00');
  const neutre213h00 = neutre2.filter((heure) => heure === '13:00:00');
  const neutre213h30 = neutre2.filter((heure) => heure === '13:30:00');
  const neutre214h00 = neutre2.filter((heure) => heure === '14:00:00');
  const neutre214h30 = neutre2.filter((heure) => heure === '14:30:00');
  const neutre215h00 = neutre2.filter((heure) => heure === '15:00:00');
  const neutre215h30 = neutre2.filter((heure) => heure === '15:30:00');

  const triNeutre2 = [
    {
      '9h30': neutre29h30.length,
      '10h00': neutre210h00.length,
      '10h30': neutre210h30.length,
      '11h00': neutre211h00.length,
      '11h30': neutre211h30.length,
      '12h00': neutre212h00.length,
      '12h30': neutre212h30.length,
      '13h00': neutre213h00.length,
      '13h30': neutre213h30.length,
      '14h00': neutre214h00.length,
      '14h30': neutre214h30.length,
      '15h00': neutre215h00.length,
      '15h30': neutre215h30.length,
    },
  ];

  console.log('Seconde heure de prix neutre : ', triNeutre2);

  const neutre39h30 = neutre3.filter((heure) => heure === '09:30:00');
  const neutre310h00 = neutre3.filter((heure) => heure === '10:00:00');
  const neutre310h30 = neutre3.filter((heure) => heure === '10:30:00');
  const neutre311h00 = neutre3.filter((heure) => heure === '11:00:00');
  const neutre311h30 = neutre3.filter((heure) => heure === '11:30:00');
  const neutre312h00 = neutre3.filter((heure) => heure === '12:00:00');
  const neutre312h30 = neutre3.filter((heure) => heure === '12:30:00');
  const neutre313h00 = neutre3.filter((heure) => heure === '13:00:00');
  const neutre313h30 = neutre3.filter((heure) => heure === '13:30:00');
  const neutre314h00 = neutre3.filter((heure) => heure === '14:00:00');
  const neutre314h30 = neutre3.filter((heure) => heure === '14:30:00');
  const neutre315h00 = neutre3.filter((heure) => heure === '15:00:00');
  const neutre315h30 = neutre3.filter((heure) => heure === '15:30:00');

  const triNeutre3 = [
    {
      '9h30': neutre39h30.length,
      '10h00': neutre310h00.length,
      '10h30': neutre310h30.length,
      '11h00': neutre311h00.length,
      '11h30': neutre311h30.length,
      '12h00': neutre312h00.length,
      '12h30': neutre312h30.length,
      '13h00': neutre313h00.length,
      '13h30': neutre313h30.length,
      '14h00': neutre314h00.length,
      '14h30': neutre314h30.length,
      '15h00': neutre315h00.length,
      '15h30': neutre315h30.length,
    },
  ];

  console.log('Troisième heure de prix neutre : ', triNeutre3);

  const vente5eme9h30 = vente5.filter((heure) => heure === '09:30:00');
  const vente5eme10h00 = vente5.filter((heure) => heure === '10:00:00');
  const vente5eme10h30 = vente5.filter((heure) => heure === '10:30:00');
  const vente5eme11h00 = vente5.filter((heure) => heure === '11:00:00');
  const vente5eme11h30 = vente5.filter((heure) => heure === '11:30:00');
  const vente5eme12h00 = vente5.filter((heure) => heure === '12:00:00');
  const vente5eme12h30 = vente5.filter((heure) => heure === '12:30:00');
  const vente5eme13h00 = vente5.filter((heure) => heure === '13:00:00');
  const vente5eme13h30 = vente5.filter((heure) => heure === '13:30:00');
  const vente5eme14h00 = vente5.filter((heure) => heure === '14:00:00');
  const vente5eme14h30 = vente5.filter((heure) => heure === '14:30:00');
  const vente5eme15h00 = vente5.filter((heure) => heure === '15:00:00');
  const vente5eme15h30 = vente5.filter((heure) => heure === '15:30:00');

  const triVente5eme = [
    {
      '9h30': vente5eme9h30.length,
      '10h00': vente5eme10h00.length,
      '10h30': vente5eme10h30.length,
      '11h00': vente5eme11h00.length,
      '11h30': vente5eme11h30.length,
      '12h00': vente5eme12h00.length,
      '12h30': vente5eme12h30.length,
      '13h00': vente5eme13h00.length,
      '13h30': vente5eme13h30.length,
      '14h00': vente5eme14h00.length,
      '14h30': vente5eme14h30.length,
      '15h00': vente5eme15h00.length,
      '15h30': vente5eme15h30.length,
    },
  ];

  console.log('Cinquième heure de prix de vente : ', triVente5eme);

  const vente4eme9h30 = vente4eme.filter((heure) => heure === '09:30:00');
  const vente4eme10h00 = vente4eme.filter((heure) => heure === '10:00:00');
  const vente4eme10h30 = vente4eme.filter((heure) => heure === '10:30:00');
  const vente4eme11h00 = vente4eme.filter((heure) => heure === '11:00:00');
  const vente4eme11h30 = vente4eme.filter((heure) => heure === '11:30:00');
  const vente4eme12h00 = vente4eme.filter((heure) => heure === '12:00:00');
  const vente4eme12h30 = vente4eme.filter((heure) => heure === '12:30:00');
  const vente4eme13h00 = vente4eme.filter((heure) => heure === '13:00:00');
  const vente4eme13h30 = vente4eme.filter((heure) => heure === '13:30:00');
  const vente4eme14h00 = vente4eme.filter((heure) => heure === '14:00:00');
  const vente4eme14h30 = vente4eme.filter((heure) => heure === '14:30:00');
  const vente4eme15h00 = vente4eme.filter((heure) => heure === '15:00:00');
  const vente4eme15h30 = vente4eme.filter((heure) => heure === '15:30:00');

  const triVente4eme = [
    {
      '9h30': vente4eme9h30.length,
      '10h00': vente4eme10h00.length,
      '10h30': vente4eme10h30.length,
      '11h00': vente4eme11h00.length,
      '11h30': vente4eme11h30.length,
      '12h00': vente4eme12h00.length,
      '12h30': vente4eme12h30.length,
      '13h00': vente4eme13h00.length,
      '13h30': vente4eme13h30.length,
      '14h00': vente4eme14h00.length,
      '14h30': vente4eme14h30.length,
      '15h00': vente4eme15h00.length,
      '15h30': vente4eme15h30.length,
    },
  ];

  console.log('Quatrième heure de prix de vente : ', triVente4eme);

  const vente3eme9h30 = vente3eme.filter((heure) => heure === '09:30:00');
  const vente3eme10h00 = vente3eme.filter((heure) => heure === '10:00:00');
  const vente3eme10h30 = vente3eme.filter((heure) => heure === '10:30:00');
  const vente3eme11h00 = vente3eme.filter((heure) => heure === '11:00:00');
  const vente3eme11h30 = vente3eme.filter((heure) => heure === '11:30:00');
  const vente3eme12h00 = vente3eme.filter((heure) => heure === '12:00:00');
  const vente3eme12h30 = vente3eme.filter((heure) => heure === '12:30:00');
  const vente3eme13h00 = vente3eme.filter((heure) => heure === '13:00:00');
  const vente3eme13h30 = vente3eme.filter((heure) => heure === '13:30:00');
  const vente3eme14h00 = vente3eme.filter((heure) => heure === '14:00:00');
  const vente3eme14h30 = vente3eme.filter((heure) => heure === '14:30:00');
  const vente3eme15h00 = vente3eme.filter((heure) => heure === '15:00:00');
  const vente3eme15h30 = vente3eme.filter((heure) => heure === '15:30:00');

  const triVente3eme = [
    {
      '9h30': vente3eme9h30.length,
      '10h00': vente3eme10h00.length,
      '10h30': vente3eme10h30.length,
      '11h00': vente3eme11h00.length,
      '11h30': vente3eme11h30.length,
      '12h00': vente3eme12h00.length,
      '12h30': vente3eme12h30.length,
      '13h00': vente3eme13h00.length,
      '13h30': vente3eme13h30.length,
      '14h00': vente3eme14h00.length,
      '14h30': vente3eme14h30.length,
      '15h00': vente3eme15h00.length,
      '15h30': vente3eme15h30.length,
    },
  ];

  console.log('Troisième heure de prix de vente : ', triVente3eme);

  const venteSecondaire9h30 = venteSecondaire.filter((heure) => heure === '09:30:00');
  const venteSecondaire10h00 = venteSecondaire.filter((heure) => heure === '10:00:00');
  const venteSecondaire10h30 = venteSecondaire.filter((heure) => heure === '10:30:00');
  const venteSecondaire11h00 = venteSecondaire.filter((heure) => heure === '11:00:00');
  const venteSecondaire11h30 = venteSecondaire.filter((heure) => heure === '11:30:00');
  const venteSecondaire12h00 = venteSecondaire.filter((heure) => heure === '12:00:00');
  const venteSecondaire12h30 = venteSecondaire.filter((heure) => heure === '12:30:00');
  const venteSecondaire13h00 = venteSecondaire.filter((heure) => heure === '13:00:00');
  const venteSecondaire13h30 = venteSecondaire.filter((heure) => heure === '13:30:00');
  const venteSecondaire14h00 = venteSecondaire.filter((heure) => heure === '14:00:00');
  const venteSecondaire14h30 = venteSecondaire.filter((heure) => heure === '14:30:00');
  const venteSecondaire15h00 = venteSecondaire.filter((heure) => heure === '15:00:00');
  const venteSecondaire15h30 = venteSecondaire.filter((heure) => heure === '15:30:00');

  const triVenteSecondaire = [
    {
      '9h30': venteSecondaire9h30.length,
      '10h00': venteSecondaire10h00.length,
      '10h30': venteSecondaire10h30.length,
      '11h00': venteSecondaire11h00.length,
      '11h30': venteSecondaire11h30.length,
      '12h00': venteSecondaire12h00.length,
      '12h30': venteSecondaire12h30.length,
      '13h00': venteSecondaire13h00.length,
      '13h30': venteSecondaire13h30.length,
      '14h00': venteSecondaire14h00.length,
      '14h30': venteSecondaire14h30.length,
      '15h00': venteSecondaire15h00.length,
      '15h30': venteSecondaire15h30.length,
    },
  ];
  console.log('Seconde heure de prix de vente : ', triVenteSecondaire);

  const venteIdeal9h30 = venteIdeal.filter((heure) => heure === '09:30:00');
  const venteIdeal10h00 = venteIdeal.filter((heure) => heure === '10:00:00');
  const venteIdeal10h30 = venteIdeal.filter((heure) => heure === '10:30:00');
  const venteIdeal11h00 = venteIdeal.filter((heure) => heure === '11:00:00');
  const venteIdeal11h30 = venteIdeal.filter((heure) => heure === '11:30:00');
  const venteIdeal12h00 = venteIdeal.filter((heure) => heure === '12:00:00');
  const venteIdeal12h30 = venteIdeal.filter((heure) => heure === '12:30:00');
  const venteIdeal13h00 = venteIdeal.filter((heure) => heure === '13:00:00');
  const venteIdeal13h30 = venteIdeal.filter((heure) => heure === '13:30:00');
  const venteIdeal14h00 = venteIdeal.filter((heure) => heure === '14:00:00');
  const venteIdeal14h30 = venteIdeal.filter((heure) => heure === '14:30:00');
  const venteIdeal15h00 = venteIdeal.filter((heure) => heure === '15:00:00');
  const venteIdeal15h30 = venteIdeal.filter((heure) => heure === '15:30:00');

  const triVenteIdeal = [
    {
      '9h30': venteIdeal9h30.length,
      '10h00': venteIdeal10h00.length,
      '10h30': venteIdeal10h30.length,
      '11h00': venteIdeal11h00.length,
      '11h30': venteIdeal11h30.length,
      '12h00': venteIdeal12h00.length,
      '12h30': venteIdeal12h30.length,
      '13h00': venteIdeal13h00.length,
      '13h30': venteIdeal13h30.length,
      '14h00': venteIdeal14h00.length,
      '14h30': venteIdeal14h30.length,
      '15h00': venteIdeal15h00.length,
      '15h30': venteIdeal15h30.length,
    },
  ];
  console.log('Heure de prix de vente idéal : ', triVenteIdeal);
}
