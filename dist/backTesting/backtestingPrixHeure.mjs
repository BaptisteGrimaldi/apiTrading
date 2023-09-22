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
import { formatDateToYYYYMMDD } from '../function/logistique/formatDate.mjs';;
import { intraday } from '../function/logistique/intraday.mjs';;
import { plusAncienneDateAction } from '../function/fetchStock/plusAncienneDateAction.mjs';;
export function backtestingPrixHeure(action, interval, start_date, end_date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/time_series?symbol=${action}&interval=${interval}&format=JSON&start_date=${start_date} 2:50 PM&end_date=${end_date} 2:50 PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            if (!response.ok) {
                throw new Error('Échec de la récupération des données historique');
            }
            const data = (yield response.json());
            const dateLaPlusAncienneFetcher = data.values[data.values.length - 1].datetime.split(' ')[0];
            return { data: data, dateLaPlusAncienneFetcher: dateLaPlusAncienneFetcher };
        }
        catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de fetchDataHistorique", error);
        }
    });
}
const action = process.argv[2];
const tempo = await (() => __awaiter(void 0, void 0, void 0, function* () {
    const plusAncienneDataAction = yield plusAncienneDateAction(action);
    return plusAncienneDataAction;
}))();
const today = new Date();
const dateAujourdhui = formatDateToYYYYMMDD(today);
backtestingPrixHeure(action, '1h', tempo, dateAujourdhui).then((data) => {
    const intradayGlobal = [];
    let dataResult = data.data.values;
    let dataResultLength = dataResult.length;
    let dateLaPlusAncienneFetcher = data.dateLaPlusAncienneFetcher;
    intradayGlobal.push(intraday(dataResult));
    function processIntradayData() {
        return __awaiter(this, void 0, void 0, function* () {
            while (dataResultLength % 5000 === 0) {
                const data = yield backtestingPrixHeure(action, '1h', tempo, dateLaPlusAncienneFetcher);
                dataResult = data.data.values;
                dateLaPlusAncienneFetcher = data.dateLaPlusAncienneFetcher;
                if (data.data.values.length === 5000) {
                    dataResultLength += 5000;
                    intradayGlobal.push(intraday(dataResult));
                }
                else {
                    intradayGlobal.push(intraday(dataResult));
                    return;
                }
            }
        });
    }
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield processIntradayData();
        // Le code ici ne sera exécuté qu'après que processIntradayData() soit terminé
        console.log("Toutes les itérations de la boucle sont terminées.");
        // console.log(intradayGlobal);
    }))();
});
