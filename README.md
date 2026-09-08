# DSCTOOL

## Administração e SQLite

Execute o backend com `node server.js`. A área administrativa fica em `/admin/admin.html` e usa SQLite em `admin/data/admin.sqlite`, criado automaticamente na primeira execução.

O painel mantém módulos separados para mensagens, parceiros, falhas e configurações. `Salvar no servidor` grava esses módulos em SQLite; `Publicar no GitHub` também atualiza os arquivos `admin/config/*.json` pela API do GitHub.

O arquivo `.env` versionado deve conter apenas configurações públicas. Para credenciais reais, use `.env.local`, que não é versionado:

```bash
cp .env.example .env
# copie as credenciais reais para .env.local
cp .env .env.local
node server.js
```

No `.env.local`, defina os segredos:

```env
ADMIN_USER=admin
ADMIN_PASSWORD=troque-esta-senha
```

O token e as credenciais administrativas são lidos exclusivamente por `server.js`, nunca são enviados ao navegador. A sessão usa cookie `HttpOnly` com expiração de 8 horas, e `.env` é bloqueado pelo servidor HTTP. Troque a senha de exemplo antes de iniciar em produção.
TOOL
