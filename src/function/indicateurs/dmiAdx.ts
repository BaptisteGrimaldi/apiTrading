

import fetch from "node-fetch";

//types : 
import { dmiDataPlus } from "../types/dmiPlus";
import { dmiDataMinus } from "../types/dmiMinus";

export async function dmiAdx(listeActionPattern: string[]) : Promise<string[]>{

    const actionDmiPatternOk: string[] = [];

    for(const action of listeActionPattern){

        try{
            const plus_di = await fetch(`https://api.twelvedata.com/plus_di?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
            .then(res => res.json() as Promise<dmiDataPlus>)
            .then((res:dmiDataPlus)=>{

                const actuel = res.values[0].plus_di;
                const actuelMoins1 = res.values[1].plus_di;

                const actuelResult = {actuel: actuel, actuelMoins1: actuelMoins1};

                return actuelResult;
            })

            const minus_di = await fetch(`https://api.twelvedata.com/minus_di?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`)
            .then(res => res.json() as Promise<dmiDataMinus>)
            .then((res:dmiDataMinus)=>{
                const actuel = res.values[0].minus_di;
                const actuelMoins1 = res.values[1].minus_di;

                const actuelResult = {actuel: actuel, actuelMoins1: actuelMoins1};

                return actuelResult;    
            })

            if(plus_di.actuel > minus_di.actuel && plus_di.actuelMoins1 < minus_di.actuelMoins1 ){
                actionDmiPatternOk.push(action);
            }


        }catch{
            console.log('error fetch dmi')
        }
    }
    return actionDmiPatternOk;
}