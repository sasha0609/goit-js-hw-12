import { getImage } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const searchInput = document.querySelector('#text');
const btnLoad = document.querySelector('.btn');
const gallery = document.querySelector('.gallery');

function showLoader() {
  loader.classList.remove('is-hidden');
}
export function hideLoader() {
  loader.classList.add('is-hidden');
}
function showLoadMore() {
  btnLoad.classList.remove('is-hidden');
}
function hideLoadMore() {
  btnLoad.classList.add('is-hidden');
}

let query;
let currentPage = 1;
let maxPage = 0;
const perPage = 15;

form.addEventListener('submit', sendForm);

async function sendForm(event) {
  event.preventDefault();
  hideLoadMore();
  showLoader();
  gallery.innerHTML = '';
  currentPage = 1;
  query = searchInput.value.trim();
  if (!query) {
    iziToast.show({
      message: 'Please complete the field!',
      position: 'topRight',
    });
    hideLoader();
    return;
  }
  try {
    const data = await getImage(query, currentPage);
    maxPage = Math.ceil(data.totalHits / perPage);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImages(data.hits);
      checkButtonStatus();
    }
  } catch (error) {
    iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      position: 'topRight',
    });
  }
  hideLoader();
  form.reset();
}

btnLoad.addEventListener('click', onLoadMore);

async function onLoadMore() {
  currentPage += 1;
  hideLoadMore();
  showLoader();
  try {
    const data = await getImage(query, currentPage);
    renderImages(data.hits);
  } catch (error) {
    iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      position: 'topRight',
    });
  }
  hideLoader();
  scroll();
  checkButtonStatus();
}

function checkButtonStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}

function scroll() {
  const height = gallery.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height,
    behavior: 'smooth',
  });
}
