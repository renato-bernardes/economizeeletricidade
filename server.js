const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Arquivo para armazenar pagamentos confirmados
const paymentsFile = path.join(__dirname, 'payments.json');

// Função para ler pagamentos
function readPayments() {
    try {
        if (fs.existsSync(paymentsFile)) {
            return JSON.parse(fs.readFileSync(paymentsFile, 'utf8'));
        }
    } catch (e) {
        console.log('Erro ao ler payments.json');
    }
    return {};
}

// Função para salvar pagamentos
function savePayments(payments) {
    fs.writeFileSync(paymentsFile, JSON.stringify(payments, null, 2));
}

// Rota: Verificar se pagamento foi confirmado
app.get('/api/check-payment/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const payments = readPayments();

    const isPaid = payments[sessionId] === true;
    res.json({ paid: isPaid });
});

// Rota: Gerar sessão de pagamento
app.post('/api/create-session', (req, res) => {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const payments = readPayments();

    // Marca sessão como pendente
    payments[sessionId] = false;
    savePayments(payments);

    res.json({ sessionId });
});

// WEBHOOK: Recebe notificações do Mercado Pago
app.post('/api/webhook/mercadopago', (req, res) => {
    console.log('Webhook recebido:', req.body);

    const { action, type, data } = req.body;

    // Verifica se é notificação de pagamento
    if (type === 'payment') {
        const paymentId = data?.id;
        console.log('Payment ID recebido:', paymentId);

        // Aqui você faria uma chamada à API do Mercado Pago para verificar o status
        // Por enquanto, vamos aceitar como confirmado
        // IMPORTANTE: Em produção, SEMPRE verifique o status real na API do Mercado Pago

        const payments = readPayments();

        // Procura pela sessão associada a este pagamento
        // Você pode passar o sessionId como reference_id no Mercado Pago
        // Ou usar outro método para rastrear

        // Para este exemplo, vamos confirmar usando um parâmetro custom
        if (data?.status === 'approved') {
            const sessionId = data?.external_reference;
            if (sessionId) {
                payments[sessionId] = true;
                savePayments(payments);
                console.log('Pagamento confirmado para sessão:', sessionId);
            }
        }
    }

    // Responde ao Mercado Pago
    res.status(200).json({ status: 'received' });
});

// Rota: Simular confirmação de pagamento (para testes)
app.post('/api/test-payment/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const payments = readPayments();
    payments[sessionId] = true;
    savePayments(payments);
    res.json({ success: true, message: 'Pagamento simulado confirmado' });
});

// Rota raiz para servir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'analisador_energia.html'));
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`📍 Webhook URL: http://seu-dominio.com/api/webhook/mercadopago`);
    console.log(`⚙️ Configure este URL nas configurações do Mercado Pago`);
});