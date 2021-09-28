class ProductPage
{
    getAllProductNames()
    {
        return cy.get('h4.card-title')
    }

    getAddCartBtn()
    {
        return cy.get('h4.card-title')
    }

    getCheckOutBtn()
    {
        return cy.get('.nav-link.btn.btn-primary')
    }

    finalCheckout()
    {
        return cy.get('.btn.btn-success')
    }

    getCountryInputField()
    {
        return cy.get('#country')
    }

    getCountrySugesstion()
    {
        return cy.get('.suggestions > ul > li > a')
    }

    getCheckbox()
    {
        return cy.get('#checkbox2')
    }

    getSubmitBtn()
    {
        return cy.get('[type="submit"]')
    }

    getAlert()
    {
        return cy.get('.alert')
    }
}

export default ProductPage;