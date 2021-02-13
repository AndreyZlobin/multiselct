class MultiSelect {
  /**
   * Create a point.
   * @param {string} element - root element.
   * @param {object} params - root params {options: [], placeholder}.
   */
  constructor(element, params) {
    if (!element) {
      throw new Error("Root element not passed");
    }
    if (!params.options.length) {
      throw new Error("Root params - 'options' not passed");
    }
    if (!document.querySelector(element)) {
      throw new Error("Root element not found");
    }
    this._element = document.querySelector(element);
    this._options = params.options || [];
    this._selectedOptions = [];
    this._placeholder = params.placeholder || "";
    this._notFoundoption = params.notFoundoption || "";

    this._optionsListShowing = false;
    this._bind();
    this._render();
    this._initEventListeners();
  }

  get _multiselect() {
    return this._element.querySelector(".multiselect");
  }
  get _multiselectTags() {
    return this._element.querySelector(".multiselect__tags");
  }
  get _multiselectTagsWrapper() {
    return this._element.querySelector(".multiselect__tags__wrapper");
  }
  get _multiselectInput() {
    return this._element.querySelector(".multiselect_input");
  }
  get _multiselectOptions() {
    return this._element.querySelector(".multiselect__options");
  }
  get _multiselectOption() {
    return this._element.querySelectorAll(".multiselect__option");
  }
  get _multiselectOptionsClose() {
    return this._element.querySelector(".multiselect__options-close");
  }
  get _multiselectTagsIcons() {
    return this._element.querySelectorAll(".multiselect__tag-icon");
  }

  _getMultiselect() {
    return `
    <div class="multiselect__tags">
        <div class="multiselect__tags__wrapper"></div>
        <input class="multiselect_input" placeholder='${this._placeholder}'/>
    </div>
    <ul class="multiselect__options 
    ${!this._optionsListShowing ? "options--show" : ""}">
    ${this._renderOptionList(this._options)} 
    <span class="multiselect__options-close">X</span>
  </ul>         
    `;
  }

  _render() {
    if (!this._options.length) {
      throw new Error("Список опций не передан при инициализации!");
    }
    return this._element.insertAdjacentHTML(
      "afterbegin",
      this._getMultiselect()
    );
  }

  _renderOptionList(options) {
    return options.length
      ? options
          .map(
            (option) =>
              `<li class='multiselect__option' data-id=${option.id} data-value='${option.name}'>${option.name}</li>`
          )
          .join("\n")
      : `<li>${this._notFoundoption}</li>`;
  }

  _renderTagsList(options) {
    return options
      .map(
        (tag, index) =>
          `<span class='multiselect__tag'>${
            tag.name
          } <i class="multiselect__tag-icon" data-id=${index + 1} data-name='${
            tag.name
          }'></i></span>`
      )
      .join("\n");
  }

  _onSelectClick() {
    this._element.addEventListener("click", this.open);
  }

  _documentClick() {
    document.addEventListener("click", this.close);
    if (this._multiselectOptionsClose) {
      this._multiselectOptionsClose.addEventListener("click", this.close);
    }
  }

  _onClickRemoveTag() {
    const tagsList = this._multiselectTagsIcons;
    if (!tagsList.length) return;
    tagsList.forEach((tag) => {
      tag.addEventListener("click", (event) => {
        if (event.target) {
          const tagName = event.target.getAttribute("data-name");
          this._selectedOptions = this._selectedOptions.filter(
            (option) => option.name !== tagName
          );
          event.target.parentNode.remove();
        }
      });
    });
  }

  _onInput() {
    const input = this._multiselectInput;
    input.addEventListener("input", (event) => {
      const optionList = this._multiselectOptions;

      const value = event.target.value.toLowerCase().trim();

      const options = this._options.filter((option) =>
        option.name.toLowerCase().trim().includes(value)
      );
      optionList.innerHTML = "";

      if (options.length) {
        this._optionsListShowing = true;
        this._multiselectOptions.classList.remove("options--show");
      }

      optionList.insertAdjacentHTML(
        "afterbegin",
        this._renderOptionList(options)
      );

      this._eventClickOnOption();
    });
  }

  _onSelectOption(event) {
    const tagsWrapper = this._multiselectTagsWrapper;

    if (!event.target && !tagsWrapper) return;
    let options = this._selectedOptions;
    const optionValue = event.target.getAttribute("data-value");

    const filt = this._options.find((option) => option.name === optionValue);
    if (options.includes(filt)) {
      options = options.filter(
        (option) =>
          option.name.toLowerCase().trim() !== optionValue.toLowerCase().trim()
      );
    } else {
      options.push(filt);
    }

    tagsWrapper.innerHTML = "";
    this._selectedOptions = options;
    tagsWrapper.insertAdjacentHTML("afterbegin", this._renderTagsList(options));
    this._onClickRemoveTag();
  }

  _eventClickOnOption() {
    const optionsCollection = this._multiselectOption;
    if (!optionsCollection.length) return;
    optionsCollection.forEach((option) => {
      option.addEventListener("click", this._onSelectOption);
    });
  }

  _initEventListeners() {
    this._eventClickOnOption();
    this._onSelectClick();
    this._documentClick();
    this._onInput();
  }

  open(event) {
    event.stopPropagation();
    if (
      this._multiselectOptions.classList.contains("options--show") &&
      !this._optionsListShowing
    ) {
      this._optionsListShowing = true;
      this._multiselectOptions.classList.remove("options--show");
    }
  }

  close(event) {
    event.stopPropagation();
    if (
      !this._multiselectOptions.classList.contains("options--show") &&
      this._optionsListShowing
    ) {
      this._optionsListShowing = false;
      this._multiselectOptions.classList.add("options--show");
    }
  }

  getValues() {
    return this._selectedOptions;
  }

  _bind() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onSelectOption = this._onSelectOption.bind(this);
    this._onSelectClick = this._onSelectClick.bind(this);
    this._renderTagsList = this._renderTagsList.bind(this);
    this._onClickRemoveTag = this._onClickRemoveTag.bind(this);
  }

  unBind() {}

  destroy() {
    console.log(this._multiselectOption);
    this._multiselectOptionsClose.removeEventListener("click", this.close);
    this._element.removeEventListener("click", this.open);
    this._options = null;
    this._selectedOptions = null;
    this._placeholder = null;
    this._notFoundoption = null;
    this._element.remove();
  }
}

const mockOptions = {
  options: [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "Angular" },
    { id: 3, name: "VueJs" },
    { id: 4, name: "React" },
    { id: 5, name: "Svelte" },
    { id: 6, name: "Ember" },
    { id: 7, name: "Redux" },
  ],
  placeholder: "Select something option",
  notFoundoption: "Option not found...",
};

const multiSelect = "#multiselect";
if (multiSelect) {
  const select = new MultiSelect(multiSelect, mockOptions);
  window.select = select;
}
