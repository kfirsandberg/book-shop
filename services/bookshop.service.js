'use strict'
var gBooks = [{
    id: 'bg4J78',
    title: 'The adventures of Lori Ipsi',
    price: 300,
    imgUrl: 'lori-ipsi.jpg'
},{
    id: 'bg4J79',
    title: 'Zobra The Geek',
    price: 87,
    imgUrl: ''
},{
    id: 'bg4J80',
    title: 'World Atlas',
    price: 120,
    imgUrl: ''
},]

function getBooks(filterBy) {      
    if (!filterBy) return gBooks
    return gBooks
}