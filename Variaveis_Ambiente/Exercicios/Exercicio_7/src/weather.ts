// 1. Chave direta do ambiente (sem fallback hardcoded)
const API_KEY = process.env.API_KEY;

// 2. Função de mascaramento simples
export function mask(secret: string = ''): string {
  return secret.length <= 4 ? '****' : '****' + secret.slice(-4);
}

export async function getWeather(city: string) {
  // Garantimos que a chave existe antes de chamar a API
  if (!API_KEY) {
    throw new Error('API_KEY não foi configurada no ambiente.');
  }

  // URL limpa sem a chave na query string
  const url = `https://api.exemplo.com/v1/weather?city=${encodeURIComponent(city)}`;
  
  // Log seguro usando a versão mascarada
  console.log(`Buscando clima para: ${city} (Chave: ${mask(API_KEY)})`);

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}` // Envio seguro pelo cabeçalho
    }
  });

  if (!response.ok) {
    // Erro limpo sem expor o segredo
    throw new Error(`Erro na API (${response.status})`);
  }

  return response.json();
}