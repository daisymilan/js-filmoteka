const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'api_key=b5e824a3d922f68ba211fcf6dbdcb6f5';
  const API_URL = BASE_URL + '/discover/movie?sort_by-popularity.desc&' + API_KEY;
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const searchURL = BASE_URL + '/search/movie?' + API_KEY;
  const getGenres = BASE_URL + '/genre/movie/list?' + API_KEY;
  //localStorage
  let currentMovieTitle, currentMovieID, queue, watched;
  JSON.parse(localStorage.getItem("movie-queue")) === null ? queue = [] : queue = JSON.parse(localStorage.getItem("movie-queue"));
  localStorage.setItem("movie-queue", JSON.stringify(queue));
  JSON.parse(localStorage.getItem("movie-watched")) === null ? watched = [] : watched = JSON.parse(localStorage.getItem("movie-watched"));
  localStorage.setItem("movie-watched", JSON.stringify(watched));
  // MODAL SECTION
  const modal = document.getElementById('myModal');
  const modalPoster = document.getElementById('modal-poster');
  const modalTitle = document.getElementById('modal-title');
  const modalVote = document.getElementById('modal-vote');
  const modalPopularity = document.getElementById('modal-popularity');
  const modalOrigTitle = document.getElementById('modal-original-title');
  const modalGenre = document.getElementById('modal-genre');
  const modalOverview = document.getElementById('modal-overview');
  const addToWatchedBtn = document.getElementById('addToWatchedBtn');
  const addToQueuBtn = document.getElementById('addToQueuBtn');
const closeBtn = document.getElementsByClassName('close')[0];
let genres;
fetch(getGenres)
    .then(response => response.json())
    .then(data => {
        genres = data.genres;
      getMovies(API_URL, genres); // Call getMovies with genres
      showMovies(data, genres)
    })
    .catch(error => {
        // console.error('Error fetching genres:', error);
    });
  // function to open the modal with movie details
  function openModal(movie) {
    modalPoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    modalTitle.textContent = movie.title.toUpperCase();
    modalVote.innerHTML = `
      <span class="vote-avg">${movie.vote_average.toFixed(1)}</span>` + '   /   ' + movie.vote_count;
    modalPopularity.textContent = movie.popularity.toFixed(1);
    modalOrigTitle.textContent = movie.original_title.toUpperCase();

    const movieGenres = movie.genre_ids.map(genreId => {
        const genre = genres.find(genre => genre.id === genreId);
        return genre ? genre.name : '';
    }).join(', ');
    modalGenre.textContent = movieGenres;
    modalOverview.textContent = movie.overview;
    modal.style.display = 'block';
    currentMovieID = movie.id;
    currentMovieTitle = movie.title;
  }
  // function to close the modal
  function closeModal() {
    modal.style.display = 'none';
  }
  // event listener for the close button
  closeBtn.addEventListener('click', closeModal);
  // event listener for clicks outside the modal
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  const main = document.getElementById('main');
  const form = document.getElementById('search-form');
  const search = document.getElementById('search-input');
  const loader = document.querySelector('.loader-container');
 
let lastUrl;
let currentPage = 1; // Initialize currentPage variable
let nextPage, prevPage, totalPages;
const prev = document.getElementById('prev');
const next = document.getElementById('next');
  getMovies(API_URL);
  // DISPLAY MOVIE CARDS
  function getMovies(url) {
    lastUrl = url;
    main.classList.toggle('is-hidden');
    loader.classList.toggle('is-hidden');
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        if (data.results.length !== 0) {
          showMovies(data.results);
          currentPage = data.page;
          main.classList.toggle('is-hidden');
          loader.classList.toggle('is-hidden');
          updatePaginationButtons(); // Update pagination buttons
        }else {
            main.classList.toggle('is-hidden');
            loader.classList.toggle('is-hidden');
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
          }      
          function updatePaginationButtons() {
      if (currentPage <= 1) {
            if (prev)  prev.classList.add('disabled');
            if (next) next.classList.remove('disabled');
            } else if (currentPage >= totalPages) {
            if (prev)  prev.classList.remove('disabled');
            if (next)  next.classList.add('disabled');
            } else {
             if (prev)  prev.classList.remove('disabled');
             if (next)  next.classList.remove('disabled');
            }
            prev.addEventListener('click', () => {
              if (prevPage > 0) {
              pageCall(prevPage);
              }
              });
              // Event listener for the next page
                   next.addEventListener('click', () => {
                     if (nextPage <= totalPages) {
                       pageCall(nextPage);
                     }
                   });
              } 
       });
  }
// Add event listeners for prev and next inside this block
    // prev = document.getElementById('prev');
    // next = document.getElementById('next');
// function for previous page
// if (prev) {
// prev.addEventListener('click', () => {
// if (prevPage > 0) {
//   pageCall(prevPage);
// }
// });
// }
//     // function for the next page
// if (next) {
// next.addEventListener('click', () => {
// if (nextPage <= totalPages) {
//   pageCall(nextPage);
// }
// });
// }
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
      const { title, poster_path, release_date, genre_ids } = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      const movieGenres = genre_ids && Array.isArray(genres)
            ? genre_ids.map(genreId => {
                const genre = genres.find(genre => genre.id === genreId);
                return genre ? genre.name : '';
            }).join(', ')
        : '';
      movieEl.innerHTML = `
            <img src="${poster_path
          ? IMG_URL + poster_path
          : 'http:/>/via.placeholder.com/1080x1500'
        }"
                alt="${title}"/>
            <div class="movie-info">
                <h3>${title.toUpperCase()}</h3>
                <div class="movie-details">
                <div>${movieGenres} | ${release_date.slice(0,4)}</div>
                </div>
                  </div>
                  `;
                  movieEl.addEventListener('click', function () {
                    openModal(movie);
                  });
      main.appendChild(movieEl);
    });
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
      getMovies(searchURL + '&query=' + searchTerm);
    } else {
      getMovies(API_URL);
    }
  });
  // function for previous page
  prev.addEventListener('click', () => {
    if (prevPage > 0) {
      pageCall(prevPage);
    }
  });
  // function for the next page
  next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
      pageCall(nextPage);
    }
  });
  export function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
      let url = lastUrl + '&page=' + page;
      getMovies(url);
    } else {
      key[1] = page.toString();
      let a = key.join('=');
      queryParams[queryParams.length - 1] = a;
      let b = queryParams.join('&');
      let url = urlSplit[0] + '?' + b;
      getMovies(url);
    }
  }
  //Add to Watched (localStorage)
  addToWatchedBtn.addEventListener('click', () => {
    watched.includes(currentMovieID) ?
      alert(`${currentMovieTitle} has been watched already`) :
      watched.push(currentMovieID);
    localStorage.setItem('movie-watched', JSON.stringify(watched));
  })
  //Add to Queue (localStorage)
  addToQueuBtn.addEventListener('click', () => {
    queue.includes(currentMovieID) ?
      alert(`${currentMovieTitle} has been added to the queue already`) :
      queue.push(currentMovieID);
    localStorage.setItem('movie-queue', JSON.stringify(queue));
  })
  //Pressing escape to close modal
  document.body.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  });