console.log("Hello World!\n==========\n");

// PROJECT Section
// Book Class: Represents a book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"></td>
        <td><a href="#" class="btn btn-sm btn-danger
        delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
    }
}
// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(title) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }

    }
// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;

    //Validate
    if (title === "" || author === "") {
        UI.showAlert("Please fill in all fields", "danger");
    } else {

        // Instatiate book
        const book = new Book(title, author);

        // Add Book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        //Show success message
        UI.showAlert("Book Added", "success");

        //Clear fields
        UI.clearFields();
    }
});
// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
   
   //Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    // Show success message
    UI.showAlert("Book Removed", "success");
});
