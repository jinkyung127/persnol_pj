const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjAwYjljMmY0NzA2MzIzMDdkNTk5Y2E2MDU1YWM4NSIsInN1YiI6IjY0NzM0ZDM0YmUyZDQ5MDBhN2Q2MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.904cgBblGnOetTZ00BRWJnlIigPpKGEFzmBXQRjeYHk",
  },
};

function listing() {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let rows = data["results"];
      const cardBox = document.querySelector("#cards-box");
      cardBox.innerHTML = '';
      rows.forEach((a) => {
        let title = a["title"];
        let content = a["overview"];
        let image = a["poster_path"];
        let rate = a["vote_average"];
        let id = a["id"];

        let temp_html = `<div class="col">
                                <div class="card h-100">
                                    <img src="https://image.tmdb.org/t/p/w500${image}"
                                        class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${content}</p>
                                        <p>${rate}</p>
                                    </div>
                                </div>
                            </div>`;
        cardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = cardBox.lastElementChild;
        clickCardBox.addEventListener('click', () => clickCard(id));
      });
    });
}

function clickCard(id) {
  alert(`id = ${id}`);
}

listing();

function searchMovie() {
  const searchBox = document.getElementById('searchinput').value;
  const movieCardBox = document.getElementById('cards-box');
  movieCardBox.innerHTML = '';

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data['results'];
      if (searchBox.length === 0) {
        alert('한 글자 이상 적어주세요');
      }
      const filteredResults = results
        .map((item) => ({
          title: item['title'],
          content: item['overview'],
          image: item['poster_path'],
          rate: item['vote_average'],
          id: item['id'],
        }))
        .filter((movie) => movie.title.includes(searchBox));
      if (filteredResults.length === 0) {
        alert('일지하는 검색결과가 없습니다');
        window.location.reload();
      }
      filteredResults.forEach((movie) => {
        let temp_html = `<div class="col">
                                <div class="card h-100">
                                    <img src="https://image.tmdb.org/t/p/w500${movie.image}"
                                        class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.title}</h5>
                                        <p class="card-text">${movie.content}</p>
                                        <p>${movie.rate}</p>
                                    </div>
                                </div>
                            </div>`;
        movieCardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = movieCardBox.lastElementChild;
        clickCardBox.addEventListener('click', () => clickCard(movie.id));
      });
    });
}

const searchButton = document.getElementById('searchbtn');
searchButton.addEventListener('click', searchMovie);

const searchIpt = document.getElementById('searchinput');
searchIpt.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMovie();
  }
});

const main = () => {
  window.location.reload();
};