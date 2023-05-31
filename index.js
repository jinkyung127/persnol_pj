// TMDB에서 영화정보 받아오기
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjAwYjljMmY0NzA2MzIzMDdkNTk5Y2E2MDU1YWM4NSIsInN1YiI6IjY0NzM0ZDM0YmUyZDQ5MDBhN2Q2MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.904cgBblGnOetTZ00BRWJnlIigPpKGEFzmBXQRjeYHk',
  },
};

// JSON 받아서 카드 붙이기
function listing() {
  fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=9600b9c2f470632307d599ca6055ac85&language=ko',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let rows = data['results'];
      const cardBox = document.getElementById('cards-box');
      cardBox.textContent = ''; // 기존 카드 지우기
      rows.forEach((movie) => {
        let title = movie['title'];
        let content = movie['overview'];
        let image = movie['poster_path'];
        let rate = movie['vote_average'];
        let id = movie['id'];
        
        let temp_html = `<div class="col">
                            <div class="card h-100" id="card-${id}">
                              <img src="https://image.tmdb.org/t/p/w500${image}"
                                  class="card-img-top">
                              <div class="card-body">
                                  <h5 class="card-title">${title}</h5>
                                  <p class="card-text">${content}</p>
                                  <p>${rate}</p>
                              </div>
                            </div>
                          </div>`;
        cardBox.insertAdjacentHTML('beforeend', temp_html); // 바닐라 js로 temp_html을 붙이기 위해 찾은 함수. 정확히 어떤 기능을 하는지는 잘 모름.
        const clickCardBox = document.getElementById(`card-${id}`); // querysellector -> getElementById 메서드 변경, 영역이 맞는 id값을 찾아
        clickCardBox.addEventListener('click', () => clickCard(id)); // addEventListener 메서드로 'click' 이벤트시 clickCard(id)함수 호출 
      });                                                             
    });
}
// 카드 listing 함수 내부에서 fetch를 받아오기 때문에 listing 내부에 이벤트를 만듬.

// alert 카드 id 함수 선언
function clickCard(id) {
  alert(`id: ${id}`);
}

// 카드 붙이는 함수 실행
listing();
// 검색 함수 선언
function searchMovie() {
  const searchBox = document.getElementById('searchinput').value; // 검색 input 값 받아오기
  console.log(searchBox); // input값 확인
  const movieCardBox = document.getElementById('cards-box'); // html에서 id 'card-box' 찾기
  movieCardBox.textContent = ''; // 기존 카드들 지우기
  // 원래 innerHTML='' 으로 작성했으나 textContent로 교체

  fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=9600b9c2f470632307d599ca6055ac85&language=ko',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data['results'];
      if (searchBox.length === 0) {
        alert('한 글자 이상 적어주세요'); // input 값이 없는 경우
      }
      const filteredResults = results
        // map() 으로 카드 배열 생성
        .map((item) => ({
          title: item['title'],
          content: item['overview'],
          image: item['poster_path'],
          rate: item['vote_average'],
          id: item['id'],
        }))
        // filter() 로 검색 인풋값이 포함된 타이틀이 있는 배열만 반환
        .filter((movie) =>
          movie.title.replace(/ /g,"").toLowerCase().replace(/ /g,"").includes(searchBox.toLowerCase()) // .toLowerCase() 를 사용해서 영화 제목과 인풋값을 모두 소문자로 받아 비교
        );
      if (filteredResults.length === 0) {
        alert('일지하는 검색결과가 없습니다'); // 인풋이 포함된 제목 값이 없을 경우
        window.location.reload();
      }
      // 필터링한 배열만 카드로 붙이기 | movie를 변수로 filter를 받아왔으므로 movie.변수로 고쳐줌
      filteredResults.forEach((movie) => {
        let temp_html = `<div class="col">
                                <div class="card h-100" id="card-${movie.id}"> 
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
        const clickCardBox = document.getElementById(`card-${movie.id}`);
        clickCardBox.addEventListener('click', () => clickCard(movie.id));
      });
    });
}
// searchMovie 함수를 선언해서 검색창 input값을 .value로 받아온 다음 map함수로 필요한 값을 받아와 배열을 반환해주고 
// filter() 로 검색 인풋이 포함된 타이틀이 있는 배열만 반환한 후 필터링한 배열만 카드로 붙이는 방식으로 구현했다. 
// 검색도 카드 알림창과 마찬가지로 document.getElementById 와 addEventListener 를 사용했다.

// 검색 버튼 이벤트 함수 실행
const searchButton = document.getElementById('searchbtn');
searchButton.addEventListener('click', searchMovie);

// 엔터 키 입력 = 검색 버튼 클릭
const searchIpt = document.getElementById('searchinput');
searchIpt.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMovie();
  }
});

// 헤더 클릭 -> (F5)
const main = () => {
  window.location.reload();
};