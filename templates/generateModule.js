const fs = require('fs').promises;
const path = require('path');
// Obtener el nombre del módulo desde la línea de comandos
const moduleName = process.argv[2];
const moduleNamePlural = process.argv[3] || (`${moduleName.toLowerCase()}s`);
const moduleCamelCase = moduleName[0].toUpperCase() + moduleName.slice(1);
const sourceFolderSrc = path.join(__dirname, 'module');
const destinationFolderSrc = path.join(__dirname, '..', 'src', 'modules', moduleNamePlural);

async function replaceInFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const result = data.replace(/Example/g, moduleCamelCase).replace(/examples/g, moduleNamePlural);
    await fs.writeFile(filePath, result, 'utf8');
    console.log('File modified:', filePath);
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

async function processFolder(sourceFolder, destinationFolder) {
  try {
    const files = await fs.readdir(sourceFolder);
    await Promise.all(files.map(async (file) => {
      const fileName = file.replace(/Example/g, moduleCamelCase);
      const filePath = path.join(sourceFolder, file);
      const destinationPath = path.join(destinationFolder, fileName);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await fs.mkdir(destinationPath, { recursive: true });
        await processFolder(filePath, destinationPath);
      } else {
        await fs.copyFile(filePath, destinationPath);
        await replaceInFile(destinationPath);
      }
    }));
  } catch (err) {
    console.error('Error processing folder:', err);
  }
}

if (!moduleName) {
  console.error('Por favor, proporciona un nombre de módulo.');
} else {
  processFolder(sourceFolderSrc, destinationFolderSrc, moduleName);
}
