const readline = require('readline');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction pour poser la question et récupérer la réponse de l'utilisateur
function askQuestion(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// Fonction pour exécuter un fichier avec une action donnée
async function executeFile(file, action) {
  return new Promise((resolve) => {
    const childProcess = spawn('node', [file, action], {
      stdio: 'inherit', // Utiliser 'inherit' pour hériter des paramètres du terminal parent.
    });

    // Lorsque le processus fils se termine
    childProcess.on('close', () => {
      resolve();
    });
  });
}

(async () => {
  // Poser la question
  const action = await askQuestion('Entrez le nom de l\'action : ');

  // Vérifier si l'utilisateur a entré une action
  if (!action) {
    console.error('Veuillez entrer le nom de l\'action.');
    rl.close();
    return;
  }

  // Liste des fichiers à exécuter
  const files = ['./dist/backTesting/backtestingRsi10.mjs', './dist/backTesting/backtestingJourSemaine.mjs', './dist/backTesting/backtestingPrixHeure.mjs'];

  // Exécuter les fichiers en série
  for (const file of files) {
    // console.log(`Exécution de ${file}`);
    await executeFile(file, action);
    // console.log(`Terminé ${file}`);
  }

  rl.close();
})();
