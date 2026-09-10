# NOCTOOL

Ferramenta NOC para análise e diagnóstico de rede, preparada para rodar no **Cloudflare Pages** com **Pages Functions** (backend serverless) e banco de dados **Cloudflare D1** (SQLite distribuído).

---

## 🚀 Desenvolvimento Local

Você pode rodar localmente de duas formas:

### Opção A: Emulação completa do Cloudflare Pages + Banco D1 (Recomendado)

Simula o ambiente idêntico ao da Cloudflare, com Pages Functions e banco D1 local:

1. Aplique a migração no banco D1 local:
```bash
npx wrangler d1 migrations apply noctool --local
```

2. Inicie o servidor local do Pages:
```bash
npm run pages:dev
# ou: npx wrangler pages dev . --d1 DB=noctool
```

Acesse em: `http://localhost:8788`

### Opção B: Servidor Node.js rápido (sem dependência do Wrangler)

Ideal para testar rapidamente a interface e a consulta externa:

```bash
npm start
# ou: node server.js
```

Acesse em: `http://localhost:5173`

---

## ☁️ Produção no Cloudflare Pages com Banco D1

A arquitetura no Cloudflare Pages utiliza:
- **CDN Pages**: Hospeda e serve todo o frontend estático (`index.html`, `topo/`, `app.js`, etc.) com latência mínima global.
- **Pages Functions (`functions/`)**: Backend serverless que atende as rotas `/api/config` e `/api/city`, com cabeçalhos de segurança via `functions/_middleware.js`.
- **Banco D1 (`DB`)**: Armazena o cache de consultas (`city_cache` com expiração de 24h) e o histórico/auditoria de requisições (`api_events`).

### 1. Criar o Banco D1 na Cloudflare

No terminal, autentique no Cloudflare e crie o banco com o nome `noctool`:

```bash
npx wrangler login
npx wrangler d1 create noctool
```

O comando exibirá o `database_id`. Copie e cole no arquivo `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "noctool"
database_id = "COLE_AQUI_O_ID_RETORNADO"
```

### 2. Aplicar a migração inicial no D1

Execute a migração para criar as tabelas `city_cache` e `api_events` no banco `noctool`:

```bash
npx wrangler d1 migrations apply noctool --remote
```

### 3. Conectar e Configurar no Cloudflare Pages

Existem dois métodos de publicação:

#### Método 1: Integração Git direta pelo Cloudflare Dashboard (Mais simples)
1. Acesse o painel da Cloudflare > **Compute (Workers & Pages)** > **Pages** > **Connect to Git**.
2. Selecione o repositório `noctool`.
3. Em **Build settings**:
   - **Framework preset**: None
   - **Build command**: *(deixe em branco)*
   - **Build output directory**: `.`
4. Clique em **Save and Deploy**.
5. Após o primeiro deploy, vá em **Settings** do projeto no Pages:
   - Acesse **Functions** > **D1 database bindings**.
   - Clique em **Add binding**.
   - Variable name: `DB`
   - D1 database: Selecione `noctool`.
   - Clique em **Save**.
6. Em **Settings** > **Environment variables**, configure se desejar:
   - `TURNSTILE_REQUIRED`: `false` (ou `true` se quiser proteção anti-bot).

#### Método 2: Deploy automatizado via GitHub Actions
O repositório já inclui o workflow [cloudflare.yml](file:///.github/workflows/cloudflare.yml).

No GitHub, acesse **Settings > Secrets and variables > Actions** e adicione:
- `CLOUDFLARE_API_TOKEN`: Token com permissões `Cloudflare Pages: Edit` e `D1: Edit`.
- `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta Cloudflare.

Ao fazer push na branch `main`, as migrações serão aplicadas no D1 `noctool` e o Pages será publicado automaticamente.

#### Método 3: Deploy manual via CLI
```bash
npx wrangler pages deploy . --project-name=noctool
```

---

## 🛡️ Configurar o Turnstile (Opcional)

1. No painel Cloudflare, abra **Turnstile**, crie um widget e adicione o domínio do seu Pages (`seu-projeto.pages.dev`). Para testes locais, adicione também `localhost` e `127.0.0.1`.
2. Configure as variáveis de ambiente no Pages:
   - `TURNSTILE_SITE_KEY`: Chave pública do site.
   - `TURNSTILE_SECRET_KEY`: Chave secreta (Secret).
   - `TURNSTILE_REQUIRED`: `"true"`
3. Com isso ativo, a rota `/api/city` validará o token antes de consultar o serviço externo.

---

## 🔍 Verificação da Instalação

Substitua pelo endereço do seu projeto Pages:

```bash
# Verifica as configurações públicas
curl -i https://noctool.pages.dev/api/config

# Realiza uma consulta de teste
curl -i -X POST https://noctool.pages.dev/api/city \
  -H 'Content-Type: application/json' \
  -data '{"query":"SAO"}'
```
