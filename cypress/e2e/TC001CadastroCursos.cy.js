describe('Cadastro de cursos', () => {

    //Cenário 1: Cadastro completo de curso online
    it('Cadastro completo de curso online', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso de Cypress')
        cy.get('[aria-label="Descrição do curso"]').type('Curso completo de testes automatizados com Cypress')
        cy.get('[aria-label="Instrutor"]').type('João Silva')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-10')
        cy.get('[aria-label="Data de fim"]').type('2026-12-20')
        cy.get('[aria-label="Número de vagas"]').type('30')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Online').click()
        cy.get('[aria-label="Link de inscrição"]').type('https://www.example.com/inscricao')
        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso de Cypress').should('be.visible')
    })

    //Cenário 2: Cadastro completo de curso presencial
    it('Cadastro completo de curso presencial', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso presencial')
        cy.get('[aria-label="Descrição do curso"]').type('Curso presencial completo')
        cy.get('[aria-label="Instrutor"]').type('João Silva')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-10')
        cy.get('[aria-label="Data de fim"]').type('2026-12-20')
        cy.get('[aria-label="Número de vagas"]').type('30')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Presencial').click()
        cy.get('[aria-label="Endereço"]').type('Rua Exemplo, 123, Cidade, País')
        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso presencial').should('be.visible')
    })

    //Cenário 3: Tentar cadastrar curso com campos vazios
    // Bug: sistema permite cadastro de curso com campos obrigatorios vazios
    it('Tentar cadastrar curso com campos vazios', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso cadastrado com sucesso!').should('be.visible')
    })

    //Cenário 4: Cadastrar curso online sem link de inscrição
    // Bug: sistema permite cadastro de curso online sem link de inscricao
    it('Cadastrar curso online sem link de inscrição', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso sem link')
        cy.get('[aria-label="Descrição do curso"]').type('Teste sem link de inscrição')
        cy.get('[aria-label="Instrutor"]').type('Maria Souza')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-10')
        cy.get('[aria-label="Data de fim"]').type('2026-12-20')
        cy.get('[aria-label="Número de vagas"]').type('20')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Online').click()

        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso cadastrado com sucesso!').should('be.visible')
    })

    //Cenário 5: Cadastrar curso presencial sem endereço
    // Bug: sistema permite cadastro de curso presencial sem endereco
    it('Cadastrar curso presencial sem endereço', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso sem endereço')
        cy.get('[aria-label="Descrição do curso"]').type('Teste sem endereço')
        cy.get('[aria-label="Instrutor"]').type('Carlos Lima')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-10')
        cy.get('[aria-label="Data de fim"]').type('2026-12-20')
        cy.get('[aria-label="Número de vagas"]').type('15')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Presencial').click()

        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso cadastrado com sucesso!').should('be.visible')
    })

    //Cenário 6: Cadastrar curso com data final menor que data inicial
    // Bug: sistema permite cadastro com data final anterior a data inicial
    it('Cadastrar curso com data final menor que data inicial', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso com datas inválidas')
        cy.get('[aria-label="Descrição do curso"]').type('Teste de datas inconsistentes')
        cy.get('[aria-label="Instrutor"]').type('Ana Costa')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-20')
        cy.get('[aria-label="Data de fim"]').type('2026-12-10')
        cy.get('[aria-label="Número de vagas"]').type('25')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Online').click()
        cy.get('[aria-label="Link de inscrição"]').type('https://www.example.com/inscricao')

        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso cadastrado com sucesso!').should('be.visible')
    })

    // Cenário 7: Cadastrar curso com número de vagas zero ou negativo
    // Bug: sistema permite numero de vagas igual a zero ou negativo
    it('Cadastrar curso com número de vagas zero', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso com zero vagas')
        cy.get('[aria-label="Descrição do curso"]').type('Teste de vagas zeradas')
        cy.get('[aria-label="Instrutor"]').type('Pedro Alves')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-10')
        cy.get('[aria-label="Data de fim"]').type('2026-12-20')
        cy.get('[aria-label="Número de vagas"]').type('0')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Online').click()
        cy.get('[aria-label="Link de inscrição"]').type('https://www.example.com/inscricao')

        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso cadastrado com sucesso!').should('be.visible')
    })

    //Cenário 8: Cadastrar curso com número de vagas negativo
    it('Cadastrar curso com número de vagas negativo', () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/')
        cy.get('[href="/new-course"] > .q-btn__content > .block').click()

        cy.get('[aria-label="Nome do curso"]').type('Curso com vagas negativas')
        cy.get('[aria-label="Descrição do curso"]').type('Teste de vagas negativas')
        cy.get('[aria-label="Instrutor"]').type('Fernanda Rocha')
        cy.get('[aria-label="Url da imagem de capa"]').type('https://picsum.photos/200')
        cy.get('[aria-label="Data de início"]').type('2026-12-10')
        cy.get('[aria-label="Data de fim"]').type('2026-12-20')
        cy.get('[aria-label="Número de vagas"]').type('-5')
        cy.get('[aria-label="Tipo de curso"]').click()
        cy.contains('Online').click()
        cy.get('[aria-label="Link de inscrição"]').type('https://www.example.com/inscricao')

        cy.contains('button', 'Cadastrar curso').click()

        cy.contains('Curso cadastrado com sucesso!').should('be.visible')
    })
})