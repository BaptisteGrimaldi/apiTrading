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
import {formatDateToYYYYMMDD } from '../logistique/formatDate.mjs';;
import {plusAncienneDateAction } from './plusAncienneDateAction.mjs';;
export function fetchDataHistoric(action) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        try {
            const plusAncienneDataAction = yield plusAncienneDateAction(action);
            const response = yield fetch(`https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&start_date=${plusAncienneDataAction} 6:05 PM&end_date=${formatDateToYYYYMMDD(today)} 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
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
// fetchDataHistoric('AAPL').then((data) => {
//     console.log(data.values[4999].datetime)
//     console.log(data.values[0].datetime)
// });
