'use strict'
// var gFilterBy = ''

function init() {
    renderBooks()
}

function renderBooks(filterBooks) {
    const elBooksTable = document.querySelector('.table-body')
    if (filterBooks) var books = filterBooks
    else books = getBooks()
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
    statisticsFooter(books)
}   

function onRemoveBook(ev, idx) {
    ev.stopPropagation()
    removeBook(idx)
    successMessage('the book successfully removed')
    renderBooks()
}

function onUpdateBook(ev, idx) {
    ev.stopPropagation()
    var newPrice = prompt('what is your new price?')
    updatePrice(newPrice, idx)
    successMessage('the book successfully updated')
    renderBooks()
}
function onAddBook() {
    var newBookTitle = prompt('what is new book title?')
    if (!newBookTitle) return
    var newBookPrice = prompt('what is new book price?')
    if (!newBookPrice) return

    addNewBook(newBookTitle, newBookPrice)
    successMessage('the book successfully added')

    renderBooks()

}
function onReadBook(ev, idx) {
    ev.stopPropagation()
    const book = getBookDetails(idx)
    const elModal = document.querySelector('.details-modal')
    const elDetails = elModal.querySelector('pre')
    elDetails.innerText = book
    elModal.showModal()
}
function successMessage(text) {
    const elModal = document.querySelector('.action-dialog')
    const elDetails = elModal.querySelector('pre')
    elDetails.innerText = text
    elModal.showModal()
    setTimeout(() => { elModal.close() }, 2000);
}

const elInput = document.getElementById('bookSearch')
elInput.addEventListener('input', (event) => {
    const inputValue = event.target.value
    if (inputValue === '') {
        renderBooks()
        return
    }
    const filterBooks = searchResult(inputValue)
    if (filterBooks)    renderBooks(filterBooks)
    if(filterBooks.length=== 0) {
        const strHtmls = '<td>no matching books where found...</td>'
        document.querySelector('.table-body').innerHTML = strHtmls
    }
});

function statisticsFooter(books){
    var expensive =0
    var average =0
    var cheap =0
    books.forEach(book => {
        if (book.price>200)expensive++
        else if (book.price>80)average++
        if (book.price<80)cheap++
    });
    document.querySelector('footer').innerText=`we have ${expensive} expensive books, ${average} average books and ${cheap} books`
}