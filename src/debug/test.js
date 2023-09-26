console.log('test');

async function fetchActionDay(date, action) {
  const datePlus1 = new Date(date);

  datePlus1.setDate(datePlus1.getDate() + 1);
  const year = datePlus1.getFullYear();
  const month = (datePlus1.getMonth() + 1).toString().padStart(2, '0');
  const day = datePlus1.getDate().toString().padStart(2, '0');
  const nouvelleDate = `${year}-${month}-${day}`;

  console.log('nouvelleDate', nouvelleDate);

  try {
    const actionDay = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${action}&interval=1h&format=JSON&start_date=${date}%209:00AM&end_date=${nouvelleDate}&apikey=b914fed0677e48cdaf1938b5be42956d`
    );
    let data = await actionDay.json();
    console.log(data);

    if (data.constructor.name === 'valueStock') {
      const valueStockData = data;
      return valueStockData;
    } else if (data.constructor.name === 'absenceData') {
      const absenceData = data;
      console.log(absenceData.message);
      return 'error';
    } else {
      console.log("c'est pas censé arriver");
      return 'error';
    }
  } catch {
    console.log("erreur lors de la récupération des données de l'action");
    return 'error';
  }
}

fetchActionDay('2021-05-10', 'AAPL').then((data) => {
  console.log(data);
});
