describe('Listagem de cursos', () => {
    const storageKey = '@beedoo-qa-tests/courses'

    const cursosMock = [
        {
            id: 1,
            name: 'Curso de Cypress',
            description: 'Curso completo de testes automatizados com Cypress',
            cover: 'https://picsum.photos/200',
            startDate: '2026-12-10',
            endDate: '2026-12-20',
            numberOfVagas: '30',
            type: { label: 'Online', value: 'online' },
            address: '',
            instructor: 'João Silva',
            url: 'https://www.example.com/inscricao'
        },
        {
            id: 2,
            name: 'Curso presencial',
            description: 'Curso presencial completo',
            cover: 'https://picsum.photos/201',
            startDate: '2026-11-01',
            endDate: '2026-11-15',
            numberOfVagas: '20',
            type: { label: 'Presencial', value: 'presencial' },
            address: 'Rua Exemplo, 123, Cidade, País',
            instructor: 'Maria Souza',
            url: ''
        }
    ]

    const visitarListagemComCursos = (cursos) => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/', {
            onBeforeLoad(win) {
                win.localStorage.setItem(storageKey, JSON.stringify(cursos))
            }
        })
    }

    const visitarListagemSemCursos = () => {
        cy.visit('https://creative-sherbet-a51eac.netlify.app/', {
            onBeforeLoad(win) {
                win.localStorage.removeItem(storageKey)
            }
        })
    }

    //Cenário 1: Listar cursos cadastrados
    it('Deve listar cursos cadastrados', () => {
        visitarListagemComCursos(cursosMock)

        cy.contains('Lista de cursos').should('be.visible')
        cy.contains('Curso de Cypress').should('be.visible')
        cy.contains('Curso presencial').should('be.visible')
        cy.contains('Curso completo de testes automatizados com Cypress').should('be.visible')
        cy.contains('Curso presencial completo').should('be.visible')
    })

    // Cenario 2: Exibir quantidade de cursos na listagem
    it('Deve exibir quantidade de cursos na listagem', () => {
        visitarListagemComCursos(cursosMock)

        cy.get('.my-card').should('have.length', 2)
    })

    // Cenario 3: Exibir informacoes do card do curso
    it('Deve exibir informacoes do card do curso', () => {
        visitarListagemComCursos([cursosMock[0]])

        cy.contains('.my-card', 'Curso de Cypress').should('be.visible')
        cy.contains('.my-card', 'Curso completo de testes automatizados com Cypress').should('be.visible')
        cy.contains('.my-card', 'início: 2026-12-10').should('be.visible')
        cy.contains('.my-card', 'fim: 2026-12-20').should('be.visible')
        cy.contains('.my-card', '30 vagas').should('be.visible')
    })

    // Cenario 4: Manter cursos listados apos recarregar a pagina
    it('Deve manter os cursos listados apos recarregar a pagina', () => {
        visitarListagemComCursos(cursosMock)

        cy.contains('Curso de Cypress').should('be.visible')
        cy.reload()
        cy.contains('Curso de Cypress').should('be.visible')
        cy.contains('Curso presencial').should('be.visible')
    })

    it('Deve exibir a tela de listagem mesmo sem cursos cadastrados', () => {
        visitarListagemSemCursos()

        cy.contains('Lista de cursos').should('be.visible')
        cy.get('.my-card').should('not.exist')
    })

    // Cenario 5: Excluir curso da listagem
    // Bug: sistema exibe mensagem de exclusao, mas nao remove o curso da listagem
    it('Tentar excluir curso da listagem', () => {
        visitarListagemComCursos([cursosMock[0]])

        cy.contains('button', 'Excluir curso').click()

        cy.contains('Curso excluído com sucesso!').should('be.visible')
        cy.contains('Curso de Cypress').should('be.visible')
    })

    // Cenario 6: Verificar se curso permanece salvo apos tentativa de exclusao
    // Bug: exclusao nao remove o curso do localStorage
    it('Curso continua salvo apos tentativa de exclusao', () => {
        visitarListagemComCursos([cursosMock[0]])

        cy.contains('button', 'Excluir curso').click()

        cy.window().then((win) => {
            const cursos = JSON.parse(win.localStorage.getItem(storageKey))
            expect(cursos).to.have.length(1)
            expect(cursos[0].name).to.equal('Curso de Cypress')
        })
    })
})