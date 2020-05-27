import apiServ from './serv/apiService';
import itemTmpl from '../templates/item-tmpl.hbs';

const refs = {
  searchForm: document.querySelector('#js-search-form'),
  loadMoreBtn: document.querySelector('#js-load-more-btn'),
  gallery: document.querySelector('#js-gallery'),
};

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormHandler(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.query.value;

  clearListItems();

  apiServ.resetPage();
  apiServ.searchQuery = inputValue;
  galleryLoader();
}

function loadMoreBtnHandler(e) {
  galleryLoader();
  setTimeout(scroll, 1200);
}

function galleryLoader(e) {
  apiServ
    .fetchImages()
    .then(data => {
      makeListItemsMarkup(data);
    })
    .catch(error => alert('Something went wrong((( Try later!', error));
}

function makeListItemsMarkup(smth) {
  const markup = itemTmpl(smth);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    top: window.scrollY + window.innerHeight,
    behavior: 'smooth',
  });
}
