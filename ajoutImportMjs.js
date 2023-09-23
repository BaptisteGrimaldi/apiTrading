const fs = require('fs');
const path = require('path');

function updateImportsWithMjs(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // const regex = /import\s*\{([^}]+)\}\s*from\s*'([^']+)'/g;
  const regex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]/g;

  const updatedContent = fileContent.replace(regex, (match, namedImports, importPath) => {
    // Vérifiez si l'importPath se termine déjà par '.mjs'
    if (!importPath.endsWith('.mjs')) {
      // Ajoutez l'extension '.mjs' à l'importPath
      importPath += '.mjs';
    }
    return `import {${namedImports}} from '${importPath}';`;
  });

  // Écrivez le contenu mis à jour dans le même fichier
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

function updateImportsInFilesRecursively(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Si c'est un répertoire, récursion pour traiter les fichiers à l'intérieur
      updateImportsInFilesRecursively(filePath);
    } else if (filePath.endsWith('.mjs')) {
      updateImportsWithMjs(filePath);
    }
  });
}

// Spécifiez le répertoire dans lequel vous souhaitez effectuer les remplacements
const directoryToSearch = './dist';
updateImportsInFilesRecursively(directoryToSearch);
