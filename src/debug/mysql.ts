import * as mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Crapulo2001*',
  database: 'debugging',
};

export async function insererElementsDansMySQL(
  resultBougiePattern: boolean[],
  nomDeColonneResultBougiePattern: string,
  resultDateTimeBougiePatternActionEnCour: string[],
  nomDeColonneResultDateTimeBougiePatternActionEnCour: string
): Promise<void> {
  try {
    const connection = await mysql.createConnection(dbConfig);

    for (let i = 0; i < resultBougiePattern.length; i++) {
      const sql = `
        INSERT INTO debug (${nomDeColonneResultBougiePattern}, ${nomDeColonneResultDateTimeBougiePatternActionEnCour})
        VALUES (?, ?)
      `;

      await connection.execute(sql, [resultBougiePattern[i], resultDateTimeBougiePatternActionEnCour[i]]);
    }

    await connection.end();
    console.log('Connexion à MySQL fermée.');
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

// Exemple d'utilisation
// const resultBougiePattern: boolean[] = [true, false, false];
// const nomDeColonneResultBougiePattern = 'resultBougiePattern';
// const resultDateTimeBougiePatternActionEnCour: string[] = ['2023-09-01', '2023-09-02', '2023-09-03'];
// const nomDeColonneResultDateTimeBougiePatternActionEnCour = 'resultDateTimeBougiePatternActionEnCour';

// insererElementsDansMySQL(
//   resultBougiePattern,
//   nomDeColonneResultBougiePattern,
//   resultDateTimeBougiePatternActionEnCour,
//   nomDeColonneResultDateTimeBougiePatternActionEnCour
// );
