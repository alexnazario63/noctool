# DSCTOOL

## Desenvolvimento local

```bash
node server.js
```

## Produção na Cloudflare

O projeto usa Workers Static Assets para hospedar o frontend e um Worker para
as APIs. Atualmente `/api/city` consulta o serviço externo, usa cache D1 e
exige Turnstile em produção. O desenho permite adicionar novas rotas no mesmo
Worker sem criar um serviço separado.

### 1. Criar o banco D1

Instale o Wrangler ou autentique pelo navegador:

```bash
npx wrangler login
npx wrangler d1 create dsctool
```

Copie o `database_id` exibido para `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "dsctool"
database_id = "ID_RETORNADO_PELA_CLOUDFLARE"
```

Aplique a primeira migração uma vez:

```bash
npx wrangler d1 migrations apply dsctool --remote
```

As migrações futuras serão aplicadas automaticamente pelo workflow antes do
deploy.

### 2. Configurar o Turnstile

No painel Cloudflare, abra **Turnstile**, crie um site e informe o domínio
final da aplicação. Para testes, adicione também `localhost` e `127.0.0.1`.

Cadastre a chave secreta no Worker:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Cadastre a chave pública como variável do Worker:

```bash
npx wrangler secret put TURNSTILE_SITE_KEY
```

A chave pública não é confidencial, mas fica armazenada dessa forma para não
exigir alteração adicional no código. `TURNSTILE_REQUIRED = "true"` já está
definido em `wrangler.toml`; sem a chave secreta, consultas de produção são
recusadas.

### 3. Configurar o deploy automático

No GitHub, em **Settings > Secrets and variables > Actions**, crie:

- `CLOUDFLARE_API_TOKEN`: API Token com permissão `Workers Scripts: Edit` na
	conta correta.
- `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare.

Depois do push em `main`, o workflow
`.github/workflows/cloudflare.yml` aplica as migrações D1 e executa o deploy.

Para publicar manualmente:

```bash
npx wrangler deploy
```

### 4. Verificar a instalação

Substitua o domínio pelo endereço publicado:

```bash
curl -i https://SEU_DOMINIO/api/config
curl -i -X POST https://SEU_DOMINIO/api/city \
	-H 'Content-Type: application/json' \
	--data '{"query":"SAO","turnstileToken":"TOKEN_GERADO_PELO_WIDGET"}'
```

Uma resposta de segurança recusada sem token confirma que o Turnstile está
obrigatório. A consulta válida é feita pela página `topo/topo.html`.

### Desenvolvimento local

O servidor Node local não depende de D1 nem de Turnstile:

```bash
node server.js
```

Para testar o Worker localmente, desative a exigência apenas nessa execução:

```bash
npx wrangler dev --var TURNSTILE_REQUIRED:false
```
TOOL
