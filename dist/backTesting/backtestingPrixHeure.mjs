var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import { checkDay } from '../function/logistique/checkDay.mjs';;
import { formatDateToYYYYMMDD } from '../function/logistique/formatDate.mjs';;
export function backtestingPrixHeure(action) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        try {
            const plusAncienneDataAction = yield fetch(`https://api.twelvedata.com/earliest_timestamp?symbol=${action}&interval=1day&apikey=b914fed0677e48cdaf1938b5be42956d`)
                .then((response) => response.json())
                .then((data) => data)
                .then((data) => {
                return data.datetime;
            })
                .catch((error) => {
                console.error("Une erreur s'est produite lors de la récupération de la datetime la plus ancienne", error);
                return 'error';
            });
            const response = yield fetch(`https://api.twelvedata.com/time_series?symbol=${action}&interval=1h&format=JSON&start_date=${plusAncienneDataAction} 2:50 PM&end_date=${formatDateToYYYYMMDD(today)} 2:50 PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            if (!response.ok) {
                throw new Error('Échec de la récupération des données historique');
            }
            const data = (yield response.json());
            return data;
        }
        catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de fetchDataHistorique", error);
            throw error;
        }
    });
}
backtestingPrixHeure('XNCR').then((data) => {
    const dataResult = data.values;
    const resultDay = [];
    for (const heure of dataResult) {
        const datetime = heure.datetime.split(' ')[0];
        const jour = dataResult.filter((heure) => heure.datetime.split(' ')[0] === datetime);
        if (!resultDay.some((day) => JSON.stringify(day) === JSON.stringify(jour))) {
            resultDay.push(jour);
        }
    }
    const openHeure = [];
    for (let i = 0; i < resultDay.length; i++) {
        const jourEncour = [];
        resultDay[i].forEach((sequence) => {
            jourEncour.push({ open: parseFloat(sequence.open), heure: sequence.datetime.split(' ')[1], day: checkDay(sequence.datetime.split(' ')[0]), date: sequence.datetime.split(' ')[0] });
        });
        openHeure.push(jourEncour);
    }
    const heureTriGlobal = [];
    for (let i = 0; i < openHeure.length; i++) {
        const heureCroissant = [];
        const day = openHeure[i];
        const triDay = day.sort((a, b) => a.open - b.open);
        triDay.forEach((heure) => {
            heureCroissant.push(heure.heure);
        });
        heureTriGlobal.push(heureCroissant);
    }
    const achatIdeal = [];
    heureTriGlobal.forEach((jour) => {
        achatIdeal.push(jour[0]);
    });
    const achatSecondaire = [];
    heureTriGlobal.forEach((jour) => {
        achatSecondaire.push(jour[1]);
    });
    const neutre = [];
    heureTriGlobal.forEach((jour) => {
        neutre.push(jour[2]);
    });
    const venteSecondaire = [];
    heureTriGlobal.forEach((jour) => {
        venteSecondaire.push(jour[3]);
    });
    const venteIdeal = [];
    heureTriGlobal.forEach((jour) => {
        venteIdeal.push(jour[4]);
    });
    const achatIdeal9h30 = achatIdeal.filter((heure) => heure === '09:30:00');
    const achatIdeal10h30 = achatIdeal.filter((heure) => heure === '10:30:00');
    const achatIdeal11h30 = achatIdeal.filter((heure) => heure === '11:30:00');
    const achatIdeal12h30 = achatIdeal.filter((heure) => heure === '12:30:00');
    const achatIdeal13h30 = achatIdeal.filter((heure) => heure === '13:30:00');
    const achatIdeal14h30 = achatIdeal.filter((heure) => heure === '14:30:00');
    const achatIdeal15h30 = achatIdeal.filter((heure) => heure === '15:30:00');
    const triAchatIdeal = [{ "9h30": achatIdeal9h30.length, "10h30": achatIdeal10h30.length, "11h30": achatIdeal11h30.length, "12h30": achatIdeal12h30.length, "13h30": achatIdeal13h30.length, "14h30": achatIdeal14h30.length, "15h30": achatIdeal15h30.length }];
    console.log("Heure de prix d'achat idéal : ", triAchatIdeal);
    const achatSecondaire9h30 = achatSecondaire.filter((heure) => heure === '09:30:00');
    const achatSecondaire10h30 = achatSecondaire.filter((heure) => heure === '10:30:00');
    const achatSecondaire11h30 = achatSecondaire.filter((heure) => heure === '11:30:00');
    const achatSecondaire12h30 = achatSecondaire.filter((heure) => heure === '12:30:00');
    const achatSecondaire13h30 = achatSecondaire.filter((heure) => heure === '13:30:00');
    const achatSecondaire14h30 = achatSecondaire.filter((heure) => heure === '14:30:00');
    const achatSecondaire15h30 = achatSecondaire.filter((heure) => heure === '15:30:00');
    const triAchatSecondaire = [{ "9h30": achatSecondaire9h30.length, "10h30": achatSecondaire10h30.length, "11h30": achatSecondaire11h30.length, "12h30": achatSecondaire12h30.length, "13h30": achatSecondaire13h30.length, "14h30": achatSecondaire14h30.length, "15h30": achatSecondaire15h30.length }];
    console.log("Seconde heure de prix d'achat : ", triAchatSecondaire);
    const neutre9h30 = neutre.filter((heure) => heure === '09:30:00');
    const neutre10h30 = neutre.filter((heure) => heure === '10:30:00');
    const neutre11h30 = neutre.filter((heure) => heure === '11:30:00');
    const neutre12h30 = neutre.filter((heure) => heure === '12:30:00');
    const neutre13h30 = neutre.filter((heure) => heure === '13:30:00');
    const neutre14h30 = neutre.filter((heure) => heure === '14:30:00');
    const neutre15h30 = neutre.filter((heure) => heure === '15:30:00');
    const triNeutre = [{ "9h30": neutre9h30.length, "10h30": neutre10h30.length, "11h30": neutre11h30.length, "12h30": neutre12h30.length, "13h30": neutre13h30.length, "14h30": neutre14h30.length, "15h30": neutre15h30.length }];
    console.log("Heure de prix neutre : ", triNeutre);
    const venteSecondaire9h30 = venteSecondaire.filter((heure) => heure === '09:30:00');
    const venteSecondaire10h30 = venteSecondaire.filter((heure) => heure === '10:30:00');
    const venteSecondaire11h30 = venteSecondaire.filter((heure) => heure === '11:30:00');
    const venteSecondaire12h30 = venteSecondaire.filter((heure) => heure === '12:30:00');
    const venteSecondaire13h30 = venteSecondaire.filter((heure) => heure === '13:30:00');
    const venteSecondaire14h30 = venteSecondaire.filter((heure) => heure === '14:30:00');
    const venteSecondaire15h30 = venteSecondaire.filter((heure) => heure === '15:30:00');
    const triVenteSecondaire = [{ "9h30": venteSecondaire9h30.length, "10h30": venteSecondaire10h30.length, "11h30": venteSecondaire11h30.length, "12h30": venteSecondaire12h30.length, "13h30": venteSecondaire13h30.length, "14h30": venteSecondaire14h30.length, "15h30": venteSecondaire15h30.length }];
    console.log("Seconde heure de prix de vente : ", triVenteSecondaire);
    const venteIdeal9h30 = venteIdeal.filter((heure) => heure === '09:30:00');
    const venteIdeal10h30 = venteIdeal.filter((heure) => heure === '10:30:00');
    const venteIdeal11h30 = venteIdeal.filter((heure) => heure === '11:30:00');
    const venteIdeal12h30 = venteIdeal.filter((heure) => heure === '12:30:00');
    const venteIdeal13h30 = venteIdeal.filter((heure) => heure === '13:30:00');
    const venteIdeal14h30 = venteIdeal.filter((heure) => heure === '14:30:00');
    const venteIdeal15h30 = venteIdeal.filter((heure) => heure === '15:30:00');
    const triVenteIdeal = [{ "9h30": venteIdeal9h30.length, "10h30": venteIdeal10h30.length, "11h30": venteIdeal11h30.length, "12h30": venteIdeal12h30.length, "13h30": venteIdeal13h30.length, "14h30": venteIdeal14h30.length, "15h30": venteIdeal15h30.length }];
    console.log("Heure de prix de vente idéal : ", triVenteIdeal);
});
