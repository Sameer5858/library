const container = document.getElementById("container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector("#overlay");
const addBookButton = document.getElementById("addbook");
const submitButton = document.getElementById("submit");
let myLibrary = [];
//book constructor
// generate random id for books
function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = uuid();
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
  const isRead = document.createElement("button");
  isRead.className = "isRead";
  const removeButton = document.createElement("button");
  removeButton.className = "remove";
  removeButton.textContent = "Remove";
  container.append(cardDiv);
  cardDiv.append(title);
  cardDiv.append(author);
  cardDiv.append(pages);
  cardDiv.append(isRead);
  cardDiv.append(removeButton);
  removeButton.value = book.id;
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  isRead.textContent = book.isRead;
}
// function to display books from library
function displayBook() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    createCards(book);
  });
}
// function to remove active class from modal and overlay
function removeModalClass() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("readcheckbox").checked = false;
}
// event listener for add book button shows modal
addBookButton.addEventListener("click", () => {
  modal.classList.add("active");
  overlay.classList.add("active");
});
// exits modal when clicked out of the modal box
overlay.addEventListener("click", () => {
  removeModalClass();
});
// exits modals when submit button pressed and the input fields are not empty
submitButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  let isRead = "Not read";
  if (document.getElementById("readcheckbox").checked) {
    isRead = "Read";
  }
  if (title !== "" && author !== "" && pages !== "") {
    addBookToLibrary(title, author, pages, isRead);
    removeModalClass();
  }
});
// event listener for click and matches with remove class then takes out the id from the element button and remove it from the library and re displays
window.addEventListener("click", (e) => {
  if (e.target.classList[0] === "remove") {
    const idToDelete = e.target.value;
    myLibrary = myLibrary.filter((book) => book.id !== idToDelete);
    displayBook();
  }
});
