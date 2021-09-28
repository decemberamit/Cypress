// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
import ProductPage from '../support/pageObjects/ProductPage'

Cypress.Commands.add('selectProduct', (productName) => { 
    const productPage = new ProductPage()
    productPage.getAllProductNames().each(($el, index, $list) => {
        if($el.text().includes(productName))
        {
            cy.get('.btn.btn-info').eq(index).click()
        }
    })
 })

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



/// <reference types="Cypress" />

import {tokenCalls} from "../apiCalls/tokenCalls"
import {textHelper} from "./helpers/textHelper"
import {commonMethods} from "../integration/common/commonMethods";


// -- Command to get the cloud token body and add to the fixtures
Cypress.Commands.add('getCloudToken', () => { 
  tokenCalls.getCloudToken()
});

// -- Command to get the Cpm Login token header and add to fixtures
Cypress.Commands.add('getCpmLoginToken', () => {
    tokenCalls.getCpmLoginToken()
});

// -- Command to select text
Cypress.Commands.add("selection", { prevSubject: true }, (subject, fn) => {
  textHelper.selection(subject, fn)
});

// -- Command to select text based on start and end string supplied
Cypress.Commands.add("setSelection", { prevSubject: true }, (subject, query, endQuery) => {
    textHelper.setSelection(subject, query, endQuery)
});

// -- Command to select text based on start and end string and then delete it
Cypress.Commands.add("selectAndDelete", { prevSubject: true }, (subject, startString, endString) => {
    textHelper.selectAndDelete(subject, startString, endString)    
});

// --- Command to select text based on start and end string and then insert text 
Cypress.Commands.add("selectDeleteAndInsert", { prevSubject: true }, (subject, startString, endString) => {
    textHelper.selectDeleteAndInsert(subject, startString, endString)
});

// -- Command to select text based on supplied string and rightclick on the text
Cypress.Commands.add("selectAndRightclick", { prevSubject: true }, (subject, selectString) => {
    textHelper.selectAndRightclick(subject, selectString)
});

Cypress.Commands.add("setCursor", { prevSubject: true }, (subject, query, atStart) => {
    textHelper.setCursorBefore(subject, query, atStart)
});

// -- Command to set cursor at start of text of the element
Cypress.Commands.add("setCursorBefore", { prevSubject: true }, (subject, query) => {
    textHelper.setCursorBefore(subject, query)
});

// -- Command to set cursor at the end of text of the element
Cypress.Commands.add("setCursorAfter", { prevSubject: true }, (subject, query) => {
    textHelper.setCursorAfter(subject, query)
});

// -- Command to highlight text of element
Cypress.Commands.add("highlightText", {prevSubject: true}, (subject) => {
    textHelper.highlightText(subject)
});

// -- Command to get iframe
Cypress.Commands.add('getIframe', (iframe) => {
    commonMethods.getIframe(iframe)
});

// Command to Select Reinstate Line
Cypress.Commands.add("SelectReinstateLine", {prevSubject: true}, (subject) => {
    textHelper.SelectReinstateLine(subject)
});

// Command to Select Reinstate Selection
Cypress.Commands.add("SelectReinstateSelection", {prevSubject: true}, (subject) => {
    textHelper.SelectReinstateSelection(subject)
});


// Command to Select Reinstate Selection
Cypress.Commands.add("SelectInsertLinkToDatafield", {prevSubject: true}, (subject) => {
    textHelper.SelectInsertLinkToDatafield(subject)
});


// Command to Select Reinstate Selection
Cypress.Commands.add("SelectRemoveLinkToDatafield", {prevSubject: true}, (subject) => {
    textHelper.SelectRemoveLinkToDatafield(subject)
});

// -- Command to Insert Datafield
Cypress.Commands.add('InsertDatafield', (iframe) => {
    commonMethods.InsertDatafield(iframe)
});



