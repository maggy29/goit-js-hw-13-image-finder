const baseUrl =
  'https://pixabay.com/api/?key=16743632-772c8ce0f5559f9ded6b8a6e6&';

export default {
  page: 1,
  query: '',
  fetchImages() {
    const requestParams = `&q=${this.query}&page=${this.page}&orientation=horizontal&image_type=photo&per_page=12`;

    return fetch(baseUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
