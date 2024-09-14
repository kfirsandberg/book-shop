'use strict'
const BOOKSHOP_KEY = 'bookshop'

var gBooks = []
_createBooks()

function getBooks(filterBy) {
    // if (!filterBy) return gBooks
    return gBooks
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updatePrice(price, bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = price
    _saveBooks()
}

function addNewBook(title, price) {
    const newBook = _createNewBook(title, price)
    gBooks.push(newBook)
    _saveBooks()
}

function getBookDetails(bookId) {
    var book = gBooks.find(book => book.id === bookId)
    book = JSON.stringify(book, null, 2)
    return book
}
function searchResult(value) {
    const filterBooks =gBooks.filter(book => {
        return book.title.toLowerCase().includes(value.toLowerCase())
    })
    return filterBooks

}

function _createNewBook(title, price) {
    return {
        id: makeid(),
        title,
        price,
        imgUrl: 'lori-ipsi.jpg'
    }
}


function _createBooks() {
    gBooks = loadFromStorage(BOOKSHOP_KEY)
    if (gBooks && gBooks.length !== 0) return
    gBooks = []
    gBooks.push(_createNewBook('The adventures of Lori Ipsi', 300))
    gBooks.push(_createNewBook('Zobra The Geek', 87))
    gBooks.push(_createNewBook('World Atlas', 120))
    _saveBooks()
}

function _saveBooks() {
    saveToStorage(BOOKSHOP_KEY, gBooks)
}

