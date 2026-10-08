# Projeto - Variáveis de Ambiente e Boas Práticas em Equipe

Este projeto utiliza validação automática de variáveis de ambiente para garantir que a aplicação só suba se todas as configurações necessárias estiverem presentes.

## 🚀 Como rodar o projeto do zero (Clone Limpo)

1. **Clonar o repositório:**
   ```
   git clone <URL_DO_REPOSITORIO>
   cd Exercicio_9
   ```

2. **Instalar as dependências:**
   ```
   npm install
   ```

3. **Configurar o arquivo de ambiente local:**

Crie o seu arquivo .env a partir do modelo .env.example:

    ```
    cp .env.example .env
    ```

Aviso de Segurança: O arquivo .env contém credenciais locais e nunca deve ser versionado no Git. Edite o arquivo .env recém-criado informando os valores adequados para o seu ambiente local.

4. **Iniciar o projeto:**
    ```
    npm run dev
    ```

## 🔍 Verificação Automática do Ambiente (scripts/check-env.ts)
Para evitar falhas de execução por variáveis ausentes, o projeto conta com um script de verificação executado automaticamente antes da subida da aplicação (via hook predev no package.json).

**Como funciona:**

    ```
    1. O script scripts/check-env.ts compara as chaves declaradas no .env.example com o arquivo .env local.

    2. Se qualquer variável obrigatória estiver faltando no .env local, o processo é interrompido imediatamente com um código de erro (process.exit(1)).

    3. A aplicação só é iniciada quando todas as chaves do modelo forem encontradas no ambiente local.
    ```

## Regra de Ouro da Equipe:

Sempre que uma nova variável de ambiente for introduzida no código, é obrigatório adicionar a chave (sem o valor real) no arquivo .env.example no mesmo commit.
