# Como Rodar o Projeto

Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Angular CLI (instalado globalmente via npm install -g @angular/cli)
- Angular v17

# Executar projeto

**1. Copie o projeto**

```
git clone https://github.com/ViniciusSouzaDosReis/mobit-test
cd mobit-test
```

**Instale as dependências:**

```
npm install
```

**3. Rodar a aplicação web**

```
npm run start
```

**4. Rodar a API Mockada**

```
npm run server
```

# Decisões técnicas

## API Mockada

Optei por criar uma API mockada junto com um db.json para simular tanto com muitos dados, gerando eles pela própria API, quanto com dados que mudam junto com o db.json.

## Controle de Estado Global

Utilizei NgRx para gerenciar o estado global da aplicação.

Motivos:

Centralização do estado: Todas as interações do usuário e dados da API são gerenciados em um único lugar.

Desempenho: Reduz a necessidade de propagar dados através de vários componentes, melhorando a eficiência.

## Estrutura do Código

A estrutura do código foi pensada para ser modular e desacoplada, seguindo boas práticas de desenvolvimento:

Serviços Desacoplados: Cada serviço é responsável por uma única funcionalidade (por exemplo, UsersService para usuários, PlansService para planos). Isso facilita a manutenção e a adição de novos recursos.

Componentes Reutilizáveis: Componentes como modais, tabelas e formulários foram criados para serem reutilizados em diferentes partes da aplicação.

Rotas Organizadas: As rotas foram configuradas de forma modular, utilizando lazy loading para carregar apenas os módulos necessários.

## Formulários Reativos

Validações complexas e personalizadas (como validação de CPF e telefone).

Controle total sobre o estado do formulário (pristine, touched, valid, etc.).

### Estrutura do Código

A estrutura do projeto foi organizada da seguinte forma:

```
src/
├── app/
│   ├── core/                # Serviços, interceptors, guards, etc.
│   ├── features/            # Funcionalidades principais
│   │   ├── exemplo/         # Funcionalidade de exemplo
│   │   │   ├── components/  # Componentes daquela funcionalidade
│   │   │   ├── services/    # Serviços daquela funcionalidade
│   │   │   ├── state/       # Gerenciamento de estado daquela funcionalidade
│   │   │   ├── exemplo.component.ts
│   │   │   ├── exemplo.component.html
│   │   │   ├── exemplo.spec.html
│   │   │   └── exemplo.routes.ts
│   ├── shared/              # Componentes compartilhados, diretivas, pipes, etc.
│   │   ├── components/      # Componentes reutilizáveis
│   │   └── constants/       # Constantes globais
│   ├── app.routes.ts        # Configuração das rotas principais
│   ├── app.component.ts     # Componente principal
│   └── app.config.ts        # Configuração da aplicação (substitui app.module.ts em standalone)
├── assets/                  # Arquivos estáticos (imagens, fonts, etc.)
└── styles.css               # Estilos globais
```
