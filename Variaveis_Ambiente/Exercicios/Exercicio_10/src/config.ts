import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// 1. Carrega o .env e aplica a expansão/interpolação dinâmica de variáveis
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const env = process.env.NODE_ENV ?? 'development';
const rawLogPath = process.env.LOG_PATH ?? `./logs/${env}.log`;

// 2. Ancura o caminho do log na raiz do projeto para evitar que valores externos fujam da pasta
const rootDir = process.cwd();
const resolvedLogPath = path.resolve(rootDir, rawLogPath);

// Trava de segurança: garante que o caminho resolvido não saia da raiz do projeto
if (!resolvedLogPath.startsWith(rootDir)) {
  throw new Error('[CONFIG ERROR] LOG_PATH inválido: O caminho de log não pode apontar para fora da pasta do projeto.');
}

// 3. Garante que a pasta 'logs' exista antes de qualquer escrita
fs.mkdirSync(path.dirname(resolvedLogPath), { recursive: true });

export const config = Object.freeze({
  env,
  port: Number(process.env.PORT) || 3000,
  log: Object.freeze({
    path: resolvedLogPath,
    level: process.env.LOG_LEVEL ?? (env === 'production' ? 'info' : 'debug')
  })
});

export type Config = typeof config;