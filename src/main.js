import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getPosts } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader2");

const lightbox = new SimpleLightbox(".gallery a");

form.addEventListener("submit", handleSubmit);

function showLoader(display) {
  loader.style.display = display;
}

showLoader('none');

function handleSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();
  if (query === "") return;

  gallery.innerHTML = "";

  showLoader('block');

  getPosts(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'Warning',
          message: 'No images found. Try another search!',
          position: 'topRight',
          timeout: 2000
        });
        return;
      }
      gallery.innerHTML = createMarkup(data.hits);
      lightbox.refresh();
      iziToast.success({
        title: 'Success',
        message: 'Images loaded successfully!',
        position: 'topRight',
        timeout: 2000
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Something went wrong: ${error.message}`,
        position: 'topRight',
        timeout: 2000
      });
      console.error(error);
    })
    .finally(() => {
      showLoader('none');
    });
}