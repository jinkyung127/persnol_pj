const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjAwYjljMmY0NzA2MzIzMDdkNTk5Y2E2MDU1YWM4NSIsInN1YiI6IjY0NzM0ZDM0YmUyZDQ5MDBhN2Q2MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.904cgBblGnOetTZ00BRWJnlIigPpKGEFzmBXQRjeYHk",
  },
};

// fetch(
//   "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

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

// // 검색-표시 함수
// function searchList(val) {
//   list.innerHTML='';
//   const res = options.forEach(options => {
//     if(options.title.includes(val)) {
//       const li = document.createElement('li');
//       li.innerHTML=`<div class="col">
//                         <div class="card h-100">
//                             <img src="${image}"
//                                   class="card-img-top">
//                             <div class="card-body">
//                                   <h5 class="card-title">${title}</h5>
//                                   <p class="card-text">${content}</p>
//                                   <p>${rate}</p>
//                             </div>
//                         </div>
//                     </div>`
//       list.appendChild(li);
//     }
//   }) // end showList
// }

// console.log(searchList('god'));

// // 검색기능
// const searchInput = document.getElementById('movieName')
// const searchBtn = document.getElementById('searchbtn')

// searchBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const val = searchInput.ariaValueMax;
//   console.log(val);
// })