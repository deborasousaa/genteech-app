# 🚀 Guia Deploy Node.js - Hostinger + Genteech

## 🎯 Arquitetura Final

```
┌─────────────────────────────────────────────────────────────┐
│                    GENTEECH.COM.BR                          │
│                 (Hostinger Node.js)                         │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Frontend      │    │   Site          │                │
│  │   (Express.js)  │    │   Institucional │                │
│  │                 │    │   (HTML/CSS)    │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              API BACKEND (Railway/Render)                   │
│                     GRATUITO                                │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Flask API     │    │   MongoDB       │                │
│  │   (Python)      │    │   Atlas         │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Pré-requisitos

### No Hostinger:
- ✅ Plano Business ou superior (Node.js habilitado)
- ✅ Domínio genteech.com.br configurado
- ✅ Acesso ao painel de controle

### Localmente:
- ✅ Node.js 18+ instalado
- ✅ VS Code ou editor de código
- ✅ Git configurado

---

## 🔧 Passo 1: Preparação Local

### 1.1 Estrutura do Projeto
```
genteech-hostinger/
├── server.js              # Servidor Express
├── package.json           # Dependências
├── .env.example           # Configurações
├── views/                 # Páginas HTML
│   ├── index.html
│   ├── pdi-gestor.html
│   └── pdi-detalhe.html
├── assets/                # Recursos estáticos
│   ├── css/
│   │   └── style-genteech.css
│   ├── js/
│   │   └── api-config.js
│   └── images/
└── README.md
```

### 1.2 Configurar Ambiente
```bash
# 1. Extrair arquivos
# 2. Abrir no VS Code
code genteech-hostinger

# 3. Instalar dependências
npm install

# 4. Configurar variáveis
cp .env.example .env
# Editar .env com suas configurações

# 5. Testar localmente
npm run dev
```

---

## 🌐 Passo 2: Deploy no Hostinger

### 2.1 Configurar Node.js no Painel
1. **Login** no painel Hostinger
2. **Websites** → Seu domínio
3. **Advanced** → **Node.js**
4. **Create Application**:
   - **Node.js Version**: 18.x ou superior
   - **Application Root**: `/public_html/app`
   - **Application URL**: genteech.com.br
   - **Application Startup File**: `server.js`

### 2.2 Upload dos Arquivos
**Opção A: File Manager**
1. **File Manager** → `/public_html/app/`
2. **Upload** todos os arquivos do projeto
3. **Extract** se necessário

**Opção B: Git (Recomendado)**
```bash
# No terminal do Hostinger
cd /public_html/app
git clone https://github.com/deborasousaa/genteech-piloto.git .
```

### 2.3 Instalar Dependências
```bash
# No terminal do Hostinger
cd /public_html/app
npm install --production
```

### 2.4 Configurar Variáveis
```bash
# Criar arquivo .env
nano .env

