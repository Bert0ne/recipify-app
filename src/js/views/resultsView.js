import View from './View';
import previewView from './previewView';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipes found for your query. Please try again. `;
  _message = `Succes operations`;
  _sortContainer = document.querySelector('.sort');
  _arrowUp = document.querySelector('.sort__span-arrow-up');
  _arrowDown = document.querySelector('.sort__span-arrow-down');
  _sortBtn = document.querySelector('.sort__span');
  _sortMenu = document.querySelector('.sort__ul');

  constructor() {
    super();
    this._addHandlerSortWindow();
  }
  _hideSortMenu() {
    this._sortMenu.classList.add('hiddenSort');
  }
  _showSortMenu() {
    this._sortMenu.classList.remove('hiddenSort');
  }
  showSortContainer() {
    this._sortContainer.classList.remove('hiddenSort');
  }

  addSortHandlerClick(handler) {
    this._sortContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('.sort__choice')?.dataset.sort;

      if (!btn) return;

      handler(btn);
    });
  }

  toggleSortWindow() {
    this._arrowDown.classList.toggle('hiddenSort');
    this._arrowUp.classList.toggle('hiddenSort');
    this._sortMenu.classList.toggle('hiddenSort');
  }
  _addHandlerSortWindow() {
    this._sortBtn.addEventListener('click', this.toggleSortWindow.bind(this));
  }
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
