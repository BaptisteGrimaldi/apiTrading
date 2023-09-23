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
const action = 'AAPL';
export function fetchDmiPlus(action, start_date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/plus_di?symbol=${action}&interval=1day&outputsize=1&time_period=14&format=JSON&start_date=${start_date}%209:00AM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            const data = yield response.json();
            return data.values[0].plus_di;
        }
        catch (_a) {
            console.log("erreur fetch dmiDataPlus");
            console.log(start_date);
            return 'error';
        }
    });
}
// fetchDmiPlus(action, '2021-05-05')
//     .then((data: string) => console.log(data))
