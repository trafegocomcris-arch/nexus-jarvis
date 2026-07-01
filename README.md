# NEXUS — Deploy na Vercel

## Deploy em 3 passos

### 1. Instala o Vercel CLI
```bash
npm install -g vercel
```

### 2. Na pasta nexus-deploy, faz login e deploya
```bash
cd nexus-deploy
vercel login
vercel --prod
```

### 3. Pronto
A Vercel vai te dar uma URL tipo:
```
https://nexus-act-digital.vercel.app
```

---

## Instalar como app na Dock (PWA)

Depois do deploy:

1. Abre a URL no Chrome
2. Na barra de endereço, clica no ícone de **instalar** (➕ ou ⬇️ no canto direito)
3. Clica em **Instalar**
4. NEXUS aparece na Dock igual um app nativo

No Mac também funciona via:
- Chrome → menu ⋮ → **Salvar e compartilhar** → **Instalar como app**

---

## Domínio personalizado (opcional)

No painel da Vercel:
1. Settings → Domains
2. Adiciona `nexus.seudominio.com.br`
3. Aponta o DNS conforme instruções

---

## Estrutura
```
nexus-deploy/
├── vercel.json       ← configuração Vercel
└── public/
    ├── index.html    ← NEXUS JARVIS Interface
    ├── manifest.json ← config PWA
    ├── sw.js         ← service worker (offline)
    ├── icon-192.png  ← ícone app
    └── icon-512.png  ← ícone app HD
```
