let myLibrary = [];
//book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return title + " by " + author + ", " + pages + "pages" + ", " + read;
  };
}
// creates book from book constructor and adds to library
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  displayBook();
}
const container = document.getElementById("container");
// creates card to insert in container
function createCards(book) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  const title = document.createElement("div");
  title.className = "title";
  const author = document.createElement("div");
  author.className = "author";
  const pages = document.createElement("div");
  pages.className = "pages";
  const read = document.createElement("div");
  read.className = "read";
  container.append(cardDiv);
  cardDiv.append(title);
  cardDiv.append(author);
  cardDiv.append(pages);
  cardDiv.append(read);
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.isRead;
}
// function to display books from library
function displayBook() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    createCards(book);
  });
}
const modal = document.querySelector(".modal");
const overlay = document.querySelector("#overlay");
const addBookButton = document.getElementById("addbook");
// event listener for add book button
addBookButton.addEventListener("click", () => {
  modal.classList.add("active");
  overlay.classList.add("active");
});
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
