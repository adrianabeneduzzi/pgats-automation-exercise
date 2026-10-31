const uniqueId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

Cypress.Commands.add('openHome', () => {
  cy.visit('/');
  cy.get('body').should('be.visible');
  cy.contains('a', 'Home').should('be.visible');
});

Cypress.Commands.add('openLogin', () => {
  cy.contains('a', /Signup \/ Login/i).click();
  cy.contains('h2', 'Login to your account').should('be.visible');
});

Cypress.Commands.add('createTestUser', () => {
  const id = uniqueId();
  const user = {
    name: `PGATS User ${id}`,
    email: `pgats.${id}@example.com`,
    password: `Pgats!${id}`,
    firstName: 'PGATS',
    lastName: 'Automation',
    address: 'Rua dos Testes, 100',
    country: 'Canada',
    state: 'Parana',
    city: 'Curitiba',
    zipcode: '80000000',
    mobile: '41999990000'
  };

  cy.openLogin();
  cy.contains('h2', 'New User Signup!').should('be.visible');
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
  cy.get('[data-qa="signup-button"]').click();
  cy.contains('b', 'Enter Account Information', { matchCase: false }).should('be.visible');
  cy.get('#id_gender1').check({ force: true });
  cy.get('[data-qa="password"]').type(user.password);
  cy.get('[data-qa="days"]').select('10');
  cy.get('[data-qa="months"]').select('5');
  cy.get('[data-qa="years"]').select('1990');
  cy.get('#newsletter').check({ force: true });
  cy.get('#optin').check({ force: true });
  cy.get('[data-qa="first_name"]').type(user.firstName);
  cy.get('[data-qa="last_name"]').type(user.lastName);
  cy.get('[data-qa="address"]').type(user.address);
  cy.get('[data-qa="country"]').select(user.country);
  cy.get('[data-qa="state"]').type(user.state);
  cy.get('[data-qa="city"]').type(user.city);
  cy.get('[data-qa="zipcode"]').type(user.zipcode);
  cy.get('[data-qa="mobile_number"]').type(user.mobile);
  cy.get('[data-qa="create-account"]').click();
  cy.contains('b', 'Account Created!', { matchCase: false }).should('be.visible');
  cy.contains('a', 'Continue').click();
  cy.contains('a', 'Logged in as').should('contain.text', user.name);
  cy.wrap(user).as('testUser');
});

Cypress.Commands.add('loginWithUser', (user) => {
  cy.openLogin();
  cy.get('[data-qa="login-email"]').type(user.email);
  cy.get('[data-qa="login-password"]').type(user.password);
  cy.get('[data-qa="login-button"]').click();
  cy.contains('a', 'Logged in as').should('contain.text', user.name);
});

Cypress.Commands.add('deleteLoggedInUser', () => {
  cy.contains('a', 'Delete Account').click();
  cy.contains('b', 'Account Deleted!', { matchCase: false }).should('be.visible');
  cy.contains('a', 'Continue').click();
});

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.contains('a', 'Products').click();
  cy.url().should('include', '/products');
  cy.get('.features_items .product-image-wrapper').first().within(() => {
    cy.contains('a', 'Add to cart').click({ force: true });
  });
  cy.get('.modal-content').should('be.visible');
  cy.contains('.modal-content a', 'View Cart').click();
  cy.url().should('include', '/view_cart');
  cy.get('#cart_info').should('be.visible');
});

Cypress.Commands.add('completeCheckoutAndPayment', () => {
  cy.contains('a, button', 'Proceed To Checkout').click();
  cy.contains('h2', /Address Details/i).should('be.visible');
  cy.contains('h2', /Review Your Order/i).should('be.visible');
  cy.get('textarea[name="message"]').type('Pedido realizado para validar o fluxo automatizado PGATS.');
  cy.contains('a', 'Place Order').click();
  cy.get('[data-qa="name-on-card"]').type('PGATS Automation');
  cy.get('[data-qa="card-number"]').type('4111111111111111');
  cy.get('[data-qa="cvc"]').type('123');
  cy.get('[data-qa="expiry-month"]').type('12');
  cy.get('[data-qa="expiry-year"]').type('2030');
  cy.get('[data-qa="pay-button"]').click();
  cy.get('body', { timeout: 20000 }).should(($body) => {
    const pageText = $body.text();

    expect(
      pageText,
      'A confirmação do pedido não foi exibida. Conteúdo da página:'
    ).to.match(/Your order has been placed successfully!|Congratulations! Your order has been confirmed!/i);
  });
});
