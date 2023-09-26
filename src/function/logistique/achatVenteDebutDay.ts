import { fetchActionDay } from "../fetchStock/fetchActionday";
import { waitPromesse } from "./waitPromesse";
import { obtenirDateAujourdhui } from "./obtenirDateAujourdhui";

const action = 'NFLX';
const dateAujourdhui = obtenirDateAujourdhui();

let achat = true;
const gapBasminSucess =1.003;
const gapHautminFail = 1.0005;

const variationSucess = 1.028;

async function executeAchat() {
  while (achat) {
    await waitPromesse(1000);
    const data = await fetchActionDay(dateAujourdhui, action, "1day");
    if (data !== 'error') {
    console.log("open", data.values[0].open)
      console.log("prix achat : ", (parseFloat(data.values[0].open) / gapBasminSucess).toFixed(2));
      console.log("prix vente Min: ", (parseFloat(data.values[0].open) * gapHautminFail).toFixed(2));
      console.log("prix vente Max: ", (parseFloat(data.values[0].open) * variationSucess).toFixed(2));
      achat = false;
    } else {
      console.log("pas encore");
    }
  }
}

executeAchat();

