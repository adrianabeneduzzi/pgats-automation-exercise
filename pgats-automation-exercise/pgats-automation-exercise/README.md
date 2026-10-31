# PGATS - Automacao Web com Cypress

Projeto de conclusao de disciplina usando a aplicacao ficticia [Automation Exercise](https://www.automationexercise.com/).

## Escopo

Automacao dos casos solicitados: **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16**.

## Tecnologias

- Node.js e npm
- Cypress
- cypress-mochawesome-reporter
- GitHub Actions

## Pre-requisitos

- Node.js em versao LTS compativel com a versao do Cypress instalada
- npm

## Instalar dependencias

```bash
npm ci
```

## Executar os testes

Abrir o Cypress em modo interativo:

```bash
npm run cy:open
```

Executar o spec do trabalho em modo headless:

```bash
npm test
```

## Relatorios e evidencias

O reporter Mochawesome esta configurado em `cypress.config.js`. A pipeline do GitHub Actions executa o spec do trabalho e publica os relatorios, screenshots e videos disponiveis como artefato da execucao, mesmo quando os testes falham.

## Estrutura

- `cypress/e2e/trabalho-final.cy.js`: cenarios automatizados do trabalho
- `cypress/support/commands.js`: comandos reutilizaveis e fluxos comuns
- `cypress/support/e2e.js`: configuracao global e registro do reporter
- `.github/workflows/cypress.yml`: pipeline de CI

## Observacoes

- Os cenarios que precisam de conta criam usuarios temporarios com e-mails unicos e tentam excluir as contas ao final.
- O site de pratica e externo; instabilidades, indisponibilidade ou mudancas de seletores podem afetar a execucao.
- Antes da entrega, execute a pipeline e confirme que todos os dez casos passaram. Nao considere a suite aprovada ate verificar uma execucao real no GitHub Actions.
