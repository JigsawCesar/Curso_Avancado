import { config } from './config.js';

// Agora config.port é do tipo 'number' garantido!
console.log(`Servidor a iniciar na porta: ${config.port} (Tipo: ${typeof config.port})`);