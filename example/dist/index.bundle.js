(()=>{var t={254:t=>{t.exports=class{constructor(t,e){if(!t)throw new Error("Root element not passed");if(!e.options.length)throw new Error("Root params - 'options' not passed");if(!document.querySelector(t))throw new Error("Root element not found");this._element=document.querySelector(t),this._options=e.options||[],this._selectedOptions=[],this._placeholder=e.placeholder||"",this._notFoundoption=e.notFoundoption||"",this._optionsListShowing=!1,this._bind(),this._render(),this._initEventListeners()}get _multiselect(){return this._element.querySelector(".multiselect")}get _multiselectTags(){return this._element.querySelector(".multiselect__tags")}get _multiselectTagsWrapper(){return this._element.querySelector(".multiselect__tags__wrapper")}get _multiselectInput(){return this._element.querySelector(".multiselect_input")}get _multiselectOptions(){return this._element.querySelector(".multiselect__options")}get _multiselectOption(){return this._element.querySelectorAll(".multiselect__option")}get _multiselectOptionsClose(){return this._element.querySelector(".multiselect__options-close")}get _multiselectTagsIcons(){return this._element.querySelectorAll(".multiselect__tag-icon")}_getMultiselect(){return`\n    <div class="multiselect__tags">\n        <div class="multiselect__tags__wrapper"></div>\n        <input class="multiselect_input" placeholder='${this._placeholder}'/>\n    </div>\n    <ul class="multiselect__options \n    ${this._optionsListShowing?"":"options--show"}">\n    ${this._renderOptionList(this._options)} \n    <span class="multiselect__options-close">X</span>\n  </ul>         \n    `}_render(){if(!this._options.length)throw new Error("Список опций не передан при инициализации!");return this._element.insertAdjacentHTML("afterbegin",this._getMultiselect())}_renderOptionList(t){return t.length?t.map((t=>`<li class='multiselect__option' data-id=${t.id} data-value='${t.name}'>${t.name}</li>`)).join("\n"):`<li>${this._notFoundoption}</li>`}_renderTagsList(t){return t.map(((t,e)=>`<span class='multiselect__tag'>${t.name} <i class="multiselect__tag-icon" data-id=${e+1} data-name='${t.name}'></i></span>`)).join("\n")}_onSelectClick(){this._element.addEventListener("click",this.open)}_documentClick(){document.addEventListener("click",this.close),this._multiselectOptionsClose&&this._multiselectOptionsClose.addEventListener("click",this.close)}_onClickRemoveTag(){const t=this._multiselectTagsIcons;t.length&&t.forEach((t=>{t.addEventListener("click",(t=>{if(t.target){const e=t.target.getAttribute("data-name");this._selectedOptions=this._selectedOptions.filter((t=>t.name!==e)),t.target.parentNode.remove()}}))}))}_onInput(){this._multiselectInput.addEventListener("input",(t=>{const e=this._multiselectOptions,i=t.target.value.toLowerCase().trim(),s=this._options.filter((t=>t.name.toLowerCase().trim().includes(i)));e.innerHTML="",s.length&&(this._optionsListShowing=!0,this._multiselectOptions.classList.remove("options--show")),e.insertAdjacentHTML("afterbegin",this._renderOptionList(s)),this._eventClickOnOption()}))}_onSelectOption(t){const e=this._multiselectTagsWrapper;if(!t.target&&!e)return;let i=this._selectedOptions;const s=t.target.getAttribute("data-value"),n=this._options.find((t=>t.name===s));i.includes(n)?i=i.filter((t=>t.name.toLowerCase().trim()!==s.toLowerCase().trim())):i.push(n),e.innerHTML="",this._selectedOptions=i,e.insertAdjacentHTML("afterbegin",this._renderTagsList(i)),this._onClickRemoveTag()}_eventClickOnOption(){const t=this._multiselectOption;t.length&&t.forEach((t=>{t.addEventListener("click",this._onSelectOption)}))}_initEventListeners(){this._eventClickOnOption(),this._onSelectClick(),this._documentClick(),this._onInput()}open(t){t.stopPropagation(),this._multiselectOptions.classList.contains("options--show")&&!this._optionsListShowing&&(this._optionsListShowing=!0,this._multiselectOptions.classList.remove("options--show"))}close(t){t.stopPropagation(),!this._multiselectOptions.classList.contains("options--show")&&this._optionsListShowing&&(this._optionsListShowing=!1,this._multiselectOptions.classList.add("options--show"))}getValues(){return this._selectedOptions}_bind(){this.open=this.open.bind(this),this.close=this.close.bind(this),this._onSelectOption=this._onSelectOption.bind(this),this._onSelectClick=this._onSelectClick.bind(this),this._renderTagsList=this._renderTagsList.bind(this),this._onClickRemoveTag=this._onClickRemoveTag.bind(this)}unBind(){}destroy(){this._element.removeEventListener("click",this.open),this._options=null,this._selectedOptions=null,this._placeholder=null,this._notFoundoption=null,this._element.remove()}}}},e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}(()=>{const t=i(254),e=document.querySelector(".btn-1"),s=document.querySelector(".btn-2"),n=document.querySelector("#result");{const e=new t("#multiselect",{options:[{id:1,name:"JavaScript"},{id:2,name:"Angular"},{id:3,name:"VueJs"},{id:4,name:"React"},{id:5,name:"Svelte"},{id:6,name:"Ember"},{id:7,name:"Redux"}],placeholder:"Select something option",notFoundoption:"Option not found..."});window.select=e}e.addEventListener("click",(()=>{n.innerHTML="",n.insertAdjacentHTML("afterbegin",select.getValues().map((t=>`<span>${t.name}</span>`)).join("\n"))})),s.addEventListener("click",(()=>{select.destroy(),n.innerHTML="Select has been destroyed"}))})()})();