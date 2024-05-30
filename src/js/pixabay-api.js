import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44072019-b0f3ca2d34d486b30651cffe6';

export function getPosts(userQ) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: userQ,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        iziToast.show({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 2000
        });
        throw new Error(response.statusText);
      }
      return response.json();
    });
}

