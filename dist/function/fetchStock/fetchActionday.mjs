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
export function fetchActionDay(date, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const datePlus1 = new Date(date);
        datePlus1.setDate(datePlus1.getDate() + 1);
        const year = datePlus1.getFullYear();
        const month = (datePlus1.getMonth() + 1).toString().padStart(2, '0');
        const day = datePlus1.getDate().toString().padStart(2, '0');
        const nouvelleDate = `${year}-${month}-${day}`;
        console.log('nouvelleDate', nouvelleDate);
        try {
            const actionDay = yield fetch(`https://api.twelvedata.com/time_series?symbol=${action}&interval=1h&format=JSON&start_date=${date}%209:00AM&end_date=${nouvelleDate}&apikey=b914fed0677e48cdaf1938b5be42956d`);
            const data = (yield actionDay.json());
            return data;
        }
        catch (_a) {
            console.log("erreur lors de la récupération des données de l'action");
        }
    });
}
fetchActionDay('2023-05-05', 'AAPL').then((data) => console.log(data.values));
