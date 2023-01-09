import axios from 'axios';
const API_KEY = '31487195-9d4b254f893254d6179d6b379';

axios.defaults.baseURL = 'https://pixabay.com';

async function fetchImages(searchQuery, page = 1, perPage = 12) {
  const response = await axios.get(
    `/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return response.data;
}

export default fetchImages;
