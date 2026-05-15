# ⚡ Economize Eletricidade - Analisador de Gasto de Energia

Sistema completo com pagamento integrado ao Mercado Pago para análise de consumo de energia elétrica.

---

## 📋 PRÉ-REQUISITOS

- Node.js 18+ instalado ([Baixar aqui](https://nodejs.org/))
- Conta no Mercado Pago ([Criar conta](https://www.mercadopago.com.br))
- Git instalado

---

## 🚀 INSTALAÇÃO LOCAL

### 1️⃣ Clonar ou fazer download do projeto

```bash
cd economizeeletricidade
npm install
```

### 2️⃣ Configurar variáveis de ambiente

Abra o arquivo `.env` e preencha com seus dados do Mercado Pago:

```
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_aqui
MERCADO_PAGO_PUBLIC_KEY=sua_public_key_aqui
MERCADO_PAGO_WEBHOOK_TOKEN=seu_webhook_token_aqui
```

**Como obter as chaves?**
1. Acesse: [Mercado Pago Credenciais](https://www.mercadopago.com.br/settings/account/credentials)
2. Copie seu Access Token
3. Copie sua Public Key

### 3️⃣ Rodar o servidor localmente

```bash
npm start
```

Seu site estará em: `http://localhost:3000`

### 4️⃣ Testar o pagamento

Para testes locais, abra o DevTools do navegador (F12) e execute:

```javascript
fetch('http://localhost:3000/api/test-payment/test_session_123', {
    method: 'POST'
}).then(r => r.json()).then(console.log);
```

Isso simula um pagamento confirmado.

---

## 🌐 DEPLOY EM PRODUÇÃO

### Opção 1: Railway (Recomendado) ⭐

**Railway é grátis e fácil!**

1. Acesse: [railway.app](https://railway.app)
2. Clique em "Start a New Project"
3. Selecione "Deploy from GitHub"
4. Conecte seu repositório GitHub
5. Configure as variáveis de ambiente (.env)
6. Deploy automático!

**Seu URL será algo como:** `seu-projeto-random.railway.app`

### Opção 2: Heroku

1. Instale o Heroku CLI
2. Execute:
```bash
heroku login
heroku create seu-projeto-economize
git push heroku main
heroku config:set MERCADO_PAGO_ACCESS_TOKEN=seu_token
```

### Opção 3: Replit

1. Acesse: [replit.com](https://replit.com)
2. Crie um novo projeto Node.js
3. Faça upload dos arquivos
4. Configure .env
5. Clique em "Run"

---

## 🔗 CONFIGURAR WEBHOOK DO MERCADO PAGO

Após fazer deploy, você precisa registrar o webhook no Mercado Pago:

1. Acesse: [Mercado Pago - Webhooks](https://www.mercadopago.com.br/developers/pt/guides/webhooks/v1/overview)
2. Adicione uma nova notificação com:
   - **URL:** `https://seu-dominio.com/api/webhook/mercadopago`
   - **Eventos:** `payment.created` e `payment.updated`

---

## 📊 COMO FUNCIONA

1. **Cliente acessa o site**
2. **Adiciona seus eletrodomésticos**
3. **Modal de pagamento aparece**
4. **Clica em "Pagar com Cartão"**
5. **Redirecionado para seu link do Mercado Pago**
6. **Sistema verifica a cada 3 segundos se pagamento foi confirmado**
7. **Assim que confirmado, análise é desbloqueada**

---

## 💾 ESTRUTURA DE ARQUIVOS

```
economizeeletricidade/
├── server.js              # Servidor backend
├── analisador_energia.html # Frontend
├── package.json           # Dependências
├── .env                   # Variáveis de ambiente
├── .gitignore            # Arquivos a ignorar no Git
├── payments.json         # Histórico de pagamentos (criado automaticamente)
└── README.md            # Este arquivo
```

---

## 🔐 SEGURANÇA

⚠️ **IMPORTANTE:**

- Nunca compartilhe suas chaves do Mercado Pago
- Sempre use HTTPS em produção
- O arquivo `.env` nunca deve ser enviado ao GitHub
- Sempre verifique o status do pagamento na API do Mercado Pago

---

## 🐛 TROUBLESHOOTING

### "Erro de conexão ao servidor"
- Verificar se o servidor está rodando
- Verificar se a URL no código está correta
- Verificar se há erro de CORS

### "Webhook não está recebendo"
- Verificar se a URL do webhook está correta no Mercado Pago
- Verificar se o servidor está online
- Testar com: `curl -X POST https://seu-dominio.com/api/webhook/mercadopago`

### "Pagamento não é confirmado"
- Verificar os logs do servidor
- Verificar se o Access Token está correto
- Testar com a API de teste do Mercado Pago

---

## 📞 SUPORTE

- Docs Mercado Pago: [developers.mercadopago.com.br](https://developers.mercadopago.com.br)
- Express.js Docs: [expressjs.com](https://expressjs.com)
- Problemas? Verifique os logs do servidor

---

## 📄 LICENÇA

Este projeto é proprietário. Todos os direitos reservados.

---

**Desenvolvido com ❤️ por Renato B Alves**
