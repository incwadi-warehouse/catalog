describe('Home', () => {
  it('show home', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/settings/condition')
    cy.url().should('include', '/settings/condition')
  })
})