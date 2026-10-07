import 'dotenv/config'; // Garante que o .env é lido IMEDIATAMENTE antes de qualquer leitura

function requiredString(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`[CONFIG ERROR] A variável de ambiente ${name} é obrigatória e não foi informada.`);
  }
  return value;
}

function requiredPort(name: string, fallback: number = 3000): number {
  const value = process.env[name];
  if (!value) return fallback;

  const port = Number(value);
  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(`[CONFIG ERROR] A variável ${name} deve ser uma porta válida (1-65535). Recebido: ${value}`);
  }

  return port;
}

// Criamos e congelamos o objeto de configuração
export const config = Object.freeze({
  port: requiredPort('PORT', 3000),
  db: Object.freeze({
    host: requiredString('DB_HOST')
  })
});

// Exportação do tipo inferido sem 'undefined'
export type Config = typeof config;