var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
const action = 'ABNB';
// Truc qui cloche à fixe
export function fetchDmiMinus(action, end_date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/minus_di?symbol=${action}&interval=1day&outputsize=1&time_period=14&format=JSON&end_date=${end_date}%209:00PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            const data = yield response.json();
            // console.log("avant exec ",start_date);
            return data.values[0].minus_di;
        }
        catch (_a) {
            console.log(`pas de donnés a cette date pour fetch dmiMinus : ${end_date}`);
            return 'error';
        }
    });
}
// fetchDmiMinus(action, '2020-12-16')
// .then((data: string) => console.log(data))
// .catch((error) => console.error(error));
