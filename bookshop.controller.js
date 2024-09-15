'use strict'
// var gFilterBy = ''

function init() {
    renderBooks()
}

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 },
}

function renderBooks(filterBooks) {
    const elBooksTable = document.querySelector('.table-body')
    var books = getBooks(gQueryOptions)
    const strHtmls = books.map(book => `
        <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>${book.rating}</td>
                <td>
                    <button onclick= "onReadBook(event,'${book.id}')" >read</button>
                    <button onclick= "onUpdateBook(event,'${book.id}')">update</button>
                    <button onclick= "onRemoveBook(event,'${book.id}')" >delete</button>
                </td>
            </tr>
        `)
    elBooksTable.innerHTML = strHtmls.join('')
    if (books.length === 0) {
        const strHtmls = '<td>no matching books where found...</td>'
        document.querySelector('.table-body').innerHTML = strHtmls

    }
    statisticsFooter(books)
    setQueryParams()

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
    var newBookRating = prompt('what is new book rating?')
    if (newBookRating > 6) return
    if (!newBookRating) return
    addNewBook(newBookTitle, newBookPrice, newBookRating)
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

function statisticsFooter(books) {
    var expensive = 0
    var average = 0
    var cheap = 0
    books.forEach(book => {
        if (book.price > 200) expensive++
        else if (book.price > 80) average++
        if (book.price < 80) cheap++
    });
    document.querySelector('footer').innerText = `we have ${expensive} expensive books, ${average} average books and ${cheap} cheap books`
}

function onSetFilterBy() {
    const elBooks = document.querySelector('.filter-by .bookSearch')
    gQueryOptions.filterBy.txt = elBooks.value
    gQueryOptions.page.idx = 0
    renderBooks()
}
function onSetRatingBy() {
    const elRating = document.querySelector('.sort-by .rating-field')
    gQueryOptions.filterBy.rating = elRating.value
    renderBooks()
}


function onSetSortBy() {
    const elSortField = document.querySelector('.sort-by .sort-field')
    const elSortDir = document.querySelector('.sort-by .sort-dir')
    gQueryOptions.sortBy.sortField = elSortField.value
    gQueryOptions.sortBy.sortDir = elSortDir.checked ? -1 : 1
    gQueryOptions.page.idx = 0
    renderBooks()
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('book', gQueryOptions.filterBy.txt)
    queryParams.set('minRanting', gQueryOptions.filterBy.rating)
    if (gQueryOptions.sortBy.sortField) {
        queryParams.set('sortField', gQueryOptions.sortBy.sortField)
        queryParams.set('sortDir', gQueryOptions.sortBy.sortDir)
    }
    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }
    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onNextPage() {
    const lastPageIdx = getLastPageIdx(gQueryOptions.filterBy, gQueryOptions.page.size)
    // console.log(lastPageIdx)
    // console.log(gQueryOptions.page.idx)

    if(gQueryOptions.page.idx < lastPageIdx){
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }
    // console.log(gQueryOptions.page.idx)
// 
    renderBooks()
}