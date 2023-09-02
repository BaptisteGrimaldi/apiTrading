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
import { checkIfPositive } from './function/checkIfPositive.mjs';
function fetchStocksList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.twelvedata.com/stocks?exchange=NASDAQ');
            return response.json();
        }
        catch (error) {
            console.error("Une erreur s'est produite :", error);
            throw error;
        }
    });
}
function fetchStocks(symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=2&format=JSON&apikey=b914fed0677e48cdaf1938b5be42956d`);
            return response.json();
        }
        catch (error) {
            console.error("L'index de l'action n'existe pas");
            throw error;
        }
    });
}
const nasdaqStock = fetchStocksList().then((res) => {
    return res.data;
});
const nasdaqStockLength = fetchStocksList().then((res) => {
    // console.log(res.data.length)
    return res.data.length;
});
// console.log(nasdaqStockLength)
Promise.all([nasdaqStock, nasdaqStockLength])
    .then(([stockData, stockDataLength]) => {
    let action2joursPositifs = [];
    let fetchPromises = [];
    // let nombreCycleIteration = Math.ceil(stockDataLength/600)
    // console.log(nombreCycleIteration);
    // let numIndexAction = 0;
    // let numIteration = 1;
    // for( let j = 0; j <nombreCycleIteration; j++){
    //   console.log(j);
    // }
    // try{
    //   fetchStocks(stockData[6000].symbol).then((res)=>{
    //     console.log(res.meta.symbol)
    //   })
    // }catch{
    //   console.log("catch ereur")
    // }
    for (let i = 0; i < 600; i++) {
        const fetchPromise = fetchStocks(stockData[i].symbol)
            .then((res) => {
            var _a, _b, _c;
            if (((_b = (_a = res.values) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.datetime) && ((_c = res.values) === null || _c === void 0 ? void 0 : _c[1].datetime)) {
                const day1 = checkIfPositive(res.values[0].open, res.values[0].close);
                const day2 = checkIfPositive(res.values[1].open, res.values[1].close);
                if (day1 === true && day2 === true) {
                    action2joursPositifs.push(stockData[i].symbol);
                }
            }
            else {
                console.error('Les données ne sont pas définies ou ne contiennent pas de datetime.');
            }
        })
            .catch((error) => {
            console.error('Erreur lors de la requête fetch :', error);
        });
        fetchPromises.push(fetchPromise);
    }
    Promise.all(fetchPromises)
        .then(() => {
        console.log('action2joursPositifs', action2joursPositifs);
    })
        .catch((error) => {
        console.error("Erreur lors de l'exécution des promesses :", error);
    });
})
    .catch((error) => {
    console.error("Une erreur s'est produite :", error);
});
