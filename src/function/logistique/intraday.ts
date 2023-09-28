import { actionValues } from '../../types/actionValues';
import { actionHeure } from '../../types/actionHeure';
import { jourEnCour } from '../../types/jourEnCour';

import { checkDay } from './checkDay';

export function intraday(dataResult: actionValues[]) {
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
        volume: parseFloat(sequence.volume),
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
      heureCroissant.push(heure.volume.toString());
    });
    heureTriGlobal.push(heureCroissant);
  }

  const achatIdeal: string[] = [];

  heureTriGlobal.forEach((jour: string[]) => {
    achatIdeal.push(jour[0]);
    achatIdeal.push(jour[1]);
  });

  const achatSecondaire: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    achatSecondaire.push(jour[2]);
    achatSecondaire.push(jour[3]);
  });

  const achatTroisieme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    achatTroisieme.push(jour[4]);
    achatTroisieme.push(jour[5]);
  });

  const neutre: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    neutre.push(jour[6]);
    neutre.push(jour[7]);
  });

  const venteTroisieme: string[] = [];
  heureTriGlobal.forEach((jour: string[]) => {
    venteTroisieme.push(jour[8]);
    venteTroisieme.push(jour[9]);
  });

  const venteSecondaire: string[] = [];

  heureTriGlobal.forEach((jour: string[]) => {
    venteSecondaire.push(jour[10]);
    venteSecondaire.push(jour[11]);
  });

  const venteIdeal: string[] = [];

  heureTriGlobal.forEach((jour: string[]) => {
    venteIdeal.push(jour[12]);
    venteIdeal.push(jour[13]);
  });


  interface heureVolume {
    heure: string;
    volume: string;
  }


  const achatIdealObjet:heureVolume[] = [];
  for (let i = 0; i < achatIdeal.length; i += 2) {
    achatIdealObjet.push({
      heure: achatIdeal[i],
      volume: achatIdeal[i + 1],
    });
  }

  const achatSecondaireObjet:heureVolume[] = [];
  for(let i = 0; i < achatSecondaire.length; i += 2) {
    achatSecondaireObjet.push({
      heure: achatSecondaire[i],
      volume: achatSecondaire[i + 1],
    });
  }

  const achatTroisiemeObjet:heureVolume[] = [];
  for(let i = 0; i < achatTroisieme.length; i += 2) {
    achatTroisiemeObjet.push({
      heure: achatTroisieme[i],
      volume: achatTroisieme[i + 1],
    });
  }

  const neutreObjet:heureVolume[] = [];
  for(let i = 0; i < neutre.length; i += 2) {
    neutreObjet.push({
      heure: neutre[i],
      volume: neutre[i + 1],
    });
  }

  const venteTroisiemeObjet:heureVolume[] = [];
  for(let i = 0; i < venteTroisieme.length; i += 2) {
    venteTroisiemeObjet.push({
      heure: venteTroisieme[i],
      volume: venteTroisieme[i + 1],
    });
  }

  const venteSecondaireObjet:heureVolume[] = [];
  for(let i = 0; i < venteSecondaire.length; i += 2) {
    venteSecondaireObjet.push({
      heure: venteSecondaire[i],
      volume: venteSecondaire[i + 1],
    });
  }

  const venteIdealObjet:heureVolume[] = [];
  for(let i = 0; i < venteIdeal.length; i += 2) {
    venteIdealObjet.push({
      heure: venteIdeal[i],
      volume: venteIdeal[i + 1],
    });
  }
  


  const achatIdealObjet9h30 = achatIdealObjet.filter((heure) => heure.heure === '09:30:00');
  const achatIdealObjet9h30Volume = achatIdealObjet9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet9h30VolumeMedian = achatIdealObjet9h30Volume[Math.floor(achatIdealObjet9h30Volume.length / 2)];

  const achatIdealObjet10h30 = achatIdealObjet.filter((heure) => heure.heure === '10:30:00');
  const achatIdealObjet10h30Volume = achatIdealObjet10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet10h30VolumeMedian = achatIdealObjet10h30Volume[Math.floor(achatIdealObjet10h30Volume.length / 2)];

  const achatIdealObjet11h30 = achatIdealObjet.filter((heure) => heure.heure === '11:30:00');
  const achatIdealObjet11h30Volume = achatIdealObjet11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet11h30VolumeMedian = achatIdealObjet11h30Volume[Math.floor(achatIdealObjet11h30Volume.length / 2)];

  const achatIdealObjet12h30 = achatIdealObjet.filter((heure) => heure.heure === '12:30:00');
  const achatIdealObjet12h30Volume = achatIdealObjet12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet12h30VolumeMedian = achatIdealObjet12h30Volume[Math.floor(achatIdealObjet12h30Volume.length / 2)];

  const achatIdealObjet13h30 = achatIdealObjet.filter((heure) => heure.heure === '13:30:00');
  const achatIdealObjet13h30Volume = achatIdealObjet13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet13h30VolumeMedian = achatIdealObjet13h30Volume[Math.floor(achatIdealObjet13h30Volume.length / 2)];

  const achatIdealObjet14h30 = achatIdealObjet.filter((heure) => heure.heure === '14:30:00');
  const achatIdealObjet14h30Volume = achatIdealObjet14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet14h30VolumeMedian = achatIdealObjet14h30Volume[Math.floor(achatIdealObjet14h30Volume.length / 2)];

  const achatIdealObjet15h30 = achatIdealObjet.filter((heure) => heure.heure === '15:30:00');
  const achatIdealObjet15h30Volume = achatIdealObjet15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatIdealObjet15h30VolumeMedian = achatIdealObjet15h30Volume[Math.floor(achatIdealObjet15h30Volume.length / 2)];


  const triAchatIdeal = [
    {
      '9h30': achatIdealObjet9h30.length,
      '9h30VolumeMedian': achatIdealObjet9h30VolumeMedian,
      '10h30': achatIdealObjet10h30.length,
      '10h30VolumeMedian': achatIdealObjet10h30VolumeMedian,
      '11h30': achatIdealObjet11h30.length,
      '11h30VolumeMedian': achatIdealObjet11h30VolumeMedian,
      '12h30': achatIdealObjet12h30.length,
      '12h30VolumeMedian': achatIdealObjet12h30VolumeMedian,
      '13h30': achatIdealObjet13h30.length,
      '13h30VolumeMedian': achatIdealObjet13h30VolumeMedian,
      '14h30': achatIdealObjet14h30.length,
      '14h30VolumeMedian': achatIdealObjet14h30VolumeMedian,
      '15h30': achatIdealObjet15h30.length,
      '15h30VolumeMedian': achatIdealObjet15h30VolumeMedian,
    },
  ];

  const achatSecondaire9h30 = achatSecondaireObjet.filter((heure) => heure.heure === '09:30:00');
  const achatSecondaire9h30Volume = achatSecondaire9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire9h30VolumeMedian = achatSecondaire9h30Volume[Math.floor(achatSecondaire9h30Volume.length / 2)];
  
  const achatSecondaire10h30 = achatSecondaireObjet.filter((heure) => heure.heure === '10:30:00');
  const achatSecondaire10h30Volume = achatSecondaire10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire10h30VolumeMedian = achatSecondaire10h30Volume[Math.floor(achatSecondaire10h30Volume.length / 2)];
  
  const achatSecondaire11h30 = achatSecondaireObjet.filter((heure) => heure.heure === '11:30:00');
  const achatSecondaire11h30Volume = achatSecondaire11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire11h30VolumeMedian = achatSecondaire11h30Volume[Math.floor(achatSecondaire11h30Volume.length / 2)];
  
  const achatSecondaire12h30 = achatSecondaireObjet.filter((heure) => heure.heure === '12:30:00');
  const achatSecondaire12h30Volume = achatSecondaire12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire12h30VolumeMedian = achatSecondaire12h30Volume[Math.floor(achatSecondaire12h30Volume.length / 2)];
  
  const achatSecondaire13h30 = achatSecondaireObjet.filter((heure) => heure.heure === '13:30:00');
  const achatSecondaire13h30Volume = achatSecondaire13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire13h30VolumeMedian = achatSecondaire13h30Volume[Math.floor(achatSecondaire13h30Volume.length / 2)];
  
  const achatSecondaire14h30 = achatSecondaireObjet.filter((heure) => heure.heure === '14:30:00');
  const achatSecondaire14h30Volume = achatSecondaire14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire14h30VolumeMedian = achatSecondaire14h30Volume[Math.floor(achatSecondaire14h30Volume.length / 2)];
  
  const achatSecondaire15h30 = achatSecondaireObjet.filter((heure) => heure.heure === '15:30:00');
  const achatSecondaire15h30Volume = achatSecondaire15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const achatSecondaire15h30VolumeMedian = achatSecondaire15h30Volume[Math.floor(achatSecondaire15h30Volume.length / 2)];
  
  const triAchatSecondaire = [
    {
      '9h30': achatSecondaire9h30.length,
      '9h30VolumeMedian': achatSecondaire9h30VolumeMedian,
      '10h30': achatSecondaire10h30.length,
      '10h30VolumeMedian': achatSecondaire10h30VolumeMedian,
      '11h30': achatSecondaire11h30.length,
      '11h30VolumeMedian': achatSecondaire11h30VolumeMedian,
      '12h30': achatSecondaire12h30.length,
      '12h30VolumeMedian': achatSecondaire12h30VolumeMedian,
      '13h30': achatSecondaire13h30.length,
      '13h30VolumeMedian': achatSecondaire13h30VolumeMedian,
      '14h30': achatSecondaire14h30.length,
      '14h30VolumeMedian': achatSecondaire14h30VolumeMedian,
      '15h30': achatSecondaire15h30.length,
      '15h30VolumeMedian': achatSecondaire15h30VolumeMedian,
    },
  ];

  const achatTroisieme9h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '09:30:00');
