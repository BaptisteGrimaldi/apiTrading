import fetch from 'node-fetch';

export async function checkRsiIndex(listeActionPattern: string[]) {
    const actionRsiPatternOk: string[] = [];
    const promises = [];

    for (const action of listeActionPattern) {
        const promise = fetch(
            `https://api.twelvedata.com/rsi?symbol=${action}&interval=1day&time_period=14&apikey=b914fed0677e48cdaf1938b5be42956d`
        )
            .then((res) => res.json())
            .then((res:any) => {
                if (res.values[0].rsi >= 30 && res.values[1].rsi < 30) {
                    actionRsiPatternOk.push(action);
                }
            });
        promises.push(promise);
    }

    await Promise.all(promises);

    return actionRsiPatternOk;
}


