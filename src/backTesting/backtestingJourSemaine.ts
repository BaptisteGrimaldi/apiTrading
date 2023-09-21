import { valueStock } from '../function/types/valueStock';

import { fetchDataHistoric } from '../function/fetchStock/fetchHistoric';
import { checkIfPositive } from '../function/logistique/checkIfPositive';
import { checkDay } from '../function/logistique/checkDay';

interface dataJour {
  action: string;
  dateTime: string;
  variation: number;
  gapHaut: number;
  gapBas: number;
}

const action = 'SAIC';

backTestingJourSemaine(action);

async function backTestingJourSemaine(action: string) {
  const data: valueStock = await fetchDataHistoric(action);

  const mondayTrue: dataJour[] = [];
  const mondayFalse: dataJour[] = [];

  const tuesdayTrue: dataJour[] = [];
  const tuesdayFalse: dataJour[] = [];

  const wednesdayTrue: dataJour[] = [];
  const wednesdayFalse: dataJour[] = [];

  const thursdayTrue: dataJour[] = [];
  const thursdayFalse: dataJour[] = [];

  const fridayTrue: dataJour[] = [];
  const fridayFalse: dataJour[] = [];

  for (let i = 0; i < data.values.length; i++) {
    const dateTime = data.values[i].datetime;
    const bougie = checkIfPositive(data.values[i].open, data.values[i].close);

    const openPrice = parseFloat(data.values[i].open);
    const closePrice = parseFloat(data.values[i].close);
    const highPrice = parseFloat(data.values[i].high);
    const lowPrice = parseFloat(data.values[i].low);

    let gapHaut: number;
    let gapBas: number;
    const variation = ((closePrice - openPrice) / openPrice) * 100;

    if (bougie === true) {
      if (highPrice === openPrice) {
        gapHaut = 0;
      } else {
        gapHaut = ((highPrice - closePrice) / closePrice) * 100;
      }

      if (lowPrice === openPrice) {
        gapBas = 0;
      } else {
        gapBas = ((openPrice - lowPrice) / openPrice) * 100;
      }
    } else {
      if (highPrice === closePrice) {
        gapHaut = 0;
      } else {
        gapHaut = ((highPrice - openPrice) / openPrice) * 100;
      }

      if (lowPrice === closePrice) {
        gapBas = 0;
      } else {
        gapBas = ((closePrice - lowPrice) / closePrice) * 100;
      }
    }

    const day = checkDay(dateTime);

    if (day === 'monday') {
      if (bougie === true) {
        mondayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
      } else {
        mondayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
      }
    } else if (day === 'tuesday') {
      if (bougie === true) {
        tuesdayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
      } else {
        tuesdayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
      }
    } else if (day === 'wednesday') {
      if (bougie === true) {
        wednesdayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
      } else {
        wednesdayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
      }
    } else if (day === 'thursday') {
      if (bougie === true) {
        thursdayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
      } else {
        thursdayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
      }
    } else if (day === 'friday') {
      if (bougie === true) {
        fridayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
      } else {
        fridayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
      }
    }
  }

  // console.log('mondayTrue', mondayTrue);
  //   console.log('mondayFalse', mondayFalse);

  //   console.log('tuesdayTrue', tuesdayTrue);
  //   console.log('tuesdayFalse', tuesdayFalse);

  //   console.log('wednesdayTrue', wednesdayTrue);
  //   console.log('wednesdayFalse', wednesdayFalse);

  //   console.log('thursdayTrue', thursdayTrue);
  //   console.log('thursdayFalse', thursdayFalse);

  //   console.log('fridayTrue', fridayTrue);
  //   console.log('fridayFalse', fridayFalse);

  console.log('------------------------------------------------------------------------------------------------------------------');

  console.log('Moyenne True Lundi ' + ((mondayTrue.length / (mondayTrue.length + mondayFalse.length)) * 100).toFixed(2) + ' %');

  console.log('Moyenne variation True Lundi ' + (mondayTrue.reduce((acc, current) => acc + current.variation, 0) / mondayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut True Lundi ' + (mondayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / mondayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas True Lundi ' + (mondayTrue.reduce((acc, current) => acc + current.gapBas, 0) / mondayTrue.length).toFixed(2) + ' %');

  console.log('Moyenne variation False Lundi ' + (mondayFalse.reduce((acc, current) => acc + current.variation, 0) / mondayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut False Lundi ' + (mondayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / mondayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas False Lundi ' + (mondayFalse.reduce((acc, current) => acc + current.gapBas, 0) / mondayFalse.length).toFixed(2) + ' %');
  console.log('------------------------------------------------------------------------------------------------------------------');

  console.log('Moyenne True  Mardi ' + ((tuesdayTrue.length / (tuesdayTrue.length + tuesdayFalse.length)) * 100).toFixed(2) + ' %');

  console.log('Moyenne variation True Mardi ' + (thursdayTrue.reduce((acc, current) => acc + current.variation, 0) / thursdayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut True Mardi ' + (thursdayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas True Mardi ' + (thursdayTrue.reduce((acc, current) => acc + current.gapBas, 0) / thursdayTrue.length).toFixed(2) + ' %');

  console.log('Moyenne variation False Mardi ' + (thursdayFalse.reduce((acc, current) => acc + current.variation, 0) / thursdayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut False Mardi ' + (thursdayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas False Mardi ' + (thursdayFalse.reduce((acc, current) => acc + current.gapBas, 0) / thursdayFalse.length).toFixed(2) + ' %');
  console.log('------------------------------------------------------------------------------------------------------------------');

  console.log('Moyenne True  Mercredis ' + ((wednesdayTrue.length / (wednesdayTrue.length + wednesdayFalse.length)) * 100).toFixed(2) + ' %');

  console.log('Moyenne variation True Mercredis ' + (wednesdayTrue.reduce((acc, current) => acc + current.variation, 0) / wednesdayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut True Mercredis ' + (wednesdayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / wednesdayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas True Mercredis ' + (wednesdayTrue.reduce((acc, current) => acc + current.gapBas, 0) / wednesdayTrue.length).toFixed(2) + ' %');

  console.log('Moyenne variation False Mercedis ' + (wednesdayFalse.reduce((acc, current) => acc + current.variation, 0) / wednesdayFalse.length).toFixed(2) + ' %');

  console.log('Moyenne gapHaut False Mercedis ' + (wednesdayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / wednesdayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas False Mercedis ' + (wednesdayFalse.reduce((acc, current) => acc + current.gapBas, 0) / wednesdayFalse.length).toFixed(2) + ' %');
  console.log('------------------------------------------------------------------------------------------------------------------');

  console.log('Moyenne True  Jeudi ' + ((thursdayTrue.length / (thursdayTrue.length + thursdayFalse.length)) * 100).toFixed(2) + ' %');

  console.log('Moyenne variation True Jeudi ' + (thursdayTrue.reduce((acc, current) => acc + current.variation, 0) / thursdayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut True Jeudi ' + (thursdayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas True Jeudi ' + (thursdayTrue.reduce((acc, current) => acc + current.gapBas, 0) / thursdayTrue.length).toFixed(2) + ' %');

  console.log('Moyenne variation False Jeudi ' + (thursdayFalse.reduce((acc, current) => acc + current.variation, 0) / thursdayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut False Jeudi ' + (thursdayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas False Jeudi ' + (thursdayFalse.reduce((acc, current) => acc + current.gapBas, 0) / thursdayFalse.length).toFixed(2) + ' %');
  console.log('------------------------------------------------------------------------------------------------------------------');

  console.log('Moyenne True  Vendredi ' + ((fridayTrue.length / (fridayTrue.length + fridayFalse.length)) * 100).toFixed(2) + ' %');

  console.log('Moyenne variation True Vendredi ' + (fridayTrue.reduce((acc, current) => acc + current.variation, 0) / fridayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut True Vendredi ' + (fridayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / fridayTrue.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas True Vendredi ' + (fridayTrue.reduce((acc, current) => acc + current.gapBas, 0) / fridayTrue.length).toFixed(2) + ' %');

  console.log('Moyenne variation False Vendredi ' + (fridayFalse.reduce((acc, current) => acc + current.variation, 0) / fridayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapHaut False Vendredi ' + (fridayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / fridayFalse.length).toFixed(2) + ' %');
  console.log('Moyenne gapBas False Vendredi ' + (fridayFalse.reduce((acc, current) => acc + current.gapBas, 0) / fridayFalse.length).toFixed(2) + ' %');
}
