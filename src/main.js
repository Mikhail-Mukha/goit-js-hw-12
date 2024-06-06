import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

import { getPosts } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader2');
const loadMoreButton = document.querySelector('.load-more');

if (loadMoreButton) {
  loadMoreButton.classList.add('load-more-hidden');
}

let page = 1;
let query = '';
let totalPages = 0;

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', loadMore);

function showLoader(display) {
  loader.style.display = display;
}

showLoader('none');

async function handleSubmit(event) {
  event.preventDefault();
  query = input.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  gallery.innerHTML = '';
  page = 1;
  showLoader('block');

  const data = await getPosts(query, page);
  try {
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'No images found. Try another search!',
        position: 'topRight',
        timeout: 2000,
      });
      return;
    }
    gallery.innerHTML = createMarkup(data.hits);
    lightbox.refresh();
    iziToast.success({
      title: 'Success',
      message: 'Images loaded successfully!',
      position: 'topRight',
      timeout: 2000,
    });

    totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
      timeout: 2000,
    });
    console.error(error);
  } finally {
    showLoader('none');
  }
}

async function loadMore() {
  page += 1;
  console.log(page);
  loadMoreButton.disabled = true;

  try {
    const data = await getPosts(query, page);
    if (data.hits.length === 0) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: 'No more images to load.',
        position: 'topRight',
        timeout: 2000,
      });
      return;
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();

    if (page >= totalPages) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: 'No more images to load.',
        position: 'topRight',
        timeout: 2000,
      });
    }

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height * 3;
    window.scrollBy({
      left: 0,
      top: cardHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    loadMoreButton.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    loadMoreButton.disabled = false;
  }
}
