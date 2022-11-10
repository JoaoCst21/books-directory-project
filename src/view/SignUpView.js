import FormView from "./FormView.js";

class SignUpView extends FormView {
  #btnDisplayForm = document.querySelector("#button-sign-up");

  constructor() {
    super(document.querySelector("#form-sign-up"));
    this.addHandlerDisplayForm(this.#btnDisplayForm);
  }

  addHandlerSignUp(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const obj = [...new FormData(this._form)];
      const data = Object.fromEntries(obj);
      handler(data);
    });
  }
}

export default new SignUpView();
