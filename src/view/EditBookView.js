import FormView from "./FormView.js";

class EditBookView extends FormView {
  #btnEditParent = document.querySelector(".books--container");

  constructor() {
    super(document.querySelector("#form-edit"));
  }

  addHandlerDisplayForm(handler) {
    this.#btnEditParent.addEventListener("click", (e) => {
      console.log("EditBookView.addHandlerDisplayForm");
      const btn = e.target.closest(".book--edit");
      if (!btn) return;
      const { id } = btn.closest(".book").dataset;
      handler({ idBook: +id });
      this.event = this.event.bind(this);
      this._overlay.addEventListener("click", this.event);
    });
  }

  addHandlerEditBook(handler) {
    this._form.addEventListener("click", (e) => {
      e.preventDefault();
      const btnSubmit = e.target.closest(".button-submit");
      const btnDelete = e.target.closest(".button-remove");
      if (!btnSubmit && !btnDelete) return;
      const obj = [...new FormData(this._form)];
      const data = Object.fromEntries(obj);
      const releaseDate = new Date(data["release-date"]);
      delete data["release-date"];
      handler(
        { ...data, releaseDate },
        { METHOD: btnDelete ? "DELETE" : "PUT" }
      );
    });
  }

  generateForm(data) {
    const { title, author, pages, description } = data;
    const releaseDate = new Date(data.releaseDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    this._form.innerHTML = `
    <form action="" class="form hidden">
		<div class="form-title">
			Insert new Book
		</div>
		<div class="inputs">
			<input type="text" class="input" name="title" placeholder="title" value="${title}">
			<input type="text" class="input" name="author" placeholder="author" value="${author}">
			<input type="text" class="input" name="pages" placeholder="pages" value="${pages}">
			<input type="text" class="input" name="release-date" placeholder="release date" value="${releaseDate}">
			<textarea name="description" class="textarea" cols="20" rows="3" placeholder="description">${description}</textarea>
			<button type="submit" class="button-submit cursor-pointer">save</button>
			<button type="submit" class="button-remove cursor-pointer">delete</button>
		</div>
	</form>
    `;
  }
}

export default new EditBookView();
