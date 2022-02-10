import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if(!btn) return
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }  

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return ` ${this._getMarkupButtons(curPage, 'last', numPages)} ${this._getMarkupButtons(curPage, 'next')} `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${this._getMarkupButtons(curPage, 'first')} ${this._getMarkupButtons(curPage, 'prev')}`;
    }
    //other page
    if (curPage < numPages) {
      return `${this._getMarkupButtons(curPage, 'first')} ${this._getMarkupButtons(
        curPage,
        'prev'
      )} ${this._getMarkupButtons(curPage, 'last', numPages)} ${this._getMarkupButtons(curPage, 'next')} `;
    }
    // Page 1 and there are NO other pages
    return '';
  }

  _getMarkupButtons(curP, side, numP) {
    if (side === 'prev') {
      return `
        <button data-goto="${curP -1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curP - 1}</span>
        </button>  
        `;
    }
    if (side === 'next') {
      return `
        <!--  <button class="btn--inline pagination__btn--middle">
                <span> 5 Pages </span>
          </button>  -->

          <button data-goto="${curP + 1}" class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
                <span>Page ${curP + 1}</span>
          </button>  
          `;
    }
    if (side === 'first') {
      return `
        <button data-goto="${1}" class="btn--inline pagination__btn--prev">
              <span><<</span>
        </button>  
        `;
    }
    if (side === 'last') {
      return `
        <button data-goto="${numP}" class="btn--inline pagination__btn--next">
              <span>>></span>
        </button>  
        `;
    }
  }
}

export default new PaginationView();
