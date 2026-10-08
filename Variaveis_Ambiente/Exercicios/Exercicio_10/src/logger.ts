import fs from 'node:fs';
import { config } from './config.js';

export function log(message: string) {
  const timestamp = new Date().toISOString();
  
  // Formato adaptado por ambiente: JSON em produção, texto legível em desenvolvimento
  const formattedMessage = config.env === 'production'
    ? JSON.stringify({ timestamp, level: config.log.level, message }) + '\n'
    : `[${timestamp}] [${config.log.level.toUpperCase()}]: ${message}\n`;

  fs.appendFileSync(config.log.path, formattedMessage);
}

log('Aplicação iniciada com sucesso!');