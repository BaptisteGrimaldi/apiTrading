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
export function dmiAdx(listeActionPattern) {
    return __awaiter(this, void 0, void 0, function* () {
        const actionDmiPatternOk = [];
        for (const action of listeActionPattern) {
            try {
                const plus_di = yield fetch(`https://api.twelvedata.com/plus_di?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
                    .then((res) => res.json())
                    .then((res) => {
                    const actuel = res.values[0].plus_di;
                    const actuelMoins1 = res.values[1].plus_di;
                    const actuelResult = { actuel: actuel, actuelMoins1: actuelMoins1 };
                    return actuelResult;
                });
                const minus_di = yield fetch(`https://api.twelvedata.com/minus_di?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
                    .then((res) => res.json())
                    .then((res) => {
                    const actuel = res.values[0].minus_di;
                    const actuelMoins1 = res.values[1].minus_di;
                    const actuelResult = { actuel: actuel, actuelMoins1: actuelMoins1 };
                    return actuelResult;
                });
                if (plus_di.actuel > minus_di.actuel && plus_di.actuelMoins1 < minus_di.actuelMoins1) {
                    actionDmiPatternOk.push(action);
                }
            }
            catch (_a) {
                console.log('error fetch dmi');
            }
        }
        return actionDmiPatternOk;
    });
}
