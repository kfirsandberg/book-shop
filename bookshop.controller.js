'use strict'
// var gFilterBy = ''

function init() {
    renderBooks()
}

function renderBooks() {
    const elBooksTable = document.querySelector('.table-body')
    const books = getBooks()
    const strHtmls = books.map(book => `
        <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button >read</button>
                </td>
                <td>
                    <button onclick= "onUpdateBook(this,'${book.id}')">update</button>
                </td>
                <td>
                    <button onclick= "onRemoveBook(this,'${book.id}')" >delete</button>
                </td>
            </tr>
        `)
    elBooksTable.innerHTML = strHtmls.join('')
}

function onRemoveBook(ev,idx){
    removeBook(idx)
    renderBooks()
}

function onUpdateBook(ev,idx){
    var newPrice= prompt('what is your new price?')
    updatePrice(newPrice,idx)
    renderBooks()

}