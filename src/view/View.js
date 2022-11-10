export class View {
  #data;
  _parentElement;

  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(data) {
    this.#data = data;
    this._clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this.generateMarkup(data)
    );
  }

  update(data) {
    this.#data = data;
    const newMarkup = this.generateMarkup(data);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDOM.querySelectorAll("*")];
    const curElements = [...this._parentElement.querySelectorAll("*")];
    for (let i = 0; i < newElements.length; i++) {
      const [newEl, curEl] = [newElements[i], curElements[i]];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        [...newEl.attributes].forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    }
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
