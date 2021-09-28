class HomePage
{
    getName()
    {
        return cy.get('[name="name"]:nth-child(2)')
    }

    getGender()
    {
        return cy.get('#exampleFormControlSelect1')
    }

    getTwoWayName()
    {
        return cy.get('[name="name"]:nth-child(2)')
    }

    getEntrepreneur()
    {
        return cy.get('#inlineRadio3')
    }

    getShopTab()
    {
        return cy.contains('Shop')
    }

    getHomeTab()
    {
        return cy.contains('Home')
    }

}

export default HomePage;