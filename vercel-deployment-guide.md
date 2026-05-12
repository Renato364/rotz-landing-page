# Guia de Deploy Vercel - Rotz Testador

Mestre, o projeto está 100% preparado e o build foi validado localmente com sucesso. Siga estes passos para colocar a landing page no ar:

## 1. Conectar ao GitHub
Como o Vercel funciona melhor com o GitHub, eu já inicializei o repositório Git localmente. 
1. Crie um novo repositório no seu GitHub (ex: `rotz-testador`).
2. No seu terminal, rode estes comandos para enviar o código:
   ```bash
   git add .
   git commit -m "feat: preparação para deploy vercel"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/rotz-testador.git
   git push -u origin main
   ```

## 2. Criar Projeto no Vercel
1. No seu [Dashboard do Vercel](https://vercel.com/dashboard), clique em **"Add New..."** -> **"Project"**.
2. Selecione o repositório `rotz-testador` que você acabou de criar.
3. Nas configurações:
   - **Framework Preset:** Vite (será detectado automaticamente).
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

## 3. Configurar Variáveis de Ambiente
Antes de clicar em "Deploy", adicione estas variáveis na seção **Environment Variables**:
- `VITE_SUPABASE_URL`: Sua URL do Supabase.
- `VITE_SUPABASE_ANON_KEY`: Sua chave anônima do Supabase.
- `GEMINI_API_KEY`: Sua chave da API do Gemini (se necessário para o build).

## O que eu já fiz:
- [x] Inicializei o repositório Git.
- [x] Criei o arquivo `vercel.json` para garantir que as rotas SPA funcionem (evita erro 404 ao atualizar a página).
- [x] Instalei as dependências e validei o `npm run build` localmente.
- [x] Configurei o `.gitignore` para não subir arquivos desnecessários.

Pronto para decolar! 🚀
