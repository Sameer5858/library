const container = document.getElementById("cards-container");
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
// book constructor
// function Book(title, author, pages, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isRead = isRead;
//   this.id = uuid();
//   this.info = function () {
//     return title + " by " + author + ", " + pages + "pages" + ", " + read;
//   };
// }

// Book class constructor
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = uuid();
  }
  get info() {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      "pages" +
      ", " +
      this.read
    );
  }
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
  const isReadButton = document.createElement("button");
  isReadButton.className = "isReadButton";
  const removeButton = document.createElement("button");
  removeButton.className = "remove";
  if (book.isRead === "Read") {
    isReadButton.classList.add("read");
  } else if (book.isRead === "Not read") {
    isReadButton.classList.add("not-read");
  }
  removeButton.textContent = "Remove";
  container.append(cardDiv);
  cardDiv.append(title);
  cardDiv.append(author);
  cardDiv.append(pages);
  cardDiv.append(isReadButton);
  cardDiv.append(removeButton);
  removeButton.value = book.id;
  isReadButton.value = book.id;
  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Pages: ${book.pages}`;
  isReadButton.textContent = book.isRead;
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
// event listener for click
window.addEventListener("click", (e) => {
  //if clicked on remove button matches the id from the element button to book.id and remove it from the library and re displays
  if (e.target.classList[0] === "remove") {
    const idToDelete = e.target.value;
    myLibrary = myLibrary.filter((book) => book.id !== idToDelete);
    displayBook();
  }
  // if clicked read button changes the status
  else if (e.target.classList[0] === "isReadButton") {
    const idToChangeStatus = e.target.value;
    myLibrary.forEach((book) => {
      if (book.id === idToChangeStatus) {
        if (book.isRead === "Not read") {
          book.isRead = "Read";
          displayBook();
        } else if (book.isRead === "Read") {
          book.isRead = "Not read";
          displayBook();
        }
      }
    });
  }
});
