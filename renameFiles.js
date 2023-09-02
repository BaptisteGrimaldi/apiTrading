const fs = require('fs');
const path = require('path');

function renameJsToMjsRecursively(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Si c'est un répertoire, récursion pour traiter les fichiers à l'intérieur
      renameJsToMjsRecursively(filePath);
    } else if (filePath.endsWith('.js')) {
      const newFilePath = filePath.replace('.js', '.mjs');
      fs.renameSync(filePath, newFilePath);
    }
  });
}

// Spécifiez le répertoire dans lequel vous souhaitez renommer les fichiers
const directoryToRename = './dist';
renameJsToMjsRecursively(directoryToRename);