const achatTroisieme9h30Volume = achatTroisieme9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme9h30VolumeMedian = achatTroisieme9h30Volume[Math.floor(achatTroisieme9h30Volume.length / 2)];

const achatTroisieme10h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '10:30:00');
const achatTroisieme10h30Volume = achatTroisieme10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme10h30VolumeMedian = achatTroisieme10h30Volume[Math.floor(achatTroisieme10h30Volume.length / 2)];

const achatTroisieme11h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '11:30:00');
const achatTroisieme11h30Volume = achatTroisieme11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme11h30VolumeMedian = achatTroisieme11h30Volume[Math.floor(achatTroisieme11h30Volume.length / 2)];

const achatTroisieme12h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '12:30:00');
const achatTroisieme12h30Volume = achatTroisieme12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme12h30VolumeMedian = achatTroisieme12h30Volume[Math.floor(achatTroisieme12h30Volume.length / 2)];

const achatTroisieme13h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '13:30:00');
const achatTroisieme13h30Volume = achatTroisieme13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme13h30VolumeMedian = achatTroisieme13h30Volume[Math.floor(achatTroisieme13h30Volume.length / 2)];

const achatTroisieme14h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '14:30:00');
const achatTroisieme14h30Volume = achatTroisieme14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme14h30VolumeMedian = achatTroisieme14h30Volume[Math.floor(achatTroisieme14h30Volume.length / 2)];

