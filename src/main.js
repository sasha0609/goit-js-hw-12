// У файлі main.js напиши всю логіку роботи додатка.
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { photoParams } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('.form');
// const searchBtn = document.querySelector('[type = "submit"]');
const searchInput = document.querySelector('#text');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

// function showLoader() {
//   loader.classList.remove('is-hidden');
// }

function hideLoader() {
  //   loader.classList.add('is-hidden');
}

form.addEventListener('submit', handleSabmit);

function handleSabmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  const query = searchInput.value.trim();
  loader.classList.remove('is-hidden');
  if (query === '') {
    iziToast.warning({
      color: 'yellow',
      message: 'Please full in the field for serch',
      position: 'topRight',
    });
  }
  photoParams(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          color: 'red',
        });
      }
      renderImages(data.hits);

      event.target.reset();

      return;
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: `Sorry, there are no images matching your search query. Please, try again!`,
        position: 'topRight',
      });
    })
    .finally(() => loader.classList.add('is-hidden'));
}
