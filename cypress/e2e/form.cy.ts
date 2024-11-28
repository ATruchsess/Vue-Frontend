describe('Account Creation Form', () => {
  beforeEach(() => {
    // Visit the page containing the form
    cy.visit('http://localhost:5173/form');
  });

  it('Validates form fields and disabled button for invalid inputs', () => {
    // Check that the form renders correctly
    cy.get('form').should('exist');

    // Test empty name field
    cy.get('#formRegisterName').clear();
    cy.get('button[type="submit"]').should('be.disabled');

    // Enter invalid password
    cy.get('#formRegisterPassword').type('short');
    cy.get('#formRegisterConfirmPassword').type('short');

    cy.get('#formRegisterPassword').clear().type('validpassword');
    cy.get('#formRegisterConfirmPassword').clear().type('notmatching');

    // Ensure the submit button is disabled for invalid fields
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Submits the form with valid inputs and shows success message', () => {
    // Fill in valid inputs
    cy.get('#formRegisterName').type('validusername');
    cy.get('#formRegisterPassword').type('validpassword');
    cy.get('#formRegisterConfirmPassword').type('validpassword');

    // Intercept the backend call and mock a successful response
    cy.intercept('POST', '/api/v1/users', {
      statusCode: 200,
      body: { success: true },
    }).as('createUser');

    // Submit the form
    cy.get('#formRegisterSubmitButton').click();

    // Wait for the backend response
    cy.wait('@createUser');

    // Verify success toast
    cy.get('.p-toast').should('contain', 'Account creation successful!');
  });

  it('Handles duplicate username error gracefully', () => {
    // Fill in valid inputs
    cy.get('#formRegisterName').type('duplicateName');
    cy.get('#formRegisterPassword').type('validpassword');
    cy.get('#formRegisterConfirmPassword').type('validpassword');

    // Intercept the backend call and mock a duplicate username error
    cy.intercept('POST', '/api/v1/users', {
      statusCode: 400,
      body: { error: 'Database error while creating user' },
    }).as('createUser');

    // Submit the form
    cy.get('#formRegisterSubmitButton').click();

    // Wait for the backend response
    cy.wait('@createUser');

    // Verify the error message
    cy.get('.error-message').should(
      'contain',
      'This username is already taken. Please try a different one.'
    );
  });

  it('Handles generic submission errors', () => {
    // Fill in valid inputs
    cy.get('#formRegisterName').type('anyusername');
    cy.get('#formRegisterPassword').type('validpassword');
    cy.get('#formRegisterConfirmPassword').type('validpassword');

    // Intercept the backend call and mock a generic error
    cy.intercept('POST', '/api/v1/users', {
      statusCode: 500,
      body: { error: 'Something went wrong' },
    }).as('createUser');

    // Submit the form
    cy.get('#formRegisterSubmitButton').click();

    // Wait for the backend response
    cy.wait('@createUser');

    // Verify the error message
    cy.get('.error-message').should(
      'contain',
      'Submission failed. Please try again later.'
    );
  });
});