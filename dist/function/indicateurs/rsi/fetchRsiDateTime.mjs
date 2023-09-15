var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchRsiDateTime(actionAcheck, dateTime) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.twelvedata.com/rsi?symbol=${actionAcheck}&interval=1day&outputsize=1&format=JSON&end_date=${dateTime}%209:47%20PM&apikey=b914fed0677e48cdaf1938b5be42956d`);
            if (!response.ok) {
                throw new Error('La requête a échoué avec un statut non OK');
            }
            const data = yield response.json();
            // Faites quelque chose avec 'data' si nécessaire
            return data.values[0].rsi;
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
            throw error; // Vous pouvez choisir de relancer l'erreur ici ou de la gérer différemment
        }
    });
}
