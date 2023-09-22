"use strict";
// import { DateTimeInfo} from '../../types/dateTimeAncienne.mjs';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// import { formatDateToYYYYMMDD } from '../../logistique/formatDate.mjs';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// const action: string = 'AAPL';
// export async function fetchRsiHistorique(){
//     const today: Date = new Date();
//     try {
//       const plusAncienneDataAction: string = await fetch(
//         `https://api.twelvedata.com/earliest_timestamp?symbol=${action}&interval=1day&apikey=b914fed0677e48cdaf1938b5be42956d`
//       )
//         .then((response) => response.json())
//         .then((data) => data as DateTimeInfo)
//         .then((data: DateTimeInfo) => {
//           return data.datetime;
//         })
//         .catch((error) => {
//           console.error("Une erreur s'est produite lors de la récupération de la datetime la plus ancienne", error);
//           return 'error';
//         });
//       const response = await fetch(
//         `https://api.twelvedata.com/time_series?symbol=${action}&interval=1day&format=JSON&start_date=${plusAncienneDataAction} 6:05 PM&end_date=${formatDateToYYYYMMDD(
//           today
//         )} 6:05 PM&apikey=b914fed0677e48cdaf1938b5be42956d`
//       );
//       if (!response.ok) {
//         throw new Error('Échec de la récupération des données historique');
//       }
//       const data = (await response.json()) as valueStock;
//       return data;
//     } catch (error) {
//       console.error("Une erreur s'est produite lors de la récupération des données de fetchDataHistorique", error);
//       throw error;
//     }
// }
