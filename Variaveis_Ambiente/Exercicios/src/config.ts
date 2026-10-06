import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT) || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
};

// Impressão segura e seletiva
console.log('Configuração carregada:', config);