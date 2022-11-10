import FormView from "./FormView.js";

class SignInView extends FormView {
  #btnDisplayForm = document.querySelector("#button-sign-in");

  constructor() {
    super(document.querySelector("#form-sign-in"));
    this.addHandlerDisplayForm(this.#btnDisplayForm);
  }

  addHandlerSignIn(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const obj = [...new FormData(this._form)];
      const data = Object.fromEntries(obj);
      handler(data);
    });
  }
}

export default new SignInView();
