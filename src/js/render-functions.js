// У файлі render-functions.js створи функції для відображення елементів інтерфейсу.
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
export function renderImages(data) {
  const galleryMarkup = data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="photos-list-item">
        <a class="photos-list-link" href="${largeImageURL}">
        <img class="photo" src="${webformatURL}" alt="${tags}"/>
        </a>
        <ul class="photo-information-container">
        <li class="item-photo-information-container"><p><span class="accent">Likes</span></br>${likes}</p></li>
        <li class="item-photo-information-container"><p><span class="accent">Views</span></br>${views}</p></li>
        <li class="item-photo-information-container"><p><span class="accent">Comments</span></br>${comments}</p></li>
        <li class="item-photo-information-container"><p><span class="accent">Downloads</span></br>${downloads}</p></li>
        </ul>
        </li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);

  lightbox.refresh();
}
