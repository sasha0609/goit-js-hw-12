// У файлі pixabay-api.js зберігай функції для HTTP-запитів.
import axios from 'axios';

export async function getImage(query, currentPage) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '43225364-5b24397dc6bdfd6f28f380de9',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 15,
    },
  });
  return response.data;
}