const achatTroisieme15h30 = achatTroisiemeObjet.filter((heure) => heure.heure === '15:30:00');
const achatTroisieme15h30Volume = achatTroisieme15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const achatTroisieme15h30VolumeMedian = achatTroisieme15h30Volume[Math.floor(achatTroisieme15h30Volume.length / 2)];

const triAchatTroisieme = [
  {
    '9h30': achatTroisieme9h30.length,
    '9h30VolumeMedian': achatTroisieme9h30VolumeMedian,
    '10h30': achatTroisieme10h30.length,
    '10h30VolumeMedian': achatTroisieme10h30VolumeMedian,
    '11h30': achatTroisieme11h30.length,
    '11h30VolumeMedian': achatTroisieme11h30VolumeMedian,
    '12h30': achatTroisieme12h30.length,
    '12h30VolumeMedian': achatTroisieme12h30VolumeMedian,
    '13h30': achatTroisieme13h30.length,
    '13h30VolumeMedian': achatTroisieme13h30VolumeMedian,
    '14h30': achatTroisieme14h30.length,
    '14h30VolumeMedian': achatTroisieme14h30VolumeMedian,
    '15h30': achatTroisieme15h30.length,
    '15h30VolumeMedian': achatTroisieme15h30VolumeMedian,
  },
];

  const neutre9h30 = neutreObjet.filter((heure) => heure.heure === '09:30:00');
  const neutre9h30Volume = neutre9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre9h30VolumeMedian = neutre9h30Volume[Math.floor(neutre9h30Volume.length / 2)];
  
  const neutre10h30 = neutreObjet.filter((heure) => heure.heure === '10:30:00');
  const neutre10h30Volume = neutre10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre10h30VolumeMedian = neutre10h30Volume[Math.floor(neutre10h30Volume.length / 2)];
  
  const neutre11h30 = neutreObjet.filter((heure) => heure.heure === '11:30:00');
  const neutre11h30Volume = neutre11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre11h30VolumeMedian = neutre11h30Volume[Math.floor(neutre11h30Volume.length / 2)];
  
  const neutre12h30 = neutreObjet.filter((heure) => heure.heure === '12:30:00');
  const neutre12h30Volume = neutre12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre12h30VolumeMedian = neutre12h30Volume[Math.floor(neutre12h30Volume.length / 2)];
  
  const neutre13h30 = neutreObjet.filter((heure) => heure.heure === '13:30:00');
  const neutre13h30Volume = neutre13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre13h30VolumeMedian = neutre13h30Volume[Math.floor(neutre13h30Volume.length / 2)];
  
  const neutre14h30 = neutreObjet.filter((heure) => heure.heure === '14:30:00');
  const neutre14h30Volume = neutre14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre14h30VolumeMedian = neutre14h30Volume[Math.floor(neutre14h30Volume.length / 2)];
  
  const neutre15h30 = neutreObjet.filter((heure) => heure.heure === '15:30:00');
  const neutre15h30Volume = neutre15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const neutre15h30VolumeMedian = neutre15h30Volume[Math.floor(neutre15h30Volume.length / 2)];
  
  const triNeutre = [
    {
      '9h30': neutre9h30.length,
      '9h30VolumeMedian': neutre9h30VolumeMedian,
      '10h30': neutre10h30.length,
      '10h30VolumeMedian': neutre10h30VolumeMedian,
      '11h30': neutre11h30.length,
      '11h30VolumeMedian': neutre11h30VolumeMedian,
      '12h30': neutre12h30.length,
      '12h30VolumeMedian': neutre12h30VolumeMedian,
      '13h30': neutre13h30.length,
      '13h30VolumeMedian': neutre13h30VolumeMedian,
      '14h30': neutre14h30.length,
      '14h30VolumeMedian': neutre14h30VolumeMedian,
      '15h30': neutre15h30.length,
      '15h30VolumeMedian': neutre15h30VolumeMedian,
    },
  ];

  const venteTroisieme9h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '09:30:00');
