import { config } from './config.js';

// Removida a leitura direta de process.env
export const connection = `postgres://${config.db.host}:5432`;