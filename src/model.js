import { DB_URL } from "./config.js";

export const state = {
  books: [],
  bookmarkedBooks: [],
  user: {},
  bookMarkedTable: [],
  book: {},
};

export const loadBooks = async () => {
  try {
    const data = await fetch(`${DB_URL}/book`);
    state.books = await data.json();
  } catch (e) {
    console.error(e);
    throw new Error("Error loading Books from DB");
  }
};

export const loadBookmarks = async (id) => {
  try {
    state.bookmarkedBooks = [];
    const data = await fetch(`${DB_URL}/bookmarked/user/${id}`);
    state.bookMarkedTable = await data.json();
    state.bookMarkedTable.forEach(({ idbook }) => {
      const book = state.books.find((book) => book.idBook === idbook);
      state.bookmarkedBooks.push(book);
    });
  } catch (e) {
    console.error(e);
    throw new Error("Error loading Bookmarked Books from DB");
  }
};

export const loadUser = async ({ email, password }) => {
  try {
    const data = await fetch(`${DB_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({ email, password }),
    });
    state.user = await data.json();
  } catch (e) {
    console.error(e);
    throw new Error("Error loading User from DB");
  }
};

export const loadUserById = async (id) => {
  try {
    const data = await fetch(`${DB_URL}/user/${id}`);
    state.user = await data.json();
  } catch (e) {
    console.error(e);
    throw new Error("Error loading User from DB");
  }
};

export const removeBookmark = async ({ idBook }) => {
  try {
    const { idUser } = state.user;
    // 1. Find the bookmarked book to be removed
    const index = state.bookMarkedTable.findIndex((tuple) => {
      return tuple.idbook === idBook && tuple.iduser === idUser;
    });
    console.log({ index, table: state.bookMarkedTable, idBook });
    const { idBookMarkedBooks } = state.bookMarkedTable[index];
    // 2. Remove the bookmarked book from the DB
    const data = await fetch(`${DB_URL}/bookmarked/${idBookMarkedBooks}`, {
      method: "DELETE",
    });
    // 3. check if the operation was successful
    if (!data.ok) throw new Error("Error DB operation");
    // 4. Remove the bookmarked book from the state
    state.bookMarkedTable.splice(index, 1);
  } catch (e) {
    console.error(e);
    throw new Error("Error removing bookmark");
  }
};

export const addBookmark = async ({ idBook }) => {
  try {
    console.log({ idBook });
    const { idUser } = state.user;
    console.log({ idUser, idBook });
    // 1. Add the bookmark to the DB
    const data = await fetch(`${DB_URL}/bookmarked`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({ idBook, idUser }),
    });
    // 2. Check if the operation was successful
    if (!data.ok) throw new Error("Error DB operation");
    // 3. Add the bookmark to the state
    const bookmark = await data.json();
    state.bookMarkedTable.push(bookmark);
  } catch (e) {
    console.error(e);
    throw new Error("Error adding bookmark");
  }
};

export const uploadBook = async (data) => {
  try {
    // 1. Upload the book to the DB
    const response = await fetch(`${DB_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    });
    console.log({ data });
    // 2. Check if the operation was successful
    if (!response.ok) throw new Error("Error DB operation");
    // 3. Add the book to the state
    const book = await response.json();
    state.books.push(book);
  } catch (e) {
    console.error(e);
    throw new Error("Error uploading book");
  }
};

export const deleteBook = async (idBook) => {
  try {
    // 1. Delete the book from the DB
    const response = await fetch(`${DB_URL}/book/${idBook}`, {
      method: "DELETE",
    });
    // 2. Check if the operation was successful
    if (!response.ok) throw new Error("Error DB operation");
    // 3. Delete the book from the state
    const index = state.books.find((book) => book.idBook === idBook);
    state.books.splice(index, 1);
    state.book = {};
  } catch (e) {
    console.error(e);
    throw new Error("Error Removing Book");
  }
};

export const editBook = async (data) => {
  try {
    // 1. Edit the book in the DB
    console.log(data.releaseDate, new Date(data.releaseDate));
    const response = await fetch(`${DB_URL}/book/${data.idBook}`, {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    });
    // 2. Check if the operation was successful
    if (!response.ok) throw new Error("Error DB operation");
    // 3. Edit the book in the state
    const index = state.books.findIndex((book) => book.idBook === data.idBook);
    state.books[index] = data;
    state.book = data;
  } catch (e) {
    console.error(e);
    throw new Error("Error Editing Book");
  }
};

export const uploadUser = async (data) => {
  try {
    const response = await fetch(`${DB_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error DB operation");
    console.log(data);
    state.user = response.json();
  } catch (e) {
    console.error(e);
    throw new Error("Error Uploading User");
  }
};
