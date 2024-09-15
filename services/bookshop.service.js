'use strict'
const BOOKSHOP_KEY = 'bookshop'

var gBooks = []
_createBooks()

function getBooks(options = {}) {
    const filterBy = options.filterBy
    const sortBy = options.sortBy
    const page = options.page

    var books = _filterBooks(filterBy)
    if(sortBy.sortField === 'title') {
        books.sort((c1, c2) => c1.title.localeCompare(c2.title) * sortBy.sortDir)
    } else if(sortBy.sortField === 'min-rating'){
        books.sort((c1, c2) => (c1.rating - c2.rating) * sortBy.sortDir)
    }

    const startIdx = page.idx * page.size
    // console.log(page.idx, startIdx)
    books = books.slice(startIdx, startIdx + page.size)

    return books
}

function _filterBooks(filterBy) {
    var books = gBooks.slice()
    if(filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regex.test(book.title))
    }
    if(filterBy.rating) {
        books = books.filter(book => book.rating >= filterBy.rating)
    }
    return books
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

function addNewBook(title, price,rating) {
    console.log(rating)
    const newBook = _createNewBook(title, price,rating)
    gBooks.push(newBook)
    _saveBooks()
}

function getBookDetails(bookId) {
    var book = gBooks.find(book => book.id === bookId)
    book = JSON.stringify(book, null, 2)
    return book
}
function searchResult(value) {
    const filterBooks = gBooks.filter(book => {
        return book.title.toLowerCase().includes(value.toLowerCase())
    })
    return filterBooks
}
function getLastPageIdx(filterBy, pageSize) {
    const length = _filterBooks(filterBy).length
    return Math.floor(length / pageSize) 
}

function _createNewBook(title, price,rating) {
    return {
        id: makeid(),
        title,
        price,
        rating,
        imgUrl: 'lori-ipsi.jpg'
    }
}


function _createBooks() {
    gBooks = loadFromStorage(BOOKSHOP_KEY)
    if (gBooks && gBooks.length !== 0) return
    gBooks = []
    gBooks.push(_createNewBook('The adventures of Lori Ipsi', 300,3))
    gBooks.push(_createNewBook('Zobra The Geek', 87,4))
    gBooks.push(_createNewBook('World Atlas', 120,5))
    _saveBooks()
}

function _saveBooks() {
    saveToStorage(BOOKSHOP_KEY, gBooks)
}

