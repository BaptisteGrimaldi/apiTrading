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
      choices: ['check2BougiesVertes2Rouges', 'rsiBas10'],
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
async function questionStochastiqueSlowKmin(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'stochastiqueSlowKmin',
      message: question,
    },
  ]);

  return reponse.stochastiqueSlowKmin;
}
async function questionStochastiqueSlowKmax(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'stochastiqueSlowKmax',
      message: question,
    },
  ]);

  return reponse.stochastiqueSlowKmax;
}

async function ecartSlowkSlowd(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'ecartSlowkSlowd',
      message: question,
    },
  ]);
  return reponse.ecartSlowkSlowd;
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

async function questionMacd(question: string) {
  const reponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'macd',
      message: question,
    },
  ]);

  return reponse.macd;
}

export {
  questionBougieConfig,
  cycleApi,
  questionStochastiqueSlowKmax,
  questionStochastiqueSlowKmin,
  questionMaxRsI,
  questionMinRsi,
  questionPrix,
  questionStrategie,
  questionIndice,
  ecartSlowkSlowd,
  questionMacd,
};
