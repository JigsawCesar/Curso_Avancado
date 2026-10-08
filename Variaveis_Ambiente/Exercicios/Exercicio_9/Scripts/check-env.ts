// scripts/check-env.ts
import fs from 'node:fs';

function getKeys(file: string): string[] {
  if (!fs.existsSync(file)) return [];
  
  return fs.readFileSync(file, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#')) // Descarta comentários e linhas vazias
    .map(line => line.split('=')[0].trim());       // Pega apenas o nome da chave
}

const exampleKeys = getKeys('.env.example');
const localKeys = getKeys('.env');

// Procura por chaves do exemplo que faltam no .env local
const missing = exampleKeys.filter(key => !localKeys.includes(key));

if (missing.length > 0) {
  console.error('\n❌ ERRO DE CONFIGURAÇÃO:');
  console.error(`As seguintes variáveis estão faltandono seu ficheiro .env local:`);
  missing.forEach(key => console.error(` - ${key}`));
  console.error('\nConsulte o ficheiro .env.example para atualizar a sua configuração.\n');
  process.exit(1); // Interrompe a execução com código de erro
}

console.log('✅ Verificação de variáveis de ambiente concluída com sucesso!');