var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as mysql from 'mysql2/promise';
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Crapulo2001*',
    database: 'debugging'
};
export function insererElementsDansMySQL(resultBougiePattern, nomDeColonneResultBougiePattern, resultDateTimeBougiePatternActionEnCour, nomDeColonneResultDateTimeBougiePatternActionEnCour) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield mysql.createConnection(dbConfig);
            for (let i = 0; i < resultBougiePattern.length; i++) {
                const sql = `
        INSERT INTO debug (${nomDeColonneResultBougiePattern}, ${nomDeColonneResultDateTimeBougiePatternActionEnCour})
        VALUES (?, ?)
      `;
                yield connection.execute(sql, [resultBougiePattern[i], resultDateTimeBougiePatternActionEnCour[i]]);
            }
            yield connection.end();
            console.log('Connexion à MySQL fermée.');
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    });
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
