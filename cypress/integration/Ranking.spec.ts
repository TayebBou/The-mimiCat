/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />

describe('Ranking page', () => {
  before(() => {
    cy.intercept('**/cats.json').as('getCats');
    cy.visit('http://localhost:3000/ranking');
  });

  it('the top 3 cats are displayed and in order', () => {
    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait('@getCats');

    let previousPerc = Infinity;
    for (let i = 1; i <= 3; i++) {
      cy.get(`img[alt="cat number ${i}"]`)
        .should('exist')
        .siblings('div')
        .first()
        .invoke('text')
        // eslint-disable-next-line no-loop-func
        .then((text: string) => {
          expect(text).contains('%');
          const perc = Number(text.replace('%', ''));
          expect(perc <= previousPerc).to.be.true;
          previousPerc = perc;
        });
    }
  });
});
