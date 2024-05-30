export function createMarkup(arr) {
  return arr.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p class="info-title">Likes: <span class="info-span">${likes}</span></p>
          <p class="info-title">Views: <span class="info-span">${views}</span></p>
          <p class="info-title">Comments: <span class="info-span">${comments}</span></p>
          <p class="info-title">Downloads: <span class="info-span">${downloads}</span></p>
        </div>
      </li>`
  ).join("");
}

