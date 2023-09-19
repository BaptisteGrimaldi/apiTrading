var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchDataHistoric } from '../function/fetchStock/fetchHistoric.mjs';;
import { checkIfPositive } from '../function/logistique/checkIfPositive.mjs';;
const action = 'REYN';
backTestingJourSemaine(action);
function backTestingJourSemaine(action) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchDataHistoric(action);
        const mondayTrue = [];
        const mondayFalse = [];
        const tuesdayTrue = [];
        const tuesdayFalse = [];
        const wednesdayTrue = [];
        const wednesdayFalse = [];
        const thursdayTrue = [];
        const thursdayFalse = [];
        const fridayTrue = [];
        const fridayFalse = [];
        for (let i = 0; i < data.values.length; i++) {
            // Make a function that check if the day is a monday, tuesday, wednesday, thursday or friday
            // If it is, check if the bougie is positive or negative
            // If it is, push the action in the array of the day
            // If it is not, push the action in the array of the day
            const dateTime = data.values[i].datetime;
            const bougie = checkIfPositive(data.values[i].open, data.values[i].close);
            const openPrice = parseFloat(data.values[i].open);
            const closePrice = parseFloat(data.values[i].close);
            const highPrice = parseFloat(data.values[i].high);
            const lowPrice = parseFloat(data.values[i].low);
            let gapHaut;
            let gapBas;
            const variation = ((closePrice - openPrice) / openPrice) * 100;
            if (bougie === true) {
                if (highPrice === openPrice) {
                    gapHaut = 0;
                }
                else {
                    gapHaut = ((highPrice - closePrice) / closePrice) * 100;
                }
                if (lowPrice === openPrice) {
                    gapBas = 0;
                }
                else {
                    gapBas = ((openPrice - lowPrice) / openPrice) * 100;
                }
            }
            else {
                if (highPrice === closePrice) {
                    gapHaut = 0;
                }
                else {
                    gapHaut = ((highPrice - openPrice) / openPrice) * 100;
                }
                if (lowPrice === closePrice) {
                    gapBas = 0;
                }
                else {
                    gapBas = ((closePrice - lowPrice) / closePrice) * 100;
                }
            }
            function checkDay(dateTime) {
                const date = new Date(dateTime);
                const day = date.getDay();
                if (day === 1) {
                    return 'monday';
                }
                else if (day === 2) {
                    return 'tuesday';
                }
                else if (day === 3) {
                    return 'wednesday';
                }
                else if (day === 4) {
                    return 'thursday';
                }
                else if (day === 5) {
                    return 'friday';
                }
            }
            const day = checkDay(dateTime);
            if (day === 'monday') {
                if (bougie === true) {
                    mondayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
                }
                else {
                    mondayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
                }
            }
            else if (day === 'tuesday') {
                if (bougie === true) {
                    tuesdayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
                }
                else {
                    tuesdayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
                }
            }
            else if (day === 'wednesday') {
                if (bougie === true) {
                    wednesdayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
                }
                else {
                    wednesdayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
                }
            }
            else if (day === 'thursday') {
                if (bougie === true) {
                    thursdayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
                }
                else {
                    thursdayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
                }
            }
            else if (day === 'friday') {
                if (bougie === true) {
                    fridayTrue.push({ action, dateTime, variation, gapHaut, gapBas });
                }
                else {
                    fridayFalse.push({ action, dateTime, variation, gapHaut, gapBas });
                }
            }
        }
        console.log('mondayTrue', mondayTrue);
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
        console.log('Moyenne True Lundi ' + (mondayTrue.length / (mondayTrue.length + mondayFalse.length)) * 100 + ' %');
        console.log('Moyenne variation True Lundi ' + mondayTrue.reduce((acc, current) => acc + current.variation, 0) / mondayTrue.length + ' %');
        console.log('Moyenne gapHaut True Lundi ' + mondayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / mondayTrue.length + ' %');
        console.log('Moyenne gapBas True Lundi ' + mondayTrue.reduce((acc, current) => acc + current.gapBas, 0) / mondayTrue.length + ' %');
        console.log('Moyenne variation False Lundi ' + mondayFalse.reduce((acc, current) => acc + current.variation, 0) / mondayFalse.length + ' %');
        console.log('Moyenne gapHaut False Lundi ' + mondayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / mondayFalse.length + ' %');
        console.log('Moyenne gapBas False Lundi ' + mondayFalse.reduce((acc, current) => acc + current.gapBas, 0) / mondayFalse.length + ' %');
        console.log('------------------------------------------------------------------------------------------------------------------');
        console.log('Moyenne True  Mardi ' + (tuesdayTrue.length / (tuesdayTrue.length + tuesdayFalse.length)) * 100 + ' %');
        console.log('Moyenne variation True Mardi ' + thursdayTrue.reduce((acc, current) => acc + current.variation, 0) / thursdayTrue.length + ' %');
        console.log('Moyenne gapHaut True Mardi ' + thursdayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayTrue.length + ' %');
        console.log('Moyenne gapBas True Mardi ' + thursdayTrue.reduce((acc, current) => acc + current.gapBas, 0) / thursdayTrue.length + ' %');
        console.log('Moyenne variation False Mardi ' + thursdayFalse.reduce((acc, current) => acc + current.variation, 0) / thursdayFalse.length + ' %');
        console.log('Moyenne gapHaut False Mardi ' + thursdayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayFalse.length + ' %');
        console.log('Moyenne gapBas False Mardi ' + thursdayFalse.reduce((acc, current) => acc + current.gapBas, 0) / thursdayFalse.length + ' %');
        console.log('------------------------------------------------------------------------------------------------------------------');
        console.log('Moyenne True  Mercredis ' + (wednesdayTrue.length / (wednesdayTrue.length + wednesdayFalse.length)) * 100 + ' %');
        console.log('Moyenne variation True Mercredis ' + wednesdayTrue.reduce((acc, current) => acc + current.variation, 0) / wednesdayTrue.length + ' %');
        console.log('Moyenne gapHaut True Mercredis ' + wednesdayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / wednesdayTrue.length + ' %');
        console.log('Moyenne gapBas True Mercredis ' + wednesdayTrue.reduce((acc, current) => acc + current.gapBas, 0) / wednesdayTrue.length + ' %');
        console.log('Moyenne variation False Mercedis ' + wednesdayFalse.reduce((acc, current) => acc + current.variation, 0) / wednesdayFalse.length + ' %');
        console.log('Moyenne gapHaut False Mercedis ' + wednesdayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / wednesdayFalse.length + ' %');
        console.log('Moyenne gapBas False Mercedis ' + wednesdayFalse.reduce((acc, current) => acc + current.gapBas, 0) / wednesdayFalse.length + ' %');
        console.log('------------------------------------------------------------------------------------------------------------------');
        console.log('Moyenne True  Jeudi ' + (thursdayTrue.length / (thursdayTrue.length + thursdayFalse.length)) * 100 + ' %');
        console.log('Moyenne variation True Jeudi ' + thursdayTrue.reduce((acc, current) => acc + current.variation, 0) / thursdayTrue.length + ' %');
        console.log('Moyenne gapHaut True Jeudi ' + thursdayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayTrue.length + ' %');
        console.log('Moyenne gapBas True Jeudi ' + thursdayTrue.reduce((acc, current) => acc + current.gapBas, 0) / thursdayTrue.length + ' %');
        console.log('Moyenne variation False Jeudi ' + thursdayFalse.reduce((acc, current) => acc + current.variation, 0) / thursdayFalse.length + ' %');
        console.log('Moyenne gapHaut False Jeudi ' + thursdayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / thursdayFalse.length + ' %');
        console.log('Moyenne gapBas False Jeudi ' + thursdayFalse.reduce((acc, current) => acc + current.gapBas, 0) / thursdayFalse.length + ' %');
        console.log('------------------------------------------------------------------------------------------------------------------');
        console.log('Moyenne True  Vendredi ' + (fridayTrue.length / (fridayTrue.length + fridayFalse.length)) * 100 + ' %');
        console.log('Moyenne variation True Vendredi ' + fridayTrue.reduce((acc, current) => acc + current.variation, 0) / fridayTrue.length + ' %');
        console.log('Moyenne gapHaut True Vendredi ' + fridayTrue.reduce((acc, current) => acc + current.gapHaut, 0) / fridayTrue.length + ' %');
        console.log('Moyenne gapBas True Vendredi ' + fridayTrue.reduce((acc, current) => acc + current.gapBas, 0) / fridayTrue.length + ' %');
        console.log('Moyenne variation False Vendredi ' + fridayFalse.reduce((acc, current) => acc + current.variation, 0) / fridayFalse.length + ' %');
        console.log('Moyenne gapHaut False Vendredi ' + fridayFalse.reduce((acc, current) => acc + current.gapHaut, 0) / fridayFalse.length + ' %');
        console.log('Moyenne gapBas False Vendredi ' + fridayFalse.reduce((acc, current) => acc + current.gapBas, 0) / fridayFalse.length + ' %');
    });
}
