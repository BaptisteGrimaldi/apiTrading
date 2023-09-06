import inquirer from 'inquirer';

interface ReponsesQuestion {
  indice: string;
  strategie: string;
  prix: number;
  minRsi: number;
  maxRsi: number;
  api: number;
  bougieConfig: string[];
}

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

async function questionMinRsi(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'prix',
      message: question,
    },
  ]);

  return reponse.prix;
}

async function questionMaxRsI(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'maxRSI',
      message: question,
    },
  ]);

  return reponse.maxRSI;
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

async function questionBougieConfig(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'bougie',
      message: question,
    },
  ]);

  return reponse.bougie;
}


export async function poserQuestionsEnSeries(): Promise<ReponsesQuestion> {
  const indice: string = await questionIndice(
    'Quel indice voulez-vous checker ?'
  );
  const strategie: string = await questionStrategie(
    'Quel stratégie voulez-vous ?'
  );
  const prix: string = await questionPrix('Quel prix minimum voulez-vous ?');
  const minRsi: string = await questionMinRsi('Quel rsi minimum voulez-vous ?');
  const maxRsi: string = await questionMaxRsI('Quel rsi maximum voulez-vous ?');
  const api: string = await cycleApi('Nombre appel api par clycle ?');
  const bougieConfig: string = await questionBougieConfig('Quel configuration de bougie voulez-vous ?');

  const reponsesQuestion: ReponsesQuestion = {
    indice: indice,
    strategie: strategie,
    prix: parseInt(prix),
    minRsi: parseFloat(minRsi),
    maxRsi: parseFloat(maxRsi),
    api: parseInt(api),
    bougieConfig: bougieConfig.split(''),
  };

  return reponsesQuestion;
}
