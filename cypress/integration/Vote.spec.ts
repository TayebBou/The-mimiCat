/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />

describe('Vote page', () => {
    before(() => {
      cy.intercept('**/cats.json').as('getCats');
      cy.visit('http://localhost:3000/vote');
    });
  
    it('there are two choices on the page', () => {
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait('@getCats');
  
      cy.get('img[alt="left cat"]').should('exist');
      cy.get('img[alt="right cat"]').should('exist');
    });
  
    it('user can vote', async () => {
      let oldSrc = '';
  
      cy.get('img[alt="left cat"]')
        .invoke('attr', 'src')
        .then((src) => {
          oldSrc = src;
          cy.get('img[alt="left cat"]')
            .click()
            .wait(1000)
            .invoke('attr', 'src')
            .should('not.eq', oldSrc);
        });
    });
  });