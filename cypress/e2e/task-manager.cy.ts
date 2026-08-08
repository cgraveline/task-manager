describe('Task manager core flow', () => {
  it('creates a task, moves it, and deletes it', () => {
    cy.visit('/')

    cy.contains('button', 'New task').click()
    cy.get('input[name="title"]').type('Release the board')
    cy.get('textarea[name="description"]').type('Polish the core task flow.')
    cy.contains('button', 'Save task').click()
    cy.get('div[role="dialog"]').should('not.exist')

    cy.contains('section[aria-labelledby="todo-column-title"]', 'Release the board').should('exist')

    cy.contains('[aria-label^="Status for Release the board"]', 'Todo').click()
    cy.contains('li[role="option"]', 'Done').click()

    cy.contains('section[aria-labelledby="done-column-title"]', 'Release the board').should('exist')

    cy.get('[aria-label="Delete Release the board"]').click()
    cy.contains('button', 'Delete task').click()

    cy.contains('Release the board').should('not.exist')
  })
})
