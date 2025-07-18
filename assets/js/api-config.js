/**
 * ===================================================================
 * CONFIGURAÇÃO DA API GENTEECH
 * Gerencia comunicação com backend gratuito
 * ===================================================================
 */

// Configuração da API
let API_CONFIG = {
    BASE_URL: 'https://genteech-api-production.up.railway.app/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Carregar configuração do servidor (se disponível)
async function loadApiConfig() {
    try {
        const response = await fetch('/api/config');
        if (response.ok) {
            const config = await response.json();
            API_CONFIG.BASE_URL = config.apiUrl;
            console.log('✅ Configuração da API carregada:', config);
        }
    } catch (error) {
        console.warn('⚠️ Usando configuração padrão da API:', error.message);
    }
}

// Função principal para requisições à API
async function apiRequest(endpoint, options = {}) {
    try {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        console.log(`🔄 API Request: ${options.method || 'GET'} ${url}`);
        
        const response = await fetch(url, {
            timeout: API_CONFIG.TIMEOUT,
            ...options,
            headers: {
                ...API_CONFIG.HEADERS,
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ API Response:', data);
        return data;
        
    } catch (error) {
        console.error('❌ API Error:', error);
        
        // Mostrar erro amigável para o usuário
        showApiError(error.message);
        throw error;
    }
}

// Funções específicas da API
const API = {
    // PDIs
    async getPDIs() {
        return await apiRequest('/pdis');
    },
    
    async getPDI(id) {
        return await apiRequest(`/pdis/${id}`);
    },
    
    async createPDI(pdiData) {
        return await apiRequest('/pdis', {
            method: 'POST',
            body: JSON.stringify(pdiData)
        });
    },
    
    async updatePDI(id, pdiData) {
        return await apiRequest(`/pdis/${id}`, {
            method: 'PUT',
            body: JSON.stringify(pdiData)
        });
    },
    
    // Dashboard
    async getDashboard() {
        return await apiRequest('/dashboard');
    },
    
    // Usuários
    async getUsuarios() {
        return await apiRequest('/usuarios');
    },
    
    // Health check
    async healthCheck() {
        return await apiRequest('/health');
    }
};

// Função para mostrar erros de API
function showApiError(message) {
    // Criar toast de erro
    const toast = document.createElement('div');
    toast.className = 'api-error-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">⚠️</span>
            <span class="toast-message">Erro de conexão: ${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Adicionar estilos se não existirem
    if (!document.querySelector('#api-error-styles')) {
        const styles = document.createElement('style');
        styles.id = 'api-error-styles';
        styles.textContent = `
            .api-error-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff4757;
                color: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: auto;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Função para testar conectividade
async function testApiConnection() {
    try {
        console.log('🔍 Testando conexão com API...');
        await API.healthCheck();
        console.log('✅ API conectada com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Falha na conexão com API:', error);
        return false;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Inicializando configuração da API...');
    
    // Carregar configuração
    await loadApiConfig();
    
    // Testar conexão
    await testApiConnection();
    
    console.log('✅ API configurada:', API_CONFIG);
});

// Exportar para uso global
window.API = API;
window.API_CONFIG = API_CONFIG;
window.apiRequest = apiRequest;

