import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44072019-b0f3ca2d34d486b30651cffe6';

export async function getPosts(userQ, page = 1) {
  const params = {
    key: API_KEY,
    q: userQ,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };
  
  try {
    const response = await axios.get(BASE_URL, { params });

    if (response.status !== 200) {
      iziToast.show({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000
      });
      throw new Error(response.statusText);
    }

    const data = response.data;
    console.log(data);

    return data;
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: 'An error occurred while fetching data. Please try again!',
      position: 'topRight',
      timeout: 2000
    });
    console.error(error);
  }
}

