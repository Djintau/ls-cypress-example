describe('Login', () => {
    it('user can log in with valid credentials', function () {
        cy.visit('/admin/authentication/sa/login')
        cy.login(this.auth['admin'].username, this.auth['admin'].password)
        cy.get('[href="/admin/authentication/sa/logout"]').should('exist')
    })

    it('user can not log in with invalid credentials', function () {
        cy.visit('/admin/authentication/sa/login')
        // user enters wrong password
        cy.login(this.auth['admin'].username, 'wrongpass')
        // check that logout is not available
        cy.get('[href="/admin/authentication/sa/logout"]').should('not.exist')
        // user gets feedback
        cy.get('.alert.alert-danger.alert-dismissible').should('be.visible').and('contain','Incorrect username and/or password!')
    })
})