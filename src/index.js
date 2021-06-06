import './css/styles.css';
import debounce from 'lodash.debounce';
import ApiService from './js/apiService.js';
import createImgsCards from './templates/createImgsCards.hbs';

const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('[data-action="load-more"]');
const galleryContainerRef = document.querySelector('.gallery');

const apiService = new ApiService();

searchFormRef.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();

    
    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query === ``) {
        return alert('Введите название изображения');
    };

    loadMoreBtnRef.classList.remove('visually-hidden');
    apiService.resetPage();
    clearGalleryContainer();
    apiService.fetchImages().then(appendImageMarkup);
    
} 

function onLoadMore() {
    apiService.fetchImages().then(appendImageMarkup).then(scrollPage);
}

function appendImageMarkup(imageCard) {
    galleryContainerRef.insertAdjacentHTML('beforeend', createImgsCards(imageCard))
}

function clearGalleryContainer() {
    galleryContainerRef.innerHTML = '';
}

function scrollPage() {
 let value = document.body.scrollHeight;
     setTimeout(() => {
      window.scrollTo({
        top: value,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
}