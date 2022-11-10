import { View } from "./View.js";

class BooksView extends View {
  constructor() {
    super(document.querySelector(".books--container"));
  }

  addHandlerToggleBookmark(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      btn.classList.toggle("bi-bookmark");
      btn.classList.toggle("bi-bookmark-fill");
      console.log(btn);
      const isBookmarking = btn.classList.contains("bi-bookmark-fill");
      const { id } = btn.closest(".book").dataset;
      handler(isBookmarking, { idBook: +id });
    });
  }

  generateMarkup(data) {
    return data.reduce((acc, el) => {
      console.log(el);
      const { title, author, pages, description, idBook, isBookmarked } = el;
      const releaseDate = new Date(el.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const html = `
          <div class="book" data-id="${idBook}">
            <div class="book--edit cursor-pointer"><i class="bi bi-pencil-square"></i></div>
				<div class="title">${title}</div>
				<div class="author">by ${author}</div>
				<div class="info">
					<div class="pages--total">
						${pages} pages
					</div>
					<i class="bi bi-bookmark${
            isBookmarked ? "-fill" : ""
          } btn-bookmark cursor-pointer" title="Mark as Bookmarked"></i>
				</div>
				<div class="release-date">date released: ${releaseDate}</div>
				<div class="description">${description}</div>
			</div>
          `;
      return acc + html;
    }, "");
  }
}

export default new BooksView();
