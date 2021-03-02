var images = [

]


function bootstrap() {
  var container = document.getElementById('item-list')
  container.innerHTML = images.map(image => {
    return `<div class="image-item-box" data-image-url="${image.downsized.url}"><img src="${image.preview_gif.url}"/></div>`
  }).join("")
  miro.helpers.initScrollableContainerWithDraggableImages(container, {draggableImageSelector: '.image-item-box'})
}

miro.onReady(bootstrap)

const SEARCH_URL = "https://api.giphy.com/v1/gifs/search";
const API_KEY = "CQiN4X9NTXZWAFeZT9FzsOFbXYrkUGlh";

let timeout;
let query;

function update() {
  const url = new URL(SEARCH_URL);
  url.search = new URLSearchParams({
    api_key: API_KEY,
    q: query,
    limit: 20
  }).toString();
  fetch(url).then(async (response) => {
    try {
      const result = await response.json();
      images = result.data.map(entry => entry.images);
      bootstrap()
    } catch (e) {
      console.log("Parse Error", e)
    }
  }).catch(e => {
    images = [];
    console.log("HTTP Error", e)
  }); 
}

document.getElementById("search").onkeyup = ((e) => {
  query = e.target.value;
  if (timeout) {
    window.clearTimeout(timeout);
  }
  timeout = window.setTimeout(update, 500);
})
