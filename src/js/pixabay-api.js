// У файлі pixabay-api.js зберігай функції для HTTP-запитів.

export function photoParams(value) {
  const searchParams = new URLSearchParams({
    key: '43225364-5b24397dc6bdfd6f28f380de9',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(result =>
    result.json()
  );
}
