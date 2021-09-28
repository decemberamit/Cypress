/// <reference types="cypress"/>

class TextHelper{
    
    selection(subject, fn)
    {
        cy.wrap(subject)
        .trigger("mousedown")
        .then(fn)
        .trigger("mouseup")

    cy.document().trigger("selectionchange")
    return cy.wrap(subject)
    }


    setSelection(subject, query, endQuery)
    {
        return cy.wrap(subject).selection($el => {
            const el = $el[0]
            if (this.isInputOrTextArea(el)) {
              const text = $el.text()
              const start = text.indexOf(query)
              const end = endQuery
                ? text.indexOf(endQuery) + endQuery.length
                : start + query.length
      
              $el[0].setSelectionRange(start, end)
            } else if (typeof query === "string") {
              const anchorNode = this.getTextNode(el, query)
              const focusNode = endQuery ? this.getTextNode(el, endQuery) : anchorNode
              const anchorOffset = anchorNode.wholeText.indexOf(query)
              const focusOffset = endQuery
                ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
                : anchorOffset + query.length
              this.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)
            } else if (typeof query === "object") {
              const anchorNode = this.getTextNode(el.querySelector(query.anchorQuery))
              const anchorOffset = query.anchorOffset || 0
              const focusNode = query.focusQuery
                ? this.getTextNode(el.querySelector(query.focusQuery))
                : anchorNode
              const focusOffset = query.focusOffset || 0
              this.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)
            }
          })        
    }

    selectAndDelete(subject, startString, endString)
    {        
        return cy.wrap(subject)
            .setSelection(startString, endString)
            .wait(1000)
            .trigger('keydown', { keyCode: 46}, {force: true})
            .wait(500)
            .trigger('keyup', { keyCode: 46}, {force: true})
    }

    selectDeleteAndInsert(subject, startString, endString)
    {
        // need to find a solution to remove deletion and just insert the text
      return cy.wrap(subject)
          .setSelection(startString, endString)
          .wait(1000)
          .trigger('keydown', { keyCode: 46}, {force: true})
          .wait(500)
          .trigger('keyup', { keyCode: 46}, {force: true})
          .wait(1000)
          .type('Inserted New Text ', {force:true})
          .should('contain.text','Inserted New Text')
         
    }
      
    selectAndRightclick(subject, selectString)
    {
        return cy.wrap(subject).setSelection('receive')
          .wait(500)
          .rightclick()
    }
          
      // Low level command reused by `setCursorBefore` and `setCursorAfter`, equal to `setCursorAfter`
    setCursor(subject, query, atStart)
    {          
        return cy.wrap(subject).selection($el => {
        const el = $el[0]
        if (this.isInputOrTextArea(el))
        {
            const text = $el.text()
            const position = text.indexOf(query) + (atStart ? 0 : query.length)
            $el[0].setSelectionRange(position, position)
        }
        else
        {
            const node = this.getTextNode(el, query)
            const offset =
            node.wholeText.indexOf(query) + (atStart ? 0 : query.length)
            const document = node.ownerDocument
            document.getSelection().removeAllRanges()
            document.getSelection().collapse(node, offset)
        }
        })
          // Depending on what you're testing, you may need to chain a `.click()` here to ensure
          // further commands are picked up by whatever you're testing.
    }
      
    setCursorBefore(subject, query)
    {
        cy.wrap(subject).setCursor(query, true)
    }
          
    setCursorAfter(subject, query)
    {
        cy.wrap(subject).setCursor(query)
    }
      
    highlightText(subject)
    {
        return cy.wrap(subject).trigger('mousedown')
            .then(($el) => {
            const el = $el[0]
            const document = el.ownerDocument
            const range = document.createRange()
            range.selectNodeContents(el)
            document.getSelection().removeAllRanges(range)
            document.getSelection().addRange(range)
        })
    }

    SelectReinstateLine(subject){
        cy.getIframe('.cke_panel_frame')
            .find('.cke_menuitem > [title="Reinstate Line"]').should('contain.text','Reinstate Line')
            .click()
    }

    SelectReinstateSelection(subject){
        cy.getIframe('.cke_panel_frame')
            .find('.cke_menuitem > [title="Reinstate Selection"]')
            .should('contain.text','Reinstate Selection')
            .click({force: true})
           // .wait(1000)
    }

    SelectInsertLinkToDatafield(subject){
        cy.getIframe('.cke_panel_frame')
            .find('.cke_menuitem > [title="Insert Link To Datafield"]')
            .should('contain.text','Insert Link To Datafield')
            .click({force: true})
          //  .wait(1000)
    }

    SelectRemoveLinkToDatafield(subject){
        cy.getIframe('.cke_panel_frame')
            .find('.cke_menuitem > [title="Remove Link To Datafield"]')
            .should('contain.text','Remove Link To Datafield')
            .click({force: true})
        //    .wait(1000)
    }
         
    // Helper functions
    getTextNode(el, match) 
    {
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false)
        if (!match) {
          return walk.nextNode()
        }
      
        let node
        while ((node = walk.nextNode())) {
          if (node.wholeText.includes(match)) {
            return node
          }
        }
    }
      
    setBaseAndExtent(...args) 
    {
        const node = args[0]
        const document = node.ownerDocument
        const selection = document.getSelection()
        selection.setBaseAndExtent(...args)
    }
      
    isInputOrTextArea(el)
    {
        return (
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el.nodeName === "TEXTAREA" ||
          el.nodeName === "INPUT"
        )
    }
    

}

export const textHelper = new TextHelper()
