import inquirer from 'inquirer';

async function questionIndice(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: question,
      choices: ['Nasdaq', 'NYSE', 'AMEX'],
    },
  ]);

  return reponse.indice;
}
async function questionStrategie(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'strategie',
      message: question,
      choices: ['check2BougiesVertes2Rouges'],
    },
  ]);

  return reponse.strategie;
}

async function questionPrix(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'prix',
      message: question,
    },
  ]);

  return reponse.prix;
}

async function questionRsi(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'prix',
      message: question,
    },
  ]);

  return reponse.prix;
}

async function cycleApi(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'api',
      message: question,
    },
  ]);

  return reponse.api;
}

export async function poserQuestionsEnSeries(): Promise<
  [string, string, number, number, number]
> {
  const indice: string = await questionIndice(
    'Quel indice voulez-vous checker ?'
  );
  const strategie: string = await questionStrategie(
    'Quel stratégie voulez-vous ?'
  );
  const prix: string = await questionPrix('Quel prix voulez-vous ?');
  const minRsi: string = await questionRsi('Quel rsi minimum voulez-vous ?');
  const api: string = await cycleApi('Nombre appel api par clycle ?');

  const reponsesQuestion: [string, string, number, number, number] = [
    indice,
    strategie,
    parseInt(prix),
    parseFloat(minRsi),
    parseInt(api),
  ];

  return reponsesQuestion;
}
