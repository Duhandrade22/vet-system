# Sistema Veterinário - React + TypeScript

Sistema completo de gestão para profissionais veterinários desenvolvido com **React**, **TypeScript**, **Vite** e **CSS puro**.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **React Router DOM** - Navegação SPA
- **Vite** - Build tool e dev server
- **CSS Puro** - Stylesheets modulares com CSS Variables

## 📋 Funcionalidades

### Autenticação

- ✅ Registro de veterinários
- ✅ Login com JWT
- ✅ Rotas protegidas

### Gestão de Tutores

- ✅ Listagem com busca em tempo real
- ✅ Cadastro completo com endereço
- ✅ Edição e exclusão
- ✅ Visualização de detalhes

### Gestão de Animais

- ✅ Cadastro vinculado a tutores
- ✅ Informações de espécie e raça
- ✅ Edição e exclusão

### Prontuários

- ✅ Registro de atendimentos
- ✅ Peso, medicamentos e dosagem
- ✅ Observações detalhadas

## ⚙️ Instalação

### Pré-requisitos

- Node.js 18+
- pnpm (ou npm/yarn)
- Backend rodando (https://github.com/Duhandrade22/vet-system-api)

### Configuração

1. Clone o repositório:

```bash
git clone <seu-repositorio>
cd vet-system
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure a URL da API:

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3000
```

Ou use a API em produção:

```env
VITE_API_URL=https://vet-system-api.onrender.com
```

4. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🔧 Scripts Disponíveis

```bash
pnpm dev        # Inicia o servidor de desenvolvimento
pnpm build      # Cria build de produção
pnpm preview    # Preview do build de produção
```

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes React reutilizáveis
│   ├── Button.tsx
│   ├── Form.tsx
│   ├── Modal.tsx
│   ├── Header.tsx
│   ├── OwnerCard.tsx
│   ├── AnimalCard.tsx
│   ├── RecordCard.tsx
│   ├── LoadingSpinner.tsx
│   └── EmptyState.tsx
├── pages/              # Páginas da aplicação
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── OwnerDetails.tsx
├── services/           # Integração com API
│   ├── api.ts
│   ├── authService.ts
│   ├── ownerService.ts
│   ├── animalService.ts
│   └── recordService.ts
├── types/              # Definições TypeScript
│   ├── User.ts
│   ├── Owner.ts
│   ├── Animal.ts
│   ├── Record.ts
│   └── api.ts
├── utils/              # Utilitários
│   ├── validators.ts
│   ├── formatters.ts
│   └── helpers.ts
├── hooks/              # Custom hooks
│   └── useToast.ts
├── styles/             # CSS modulares
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── ...
├── App.tsx             # Configuração de rotas
├── main.tsx            # Entry point
└── style.css           # Imports CSS
```

## 🛣️ Rotas

- `/login` - Página de login
- `/register` - Página de cadastro
- `/` - Dashboard (lista de tutores)
- `/owners/:id` - Detalhes do tutor e seus animais

## 🔐 Autenticação

O sistema utiliza JWT armazenado no localStorage. Todas as rotas (exceto login e registro) são protegidas com `ProtectedRoute`.

## 🎨 Design System

- **CSS Variables** para temas consistentes
- **BEM Naming** (`.block__element--modifier`)
- **Mobile-first** approach
- **Grid adaptativo** para layouts responsivos
- **Componentes reutilizáveis** em React

## 🌐 API Backend

Este frontend se conecta à API REST disponível em:

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://vet-system-api.onrender.com

Documentação completa: https://github.com/Duhandrade22/vet-system-api

## 📝 Próximos Passos

Para adicionar as páginas de detalhes de animais e prontuários:

- Criar `src/pages/AnimalDetails.tsx`
- Criar `src/pages/RecordDetails.tsx`
- Adicionar rotas no `App.tsx`

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Eduardo Andrade**

- GitHub: [@Duhandrade22](https://github.com/Duhandrade22)

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
