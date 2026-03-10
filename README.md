# Desafio QA Beedoo 2026

## Objetivo da aplicação

A aplicação tem como objetivo permitir o cadastro e a listagem de cursos, possibilitando ao usuário informar dados como nome, descrição, instrutor, imagem de capa, datas, quantidade de vagas e tipo de curso.

De acordo com o tipo selecionado, o sistema apresenta campos específicos:

* Curso online: `Link de inscrição`
* Curso presencial: `Endereço`

A página principal também permite visualizar os cursos cadastrados e acionar a exclusão de um curso.

## Principais fluxos disponíveis

Os principais fluxos identificados na aplicação são:

1. Cadastro de curso online
2. Cadastro de curso presencial
3. Listagem de cursos cadastrados
4. Exibição das informações do card do curso
5. Persistência dos cursos cadastrados na listagem
6. Exclusão de curso pela listagem

## Pontos mais críticos para teste

Os pontos mais críticos do sistema, considerando risco funcional e impacto ao usuário, são:

1. Validação dos campos obrigatórios no cadastro
2. Regras condicionais por tipo de curso
3. Consistência entre data de início e data de fim
4. Validação da quantidade de vagas
5. Persistência dos dados cadastrados
6. Integridade da listagem após cadastro e exclusão
7. Confiabilidade da exclusão de cursos

## Estratégia de testes

A estratégia de testes foi dividida em:

1. Testes de cadastro de cursos
2. Testes de listagem de cursos
3. Testes negativos
4. Validações de campos
5. Comportamentos inesperados
6. Registro formal de bugs encontrados

## Casos de teste

Os cenários e casos de teste foram documentados na planilha abaixo:

https://docs.google.com/spreadsheets/d/1AmRd6mzWzRvBNt9d7NKY9YN_Wldk0TSFF17mNjSNK9o/edit?usp=sharing

## Evidências de execução

As evidências da execução dos testes estão disponíveis no link abaixo:

https://drive.google.com/drive/folders/17bVjRDk2liQNIgR84s-QC_3ynQ4aRTi6?usp=sharing

## Testes automatizados implementados

Foram implementados testes automatizados com Cypress para os módulos:

* `cypress/e2e/cadastroCursos.cy.js`
* `cypress/e2e/listagemCursos.cy.js`

### Cobertura atual

Em `cypress/e2e/cadastroCursos.cy.js` foram cobertos:

* Fluxo principal de cadastro online
* Fluxo principal de cadastro presencial
* Cadastro com campos vazios
* Cadastro online sem link de inscrição
* Cadastro presencial sem endereço
* Cadastro com data final menor que data inicial
* Cadastro com número de vagas igual a zero
* Cadastro com número de vagas negativo

Em `cypress/e2e/listagemCursos.cy.js` foram cobertos:

* Exibição da listagem de cursos
* Quantidade de cursos na tela
* Validação das informações do card
* Persistência após reload
* Tela sem cursos cadastrados
* Tentativa de exclusão
* Persistência indevida do curso após exclusão

## Bugs encontrados

Durante os testes foram identificados bugs relevantes, entre eles:

1. Sistema permite cadastro com campos obrigatórios vazios
2. Sistema permite cadastro de curso online sem link de inscrição
3. Sistema permite cadastro de curso presencial sem endereço
4. Sistema permite data final anterior à data inicial
5. Sistema permite número de vagas igual a zero ou negativo
6. Sistema exibe mensagem de exclusão, mas não remove o curso da listagem
7. Sistema não remove o curso do armazenamento após exclusão

## Considerações finais

A aplicação apresenta fluxo funcional básico para cadastro e listagem de cursos, porém foram encontradas falhas importantes de validação e integridade de dados, o que impacta diretamente a confiabilidade do sistema.
