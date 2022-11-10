class FormView {
  constructor(form) {
    this._overlay = document.querySelector(".overlay");
    this._form = form;
  }

  event(e) {
    console.log(FormView.prototype);
    if (!e.target.classList.contains("hidden")) this.toggleWindow();
    this.removeEvent();
  }

  removeEvent() {
    console.log("removeEvent");
    this._overlay.removeEventListener("click", this.event);
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._form.classList.toggle("hidden");
  }

  addHandlerDisplayForm(node) {
    node.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleWindow();
      this.event = this.event.bind(this);

      this._overlay.addEventListener("click", this.event);
    });
  }
}

export default FormView;
