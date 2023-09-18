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

(async () => {
  // Poser la question
  const action = await askQuestion('Entrez le nom de l\'action : ');

  // Vérifier si l'utilisateur a entré une action
  if (!action) {
    console.error('Veuillez entrer le nom de l\'action.');
    rl.close();
    return;
  }

  // Exécuter le script backtesting.mjs avec l'action en tant qu'argument
  const childProcess = spawn('node', ['./dist/backTesting/backtestingRsi.mjs', action], {
    stdio: 'inherit', // Utiliser 'inherit' pour hériter des paramètres du terminal parent.
  });

  // Lorsque le processus fils se termine
  childProcess.on('close', () => {
    rl.close();
  });
})();