const venteTroisieme9h30Volume = venteTroisieme9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme9h30VolumeMedian = venteTroisieme9h30Volume[Math.floor(venteTroisieme9h30Volume.length / 2)];

const venteTroisieme10h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '10:30:00');
const venteTroisieme10h30Volume = venteTroisieme10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme10h30VolumeMedian = venteTroisieme10h30Volume[Math.floor(venteTroisieme10h30Volume.length / 2)];

const venteTroisieme11h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '11:30:00');
const venteTroisieme11h30Volume = venteTroisieme11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme11h30VolumeMedian = venteTroisieme11h30Volume[Math.floor(venteTroisieme11h30Volume.length / 2)];

const venteTroisieme12h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '12:30:00');
const venteTroisieme12h30Volume = venteTroisieme12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme12h30VolumeMedian = venteTroisieme12h30Volume[Math.floor(venteTroisieme12h30Volume.length / 2)];

const venteTroisieme13h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '13:30:00');
const venteTroisieme13h30Volume = venteTroisieme13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme13h30VolumeMedian = venteTroisieme13h30Volume[Math.floor(venteTroisieme13h30Volume.length / 2)];

const venteTroisieme14h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '14:30:00');
const venteTroisieme14h30Volume = venteTroisieme14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme14h30VolumeMedian = venteTroisieme14h30Volume[Math.floor(venteTroisieme14h30Volume.length / 2)];

