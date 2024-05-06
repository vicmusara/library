const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
      <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
    `;
        booksContainer.appendChild(bookCard);
    });
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

const newBookForm = document.getElementById('new-book-form');
const newBookBtn = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => {
    newBookForm.style.display = 'block';
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    newBookForm.style.display = 'none';
    displayBooks();
    bookForm.reset();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const index = e.target.dataset.index;
        removeBook(index);
    }
    if (e.target.classList.contains('toggle-read-btn')) {
        const index = e.target.dataset.index;
        toggleReadStatus(index);
    }
});

// Manually adding  books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);

displayBooks();
