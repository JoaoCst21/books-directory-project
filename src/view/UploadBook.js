import FormView from "./FormView.js";

class UploadBook extends FormView {
  #btnDisplayForm = document.querySelector(".addBook");

  constructor() {
    super(document.querySelector("#form-post"));
    this.addHandlerDisplayForm(this.#btnDisplayForm);
  }

  addHandlerUpload(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const obj = [...new FormData(this._form)];
      const data = Object.fromEntries(obj);
      const releaseDate = new Date(data["release-date"]);
      delete data["release-date"];
      handler({ ...data, releaseDate });
      this._form.reset();
    });
  }
}

export default new UploadBook();
