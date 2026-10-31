describe('Trabalho de Conclusao - Automation Exercise', () => {
  beforeEach(() => {
    cy.openHome();
  });

  it('TC01 - Registrar usuario e excluir a conta', () => {
    cy.createTestUser();
    cy.deleteLoggedInUser();
  });

  it('TC02 - Login com email e senha validos', () => {
    cy.createTestUser();
    cy.get('@testUser').then((user) => {
      cy.contains('a', 'Logout').click();
      cy.loginWithUser(user);
      cy.deleteLoggedInUser();
    });
  });

  it('TC03 - Login com email e senha invalidos', () => {
    cy.openLogin();
    cy.get('[data-qa="login-email"]').type(`invalid.${Date.now()}@example.com`);
    cy.get('[data-qa="login-password"]').type('SenhaIncorreta123!');
    cy.get('[data-qa="login-button"]').click();
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
  });

  it('TC04 - Logout do usuario', () => {
    cy.createTestUser();
    cy.contains('a', 'Logout').click();
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    // Clean up the temporary account by logging in again and deleting it.
    cy.get('@testUser').then((user) => {
      cy.loginWithUser(user);
      cy.deleteLoggedInUser();
    });
  });

  it('TC05 - Impedir cadastro com email ja existente', () => {
    cy.createTestUser();
    cy.get('@testUser').then((user) => {
      cy.contains('a', 'Logout').click();
      cy.openLogin();
      cy.get('[data-qa="signup-name"]').type('Usuario Duplicado');
      cy.get('[data-qa="signup-email"]').type(user.email);
      cy.get('[data-qa="signup-button"]').click();
      cy.contains('p', 'Email Address already exist!').should('be.visible');
      cy.openHome();
      cy.loginWithUser(user);
      cy.deleteLoggedInUser();
    });
  });

  it('TC08 - Exibir todos os produtos e detalhes do primeiro produto', () => {
    cy.contains('a', 'Products').click();
    cy.url().should('include', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    cy.get('.features_items .product-image-wrapper').first().contains('a', 'View Product').click({ force: true });
    cy.url().should('match', /\/product_details\/\d+/);
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible');
      cy.contains('Category:').should('be.visible');
      cy.contains('Rs.').should('be.visible');
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });
  });

  it('TC09 - Buscar produtos pelo nome', () => {
    cy.contains('a', 'Products').click();
    cy.get('#search_product').should('be.visible').type('top');
    cy.get('#submit_search').click();
    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  });

  it('TC10 - Assinar newsletter na pagina inicial', () => {
    cy.scrollTo('bottom');
    cy.contains('h2', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').type(`pgats.${Date.now()}@example.com`);
    cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('TC15 - Realizar pedido com cadastro antes do checkout', () => {
    cy.createTestUser();
    cy.addFirstProductToCart();
    cy.completeCheckoutAndPayment();
    cy.deleteLoggedInUser();
  });

  it('TC16 - Realizar pedido com login antes do checkout', () => {
    // Create a disposable account as test setup, then follow the requested login-before-checkout flow.
    cy.createTestUser();
    cy.get('@testUser').then((user) => {
      cy.contains('a', 'Logout').click();
      cy.loginWithUser(user);
      cy.addFirstProductToCart();
      cy.completeCheckoutAndPayment();
      cy.deleteLoggedInUser();
    });
  });
});