# Adicionar configurações:
PORT=3000
NODE_ENV=production
API_URL=https://genteech-api-production.up.railway.app/api
DOMAIN=genteech.com.br
```

---

## 🔄 Passo 3: Configurar Backend (Railway)

### 3.1 Deploy da API
1. **Criar conta**: https://railway.app/
2. **New Project** → **Deploy from GitHub**
3. **Selecionar**: repositório com backend Python
4. **Configurar variáveis**:
   ```env
   MONGODB_URI=sua_string_mongodb_atlas
   JWT_SECRET=sua_chave_secreta
   PORT=5000
   FRONTEND_URL=https://genteech.com.br
   ```

### 3.2 Obter URL da API
Após deploy, você receberá:
```
https://genteech-api-production.up.railway.app
```

### 3.3 Atualizar Frontend
```bash
# Atualizar .env no Hostinger
API_URL=https://genteech-api-production.up.railway.app/api
```

---

## 🗄️ Passo 4: MongoDB Atlas

### 4.1 Configuração
1. **Criar conta**: https://cloud.mongodb.com/
2. **Create Cluster** → **M0 FREE**
3. **Database Access**:
   - Username: `genteech`
   - Password: (gerar senha segura)
4. **Network Access**: `0.0.0.0/0`

### 4.2 String de Conexão
```
mongodb+srv://genteech:SUA_SENHA@cluster0.xxxxx.mongodb.net/genteech?retryWrites=true&w=majority
```

---

## ⚙️ Passo 5: Configurações Avançadas

### 5.1 Subdomínios (Opcional)
No painel Hostinger:
- **app.genteech.com.br** → Aplicação principal
- **api.genteech.com.br** → Proxy para Railway
- **www.genteech.com.br** → Redirect para principal

### 5.2 SSL/HTTPS
1. **SSL/TLS** no painel Hostinger
2. **Force HTTPS**: Ativado
3. **Aguardar** propagação (até 24h)

### 5.3 E-mails Profissionais
1. **Email** → **Email Accounts**
2. **Criar**:
   - `contato@genteech.com.br`
   - `noreply@genteech.com.br`
   - `seu.nome@genteech.com.br`

---

## 🧪 Passo 6: Testes

### 6.1 Checklist de Funcionamento
- [ ] Site carrega em https://genteech.com.br
- [ ] Node.js está rodando (verificar logs)
- [ ] API responde corretamente
- [ ] PDIs são carregados
- [ ] Navegação funciona
- [ ] Design responsivo
- [ ] HTTPS ativo

### 6.2 Comandos de Debug
```bash
# Logs do Node.js
tail -f /public_html/app/logs/app.log

# Status da aplicação
pm2 status

# Reiniciar aplicação
pm2 restart app
```

---

## 📊 Passo 7: Monitoramento

### 7.1 Logs e Debugging
```javascript
// Adicionar ao server.js
console.log('🚀 Servidor iniciado:', new Date());
console.log('📊 Memória:', process.memoryUsage());
console.log('🌐 URL da API:', process.env.API_URL);
```

### 7.2 Health Checks
- **Frontend**: https://genteech.com.br/health
- **Backend**: https://genteech-api-production.up.railway.app/api/health

---

## 🔄 Passo 8: Atualizações

### 8.1 Workflow de Deploy
```bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar mudanças
# 3. Commit no GitHub
git add .
git commit -m "✨ Nova funcionalidade"
git push

# 4. Atualizar no Hostinger
cd /public_html/app
git pull origin main
npm install
pm2 restart app
```

### 8.2 Backup
- **Código**: GitHub (automático)
- **Banco**: MongoDB Atlas (automático)
- **Hostinger**: Backup diário (plano Business)

---

## 🆘 Troubleshooting

### Problemas Comuns:

**1. Aplicação não inicia**
```bash
# Verificar logs
cat /public_html/app/logs/error.log

# Verificar dependências
npm install

# Verificar Node.js version
node --version
```

**2. API não responde**
```bash
# Testar API diretamente
curl https://genteech-api-production.up.railway.app/api/health

# Verificar CORS
# Verificar variáveis de ambiente
```

**3. Erro 502/503**
```bash
# Reiniciar aplicação
pm2 restart app

# Verificar porta
netstat -tulpn | grep :3000
```

---

## 📞 Resultado Final

### URLs Funcionais:
- **Site**: https://genteech.com.br
- **Health**: https://genteech.com.br/health
- **API**: https://genteech-api-production.up.railway.app
- **GitHub**: https://github.com/deborasousaa/genteech-piloto

### Performance Esperada:
- **Uptime**: 99.9%
- **Velocidade**: < 2 segundos
- **SSL**: A+ rating
- **Mobile**: 100% responsivo

---

## 🎯 Próximos Passos

1. **Deploy Backend** no Railway ✅
2. **Configurar MongoDB** Atlas ✅
3. **Upload Frontend** no Hostinger ✅
4. **Configurar domínio** e SSL ✅
5. **Testes finais** ✅
6. **E-mails profissionais** ✅

**🎉 Genteech.com.br online e profissional!**

---

**💡 Dica**: Mantenha sempre um backup local e teste as mudanças em ambiente de desenvolvimento antes do deploy!

