# PGATS — Automação Web com Cypress

Projeto de conclusão de disciplina utilizando a aplicação fictícia [Automation Exercise](https://www.automationexercise.com/).

## Escopo

Automação dos casos de teste solicitados: **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16**.

## Tecnologias

- Node.js e npm
- Cypress
- cypress-mochawesome-reporter
- GitHub Actions

## Pré-requisitos

- Node.js em versão LTS compatível com a versão do Cypress instalada
- npm

## Instalação das dependências

```bash
npm ci
```

## Execução dos testes

Abrir o Cypress em modo interativo:

```bash
npm run cy:open
```

Executar a especificação do trabalho em modo headless:

```bash
npm test
```

## Relatórios e evidências

O reporter Mochawesome está configurado em `cypress.config.js`. A pipeline do GitHub Actions executa a especificação do trabalho e publica os relatórios, as capturas de tela e os vídeos disponíveis como artefatos da execução, inclusive quando ocorrem falhas nos testes.

## Estrutura do projeto

- `cypress/e2e/trabalho-final.cy.js`: cenários automatizados do trabalho.
- `cypress/support/commands.js`: comandos reutilizáveis e fluxos comuns.
- `cypress/support/e2e.js`: configurações globais e registro do reporter.
- `.github/workflows/cypress.yml`: pipeline de CI.

## Observações

- Os cenários que exigem uma conta criam usuários temporários com endereços de e-mail únicos e tentam excluir as contas ao final.
- O site de prática é externo; instabilidades, indisponibilidade ou alterações nos seletores podem afetar a execução.
- Antes da entrega, execute a pipeline e confirme que todos os dez casos passaram. Não considere a suíte aprovada até verificar uma execução real no GitHub Actions.
