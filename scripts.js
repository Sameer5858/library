let myLibrary = [];
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return title + " by " + author + ", " + pages + "pages" + ", " + read;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

const card = document.getElementById("cards-container");
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
  card.append(cardDiv);
  cardDiv.append(title);
  cardDiv.append(author);
  cardDiv.append(pages);
  cardDiv.append(read);
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.isRead;
}
function displayBook() {
  card.innerHTML = "";
  myLibrary.forEach((book) => {
    createCards(book);
  });
}
const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  const titleInput = document.getElementById("title");
  let title = titleInput.value;
  const authorInput = document.getElementById("author");
  let author = authorInput.value;
  const pagesInput = document.getElementById("pages");
  let pages = pagesInput.value;
  let checkbox = document.getElementById("isRead");
  let isRead;
  if (checkbox.checked) {
    isRead = "read";
  } else {
    isRead = "not read";
  }
  addBookToLibrary(title, author, pages, isRead);
  displayBook();
});
