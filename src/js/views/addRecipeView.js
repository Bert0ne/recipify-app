import View from './View.js';
import icons from '../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  formMarkup;
  addIngBtn;
  btnFormAddIng;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  addHandlerAddIng() {
    this.formMarkup = document.querySelector('.upload__column--right');
    this.addIngBtn = document.querySelector('.addIngredient');
    this.btnFormAddIng = document.querySelector('.btnFormAddIng');

    if (!this.addIngBtn) return;
    this.addIngBtn.addEventListener('click', this.addIngriedient.bind(this));
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    this.addHandlerAddIng();

    if (this._overlay.classList.contains('hidden')) {
      setTimeout(() => {
        this.renderForm();
      }, 400);
    }
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      const recipeIng = [
        ...document.querySelectorAll('.upload__column--right-main'),
      ];

      handler(data, recipeIng);
    });
  }

  addIngriedient() {
    const ingBtn = `
    <div class="upload__column--right-main">
        
        
    <div class="col col-1"> 
    <div class="col-1-n">
    <label>Amount</label>
        <input id="text" name="amount" type="text" placeholder="">
      </div>

      <div class="col-1-n">
        <label>Unit</label>
        <select id="units" name="units">
          <option disabled selected value> (optional) </option>
            <option value="kg">kg</option>
            <option value="gram">gram</option>
            <option value="cup">cup</option>
            <option value="spoon">spoon</option>
            <option value="cube">cube</option>
            </select>
            </div>
            
            </div>
            
            <div class="col col-2">
            <label>Ingredient</label>
            <input required id="ingredient description" name="ingredient" type="text">
            </div>
            
  </div>
    `;
    this.btnFormAddIng.insertAdjacentHTML('beforebegin', ingBtn);
  }

  _generateMarkup() {
    return `
      <div class="upload__column ">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="" placeholder="Type Title" required name="title" type="text" />
        <label>URL</label>
        <input value="" placeholder="Type URL" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="" placeholder="Choose image" required name="image" type="text" />
        <label>Publisher</label>
        <input value="" placeholder="Type Publisher" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="" placeholder="set time for prepare" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="" placeholder="set time for prepare" required name="servings" type="number" />
      </div>

      <div class="upload__column--right">
        <h3 class="upload__heading">Ingredients</h3>
        
          <div class="upload__column--right-main">
        
            <div class="col col-1"> 
              <div class="col-1-n">
                <label>Amount</label>
                  <input id="text" name="amount" type="text" placeholder="">
              </div>

                <div class="col-1-n">
                  <label>Unit</label>
                  <select id="units" name="units">
                    <option disabled selected value> (optional) </option>
                      <option value="kg">kg</option>
                      <option value="gram">gram</option>
                      <option value="cup">cup</option>
                      <option value="spoon">spoon</option>
                      <option value="cube">Cube</option>
                      </select>
                </div>
                      
            </div>
                      
            <div class="col col-2">
              <label>Ingredient</label>
                <input required id="ingredient description" name="ingredient" type="text">
            </div>
                      
          </div>

        <div class="btnFormAddIng">
            <button type="button" class="btn--smallest  addIngredient">
                <span>add ingredient</span>
            </button>
        </div>
               
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;
  }
}

export default new AddRecipeView();
