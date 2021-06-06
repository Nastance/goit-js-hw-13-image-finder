const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21959567-f8bf3eb43bbee8865b9586c63';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
         return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                this.incrementPage();
                return response.hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;        
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}
