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
                    <button onclick= "onReadBook(event,'${book.id}')" >read</button>
                    <button onclick= "onUpdateBook(event,'${book.id}')">update</button>
                    <button onclick= "onRemoveBook(event,'${book.id}')" >delete</button>
            </tr>
        `)
    elBooksTable.innerHTML = strHtmls.join('')
}

function onRemoveBook(ev, idx) {
    removeBook(idx)
    renderBooks()
}

function onUpdateBook(ev, idx) {
    var newPrice = prompt('what is your new price?')
    updatePrice(newPrice, idx)
    renderBooks()
}
function onAddBook(){
    var newBookTitle = prompt('what is new book title?')
    var newBookPrice = prompt('what is new book price?')
    addNewBook(newBookTitle,newBookPrice)
    renderBooks()

}
function onReadBook(ev,idx){
    ev.stopPropagation()
    const book = getBookDetails(idx)
    const elModal = document.querySelector('.details-modal')
    const elDetails = elModal.querySelector('pre')
    elDetails.innerText = book
    elModal.showModal()


}