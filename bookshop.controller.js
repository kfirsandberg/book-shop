'use strict'
var gFilterBy = ''

function init() {
    renderBooks()
}

function renderBooks() {
    const elBooksTable = document.querySelector('.table-body')
    const books = getBooks(gFilterBy)
    console.log(books)
    console.log(books)
    const strHtmls = books.map(book => `
        <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button>read</button>
                </td>
                <td>
                    <button>update</button>
                </td>
                <td>
                    <button>delete</button>
                </td>
            </tr>
        `)

    elBooksTable.innerHTML = strHtmls.join('')


}