const venteTroisieme15h30 = venteTroisiemeObjet.filter((heure) => heure.heure === '15:30:00');
const venteTroisieme15h30Volume = venteTroisieme15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
const venteTroisieme15h30VolumeMedian = venteTroisieme15h30Volume[Math.floor(venteTroisieme15h30Volume.length / 2)];

const triVenteTroisieme = [
  {
    '9h30': venteTroisieme9h30.length,
    '9h30VolumeMedian': venteTroisieme9h30VolumeMedian,
    '10h30': venteTroisieme10h30.length,
    '10h30VolumeMedian': venteTroisieme10h30VolumeMedian,
    '11h30': venteTroisieme11h30.length,
    '11h30VolumeMedian': venteTroisieme11h30VolumeMedian,
    '12h30': venteTroisieme12h30.length,
    '12h30VolumeMedian': venteTroisieme12h30VolumeMedian,
    '13h30': venteTroisieme13h30.length,
    '13h30VolumeMedian': venteTroisieme13h30VolumeMedian,
    '14h30': venteTroisieme14h30.length,
    '14h30VolumeMedian': venteTroisieme14h30VolumeMedian,
    '15h30': venteTroisieme15h30.length,
    '15h30VolumeMedian': venteTroisieme15h30VolumeMedian,
  },
];


  const venteSecondaire9h30 = venteSecondaireObjet.filter((heure) => heure.heure === '09:30:00');
  const venteSecondaire9h30Volume = venteSecondaire9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire9h30VolumeMedian = venteSecondaire9h30Volume[Math.floor(venteSecondaire9h30Volume.length / 2)];
  
  const venteSecondaire10h30 = venteSecondaireObjet.filter((heure) => heure.heure === '10:30:00');
  const venteSecondaire10h30Volume = venteSecondaire10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire10h30VolumeMedian = venteSecondaire10h30Volume[Math.floor(venteSecondaire10h30Volume.length / 2)];
  
  const venteSecondaire11h30 = venteSecondaireObjet.filter((heure) => heure.heure === '11:30:00');
  const venteSecondaire11h30Volume = venteSecondaire11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire11h30VolumeMedian = venteSecondaire11h30Volume[Math.floor(venteSecondaire11h30Volume.length / 2)];
  
  const venteSecondaire12h30 = venteSecondaireObjet.filter((heure) => heure.heure === '12:30:00');
  const venteSecondaire12h30Volume = venteSecondaire12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire12h30VolumeMedian = venteSecondaire12h30Volume[Math.floor(venteSecondaire12h30Volume.length / 2)];
  
  const venteSecondaire13h30 = venteSecondaireObjet.filter((heure) => heure.heure === '13:30:00');
  const venteSecondaire13h30Volume = venteSecondaire13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire13h30VolumeMedian = venteSecondaire13h30Volume[Math.floor(venteSecondaire13h30Volume.length / 2)];
  
  const venteSecondaire14h30 = venteSecondaireObjet.filter((heure) => heure.heure === '14:30:00');
  const venteSecondaire14h30Volume = venteSecondaire14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire14h30VolumeMedian = venteSecondaire14h30Volume[Math.floor(venteSecondaire14h30Volume.length / 2)];
  
  const venteSecondaire15h30 = venteSecondaireObjet.filter((heure) => heure.heure === '15:30:00');
  const venteSecondaire15h30Volume = venteSecondaire15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteSecondaire15h30VolumeMedian = venteSecondaire15h30Volume[Math.floor(venteSecondaire15h30Volume.length / 2)];
  
  const triVenteSecondaire = [
    {
      '9h30': venteSecondaire9h30.length,
      '9h30VolumeMedian': venteSecondaire9h30VolumeMedian,
      '10h30': venteSecondaire10h30.length,
      '10h30VolumeMedian': venteSecondaire10h30VolumeMedian,
      '11h30': venteSecondaire11h30.length,
      '11h30VolumeMedian': venteSecondaire11h30VolumeMedian,
      '12h30': venteSecondaire12h30.length,
      '12h30VolumeMedian': venteSecondaire12h30VolumeMedian,
      '13h30': venteSecondaire13h30.length,
      '13h30VolumeMedian': venteSecondaire13h30VolumeMedian,
      '14h30': venteSecondaire14h30.length,
      '14h30VolumeMedian': venteSecondaire14h30VolumeMedian,
      '15h30': venteSecondaire15h30.length,
      '15h30VolumeMedian': venteSecondaire15h30VolumeMedian,
    },
  ];
  

  const venteIdeal9h30 = venteIdealObjet.filter((heure) => heure.heure === '09:30:00');
  const venteIdeal9h30Volume = venteIdeal9h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal9h30VolumeMedian = venteIdeal9h30Volume[Math.floor(venteIdeal9h30Volume.length / 2)];
  
  const venteIdeal10h30 = venteIdealObjet.filter((heure) => heure.heure === '10:30:00');
  const venteIdeal10h30Volume = venteIdeal10h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal10h30VolumeMedian = venteIdeal10h30Volume[Math.floor(venteIdeal10h30Volume.length / 2)];
  
  const venteIdeal11h30 = venteIdealObjet.filter((heure) => heure.heure === '11:30:00');
  const venteIdeal11h30Volume = venteIdeal11h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal11h30VolumeMedian = venteIdeal11h30Volume[Math.floor(venteIdeal11h30Volume.length / 2)];
  
  const venteIdeal12h30 = venteIdealObjet.filter((heure) => heure.heure === '12:30:00');
  const venteIdeal12h30Volume = venteIdeal12h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal12h30VolumeMedian = venteIdeal12h30Volume[Math.floor(venteIdeal12h30Volume.length / 2)];
  
  const venteIdeal13h30 = venteIdealObjet.filter((heure) => heure.heure === '13:30:00');
  const venteIdeal13h30Volume = venteIdeal13h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal13h30VolumeMedian = venteIdeal13h30Volume[Math.floor(venteIdeal13h30Volume.length / 2)];
  
  const venteIdeal14h30 = venteIdealObjet.filter((heure) => heure.heure === '14:30:00');
  const venteIdeal14h30Volume = venteIdeal14h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal14h30VolumeMedian = venteIdeal14h30Volume[Math.floor(venteIdeal14h30Volume.length / 2)];
  
  const venteIdeal15h30 = venteIdealObjet.filter((heure) => heure.heure === '15:30:00');
  const venteIdeal15h30Volume = venteIdeal15h30.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
  const venteIdeal15h30VolumeMedian = venteIdeal15h30Volume[Math.floor(venteIdeal15h30Volume.length / 2)];
  
  const triVenteIdeal = [
    {
      '9h30': venteIdeal9h30.length,
      '9h30VolumeMedian': venteIdeal9h30VolumeMedian,
      '10h30': venteIdeal10h30.length,
      '10h30VolumeMedian': venteIdeal10h30VolumeMedian,
      '11h30': venteIdeal11h30.length,
      '11h30VolumeMedian': venteIdeal11h30VolumeMedian,
      '12h30': venteIdeal12h30.length,
      '12h30VolumeMedian': venteIdeal12h30VolumeMedian,
      '13h30': venteIdeal13h30.length,
      '13h30VolumeMedian': venteIdeal13h30VolumeMedian,
      '14h30': venteIdeal14h30.length,
      '14h30VolumeMedian': venteIdeal14h30VolumeMedian,
      '15h30': venteIdeal15h30.length,
      '15h30VolumeMedian': venteIdeal15h30VolumeMedian,
    },
  ];
  

  return {
    triAchatIdeal,
    // triAchatSecondaire,
    // triAchatTroisieme,
    // triNeutre,
    // triVenteTroisieme,
    // triVenteSecondaire,
    triVenteIdeal
  };
  
}
