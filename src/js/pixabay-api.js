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
  
  const {data} = await axios.get(BASE_URL, { params });

  return data;

}

