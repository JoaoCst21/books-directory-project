import * as model from "./model.js";
import booksView from "./view/BooksView.js";
import uploadBook from "./view/UploadBook.js";
import editBookView from "./view/EditBookView.js";
import signUpView from "./view/SignUpView.js";
import signInView from "./view/SignInView.js";
import SignInView from "./view/SignInView.js";
import SignUpView from "./view/SignUpView.js";

const markBooks = (books, bookmarkedBooks) => {
  if (bookmarkedBooks.length === 0) return;
  books.forEach((book) => {
    book.isBookmarked = bookmarkedBooks.some(
      ({ idBook }) => idBook === book.idBook
    );
  });
};

const controlLoadPage = async () => {
  try {
    // 1. Load the data from the API
    await model.loadBooks();
    const { user } = model.state;
    // 2. Render the data if no user
    if (JSON.stringify(user) === "{}") {
      booksView.render(model.state.books);
      return;
    }
    // 3. Load the bookmarked books if user
    console.log(user.idUser);
    await model.loadBookmarks(user.idUser);
    console.log(model.state.bookmarkedBooks);
    // 4. Render the data
    markBooks(model.state.books, model.state.bookmarkedBooks);
    booksView.render(model.state.books);
  } catch (e) {
    console.error(e);
    // render error
  }
};

const controlToggleBookmark = (isBookMarking, data) => {
  if (JSON.stringify(model.state.user) === "{}") return;
  // Remove/Add the bookmark from the DB and state
  isBookMarking ? model.addBookmark(data) : model.removeBookmark(data);
};

const controlDisplayForm = ({ idBook }) => {
  // 1. Get the book from the state
  model.state.book = model.state.books.find((book) => book.idBook === idBook);
  // 2. Display the form
  editBookView.generateForm(model.state.book);
  // 3. Activate the edit Form
  editBookView.toggleWindow();
};

const controlEditBook = async (data, { METHOD }) => {
  try {
    // 1. Edit the book in the DB
    const { idBook } = model.state.book;
    if (METHOD === "PUT") await model.editBook({ ...data, idBook });
    if (METHOD === "DELETE") await model.deleteBook(idBook);
    // 2. Hide the form
    editBookView.toggleWindow();
    editBookView.removeEvent();
    // 3. Reload the page
    await controlLoadPage();
  } catch (e) {
    console.error(e);
    // render error
  }
};
const controlSignIn = async (data) => {
  try {
    // 1. Load the user
    await model.loadUser(data);
    // 2. hide the form
    signInView.toggleWindow();
    signInView.removeEvent();
    // 3. reload the page
    await controlLoadPage();
  } catch (e) {
    console.error(e);
    // render error
  }
};

const controlSignUp = async (data) => {
  try {
    // 1. Upload the user to the DB
    await model.uploadUser(data);
    // 2. hide the form
    signUpView.toggleWindow();
    signUpView.removeEvent();
    // 3. Reload the page
    await controlLoadPage();
  } catch (e) {
    console.error(e);
    // render error
  }
};

// controlLoadPage();

const controlUploadBook = async (data) => {
  try {
    // 1. Upload the book to the DB
    await model.uploadBook(data);
    // 2. hide the form
    uploadBook.toggleWindow();
    uploadBook.removeEvent();
    // 2. Reload the page
    await controlLoadPage();
  } catch (e) {
    console.error(e);
    // render error
  }
};

const init = async () => {
  SignInView.addHandlerSignIn(controlSignIn);
  SignUpView.addHandlerSignUp(controlSignUp);
  booksView.addHandlerToggleBookmark(controlToggleBookmark);
  uploadBook.addHandlerUpload(controlUploadBook);
  editBookView.addHandlerDisplayForm(controlDisplayForm);
  editBookView.addHandlerEditBook(controlEditBook);
};
init();
controlLoadPage();
