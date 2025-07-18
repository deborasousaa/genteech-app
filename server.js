#!/usr/bin/env node
/**
 * ===================================================================
 * SERVIDOR GENTEECH FRONTEND - NODE.JS HOSTINGER
 * Serve arquivos estáticos e gerencia rotas do frontend
 * ===================================================================
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===================================================================
// MIDDLEWARES DE SEGURANÇA E PERFORMANCE
// ===================================================================

// Helmet para segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", process.env.API_URL || "https://genteech-api-production.up.railway.app"]
        }
    }
}));

// CORS configurado
app.use(cors({
    origin: [
        'https://genteech.com.br',
        'https://www.genteech.com.br',
        'http://localhost:3000'
    ],
    credentials: true
}));

// Compressão GZIP
app.use(compression());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================================================================
// SERVIR ARQUIVOS ESTÁTICOS
// ===================================================================

// Arquivos estáticos (CSS, JS, imagens)
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
    maxAge: '1y', // Cache por 1 ano
    etag: true
}));

// Favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'assets/images/favicon.ico')));

// ===================================================================
// ROTAS DO FRONTEND
// ===================================================================

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// PDIs para gestores
app.get('/pdi-gestor', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pdi-gestor.html'));
});

// PDI detalhado
app.get('/pdi-detalhe/:id?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pdi-detalhe.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

// Treinamentos
app.get('/treinamentos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/treinamentos.html'));
});

// ===================================================================
// API DE CONFIGURAÇÃO (para o frontend)
// ===================================================================

app.get('/api/config', (req, res) => {
    res.json({
        apiUrl: process.env.API_URL || 'https://genteech-api-production.up.railway.app/api',
        environment: process.env.NODE_ENV || 'production',
        version: '1.0.0'
    });
});

// ===================================================================
// HEALTH CHECK
// ===================================================================

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Genteech Frontend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: '1.0.0'
    });
});

// ===================================================================
// TRATAMENTO DE ERROS
// ===================================================================

// 404 - Página não encontrada
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
});

// ===================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ===================================================================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Genteech Frontend rodando na porta ${PORT}`);
    console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'production'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🎯 API Backend: ${process.env.API_URL || 'https://genteech-api-production.up.railway.app/api'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Recebido SIGTERM, encerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Recebido SIGINT, encerrando servidor...');
    process.exit(0);
});

