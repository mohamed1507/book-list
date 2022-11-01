// book constructor

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}


// ui constructor
class UI {
    constructor() {
    }
    // add book to list
    addBookToList(book) {
        const list = document.getElementById('book-list')
        const row = document.createElement('tr')
        // insert cols
        row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
`
        list.appendChild(row)
    }
    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
    // show alert
    showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)
        setTimeout(function () {
            document.querySelector('.alert').remove()
        }, 3000)

    }
    // delete from list
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()

        }
    }
}

class Store {
    static getBooks() {
        let books
        if (localStorage.getItem('books') === null) {
            books = []

        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBook() {
        const books = Store.getBooks()
        books.forEach(function (book) {
            const ui = new UI()

            ui.addBookToList(book)
        })
        console.log(books)
    }
    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks()
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
        console.log(books)
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBook)



document.getElementById('book-form').addEventListener('submit', function (e) {

    // GET FROM VALUES
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // INSTANTIATE BOOK
    const book = new Book(title, author, isbn)
    // INSTANTIATE UI
    const ui = new UI()
    // validate

    if (title === "" || author === "" || isbn === "") {
        ui.showAlert('please fill in all field', 'error')

    } else {
        ui.addBookToList(book)
        // add to ls
        Store.addBook(book)

        ui.showAlert('book added', 'success')

        // clear form

        ui.clearFields()
    }



    e.preventDefault()

})


// event listener
document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI()
    ui.deleteBook(e.target)
    // remove from ls
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    // show message
    ui.showAlert('Book Removed', 'success')
    e.preventDefault()
})