let movieDataList = [];
let posterBasePath = '';
let posterSize = '';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmZkN2YyODViMWNiMjY2NjlmODY5ZDVhMTllNzIxOCIsIm5iZiI6MTcyMTkwNTU0Ny4wMzcyMzQsInN1YiI6IjY2YTIzMDk2YTgzMGJkMDA4ZjA4ODkxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gKJeBPl5DudWXXPTzAryqmQihQfRtRgL4G0xA6yYOyY'
  }
};

const details = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmZkN2YyODViMWNiMjY2NjlmODY5ZDVhMTllNzIxOCIsIm5iZiI6MTcyMTkwNTU0Ny4wMzcyMzQsInN1YiI6IjY2YTIzMDk2YTgzMGJkMDA4ZjA4ODkxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gKJeBPl5DudWXXPTzAryqmQihQfRtRgL4G0xA6yYOyY'
  }
};



async function fetchMovies() {


  const movieMain = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
  const movieDetails = await fetch('https://api.themoviedb.org/3/configuration', details);  
  

  const movieDataMain = await movieMain.json();
  const movieDataDetail = await movieDetails.json();


  movieDataList = movieDataMain.results;
  posterBasePath = movieDataDetail.images.base_url;
  posterSize = movieDataDetail.images.poster_sizes[3];
  console.log(movieDataDetail);
  appendMovies(movieDataList);
}


function appendMovies(movies) {
  let temp_html = '';
  movies.forEach(movie => {
    const posterFilePath = movie.poster_path;
    const movieTitle = movie.title;
    const movieOverview = movie.overview;
    const movieRating = parseFloat(movie.vote_average.toFixed(1));
    const movieId = movie.id;
    const posterAllPath = posterBasePath + posterSize + posterFilePath;

    temp_html += `
        <div class="card-container" id="movie-card" data-movieIdData="${movieId}" style="width: 18rem;">
          <img src="${posterAllPath}" class="movie-img" alt="영화 포스터">
          <h2 class="movie-title">${movieTitle}</h2>
          <p class="movie-overview">${movieOverview}</p>
          <p class="movie-rating"> ⭐ ${movieRating}</p>
        </div>`;
  });


  document.getElementById('movie-list').innerHTML = temp_html;
}

document.addEventListener('DOMContentLoaded', function () {
  fetchMovies();

 
  document.getElementById('search-btn').addEventListener('click', function () {
    searchMovies();
  });
 
  document.getElementById('search-input').addEventListener('input', function (event) {
    searchMovies();
  })
  
  document.getElementById('serach-goodMovie').addEventListener('click', function () {
    goodMovies();
  });

  
  document.getElementById('return-btn').addEventListener('click', function () {
    fetchMovies();
  });

  
  document.getElementById('movie-list').addEventListener('click', function (event) {
    const movieCard = event.target.closest('#movie-card');
    const movieId = movieCard.getAttribute('data-movieIdData');
    alert(`영화 ID : ${movieId}`);
  });

 
});

function searchMovies() {
  const searchKeyword = document.getElementById('search-input').value.toLowerCase();
  if (searchKeyword === '') {
  
    console.log("검색어를 입력해주세요.");
    appendMovies(movieDataList);
  } else {
   
    const filterMovies = movieDataList.filter(movie => movie.title.toLowerCase().includes(searchKeyword));
    appendMovies(filterMovies);
  }
}

function goodMovies() {
  const filterGoodMovies = movieDataList.filter(movie => parseFloat(movie.vote_average.toFixed(1)) >= 8.6);
  appendMovies(filterGoodMovies);
}