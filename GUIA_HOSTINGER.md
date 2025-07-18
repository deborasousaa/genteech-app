# 🌐 Guia Completo - Hostinger + Genteech

## 🎯 Estratégia de Deploy

### Arquitetura Otimizada:
- **Frontend**: Hostinger (domínio genteech.com)
- **Backend**: Railway (API gratuita)
- **Banco**: MongoDB Atlas (gratuito)

### Vantagens:
- ✅ Domínio próprio profissional
- ✅ Hospedagem paga = performance superior
- ✅ Painel de controle Hostinger
- ✅ Backend gratuito escalável
- ✅ Banco de dados robusto

---

## 📁 Estrutura para Hostinger

```
public_html/                    # Raiz do seu domínio
├── index.html                  # Página principal
├── pdi-gestor.html            # PDIs para gestores
├── pdi-detalhe.html           # PDI detalhado
├── assets/                    # Recursos
│   ├── css/
│   │   └── style-genteech.css
│   ├── js/
│   │   └── api-config.js      # Configurações da API
│   └── images/
├── admin/                     # Painel administrativo (opcional)
└── .htaccess                  # Configurações do servidor
```

---

## 🔧 Passo 1: Configurar Backend (Railway)

### 1.1 Deploy da API
1. **Criar conta**: https://railway.app/
2. **Conectar GitHub**: Repositório genteech-piloto
3. **Configurar variáveis**:
   ```env
   MONGODB_URI=sua_string_mongodb_atlas
   JWT_SECRET=sua_chave_secreta
   PORT=5000
   FRONTEND_URL=https://genteech.com
   FRONTEND_URL_WWW=https://www.genteech.com
   ```

### 1.2 URL da API
Após deploy, você receberá algo como:
```
https://genteech-api-production.up.railway.app
```

---

## 🗄️ Passo 2: MongoDB Atlas

### 2.1 Configuração Rápida
1. **Criar conta**: https://cloud.mongodb.com/
2. **Cluster gratuito**: M0 Sandbox
3. **Configurar acesso**:
   - Database User: `genteech`
   - Password: (gerar senha segura)
   - Network Access: `0.0.0.0/0` (acesso global)

### 2.2 String de Conexão
```
mongodb+srv://genteech:SUA_SENHA@cluster0.xxxxx.mongodb.net/genteech?retryWrites=true&w=majority
```

---

## 🌐 Passo 3: Configurar Hostinger

### 3.1 Preparar Arquivos
1. **Baixar** arquivos otimizados para Hostinger
2. **Configurar** URLs da API
3. **Testar** localmente

### 3.2 Upload via File Manager
1. **Acessar** painel Hostinger
2. **File Manager** → `public_html/`
3. **Upload** todos os arquivos
4. **Configurar** permissões se necessário

### 3.3 Upload via FTP (Alternativo)
```
Host: ftp.genteech.com
Username: seu_usuario_hostinger
Password: sua_senha_hostinger
Porta: 21
```

---

## ⚙️ Passo 4: Configurações Avançadas

### 4.1 Arquivo .htaccess
```apache
# Redirecionar www para não-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.genteech\.com [NC]
RewriteRule ^(.*)$ https://genteech.com/$1 [L,R=301]

# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Configurar tipos MIME
AddType text/css .css
AddType application/javascript .js

# Cache para recursos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 4.2 Configuração de API
```javascript
// assets/js/api-config.js
const API_CONFIG = {
    BASE_URL: 'https://genteech-api-production.up.railway.app/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Função para fazer requisições
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...API_CONFIG.HEADERS,
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
```

---

## 🧪 Passo 5: Testes

### 5.1 Checklist de Funcionamento
- [ ] Site carrega em genteech.com
- [ ] Redirecionamento www → não-www funciona
- [ ] HTTPS ativo e funcionando
- [ ] API responde corretamente
- [ ] PDIs são carregados
- [ ] Navegação entre páginas funciona
- [ ] Design responsivo no mobile
- [ ] Performance satisfatória

### 5.2 Ferramentas de Teste
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **SSL Test**: https://www.ssllabs.com/ssltest/

---

## 📊 Passo 6: Monitoramento

### 6.1 Analytics
```html
<!-- Google Analytics (opcional) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 6.2 Uptime Monitoring
- **UptimeRobot**: https://uptimerobot.com/ (gratuito)
- **Pingdom**: https://www.pingdom.com/

---

## 🔄 Passo 7: Atualizações Futuras

### 7.1 Workflow de Desenvolvimento
1. **Desenvolver** localmente
2. **Testar** no navegador
3. **Upload** via File Manager/FTP
4. **Verificar** funcionamento
5. **Commit** no GitHub (backup)

### 7.2 Backup Automático
- **GitHub**: Código fonte
- **Hostinger**: Backup automático (verificar plano)
- **MongoDB Atlas**: Backup automático

---

## 🎯 Resultado Final

### URLs Esperadas:
- **Site Principal**: https://genteech.com
- **API Backend**: https://genteech-api-production.up.railway.app
- **GitHub**: https://github.com/deborasousaa/genteech-piloto

### Performance Esperada:
- **Velocidade**: < 3 segundos carregamento
- **Uptime**: 99.9%
- **SSL**: A+ rating
- **Mobile**: 100% responsivo

---

## 🆘 Troubleshooting

### Problemas Comuns:

**1. Site não carrega**
- Verificar DNS do domínio
- Conferir arquivos em public_html/
- Verificar permissões de arquivo

**2. API não responde**
- Verificar URL da API no código
- Conferir CORS no backend
- Testar API diretamente

**3. HTTPS não funciona**
- Ativar SSL no painel Hostinger
- Aguardar propagação (até 24h)
- Verificar .htaccess

**4. Performance lenta**
- Otimizar imagens
- Ativar compressão GZIP
- Usar CDN se necessário

---

## 📞 Próximos Passos

1. **Configurar** MongoDB Atlas ✅
2. **Deploy** backend no Railway ✅
3. **Preparar** arquivos para Hostinger ✅
4. **Upload** no Hostinger ✅
5. **Configurar** domínio ✅
6. **Testes** finais ✅

**🎉 Genteech.com online e profissional!**

