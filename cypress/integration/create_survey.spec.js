describe('Survey creation and editing', function () {
    it('admin can create a survey', function () {
        cy.intercept(
            'POST',
            'https://tpacalat.limesurvey.net/surveyAdministration/insert',
            cy.spy().as('insertRequestSpy')
        ).as('insertRequest')


        cy.visit('/admin/authentication/sa/login')
        cy.login(this.auth['admin'].username, this.auth['admin'].password)
        cy.get('[href="/admin/authentication/sa/logout"]').should('exist')

        // create survey
        cy.get('.panel-body').contains('Create a new survey').click()
        cy.get('#surveyTitle').type('Health survey')
        cy.get('#create-survey-submit').click()
        cy.wait('@insertRequest').then((response) => {
            const url = response.response.body.redirecturl;
            cy.wrap(url.match(/surveyid=([0-9]*)/)[1]).as('surveyId')
        })
        cy.get('@insertRequestSpy').its('callCount').should('equal',1)
        // check feedback
        cy.get('.alert.alert-info.alert-dismissible').should('be.visible').and('contain','Your new survey was created. We also created a first question group and an example question for you.')
        // check that the survey was really created
        cy.get('.navbar-nav').within(()=>{
            cy.get('[href="/surveyAdministration/listsurveys"]').click()
        })
        cy.get('@surveyId').then((id) => {
            cy.contains(id).should('be.visible')
        })

    })
})