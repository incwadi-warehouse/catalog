describe('Home', () => {
  it('show home', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/settings/branch')
    cy.url().should('include', '/settings/branch')
  })
})
