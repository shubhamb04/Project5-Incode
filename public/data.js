const api_key = `api_key=c820500c0a92520524ea977cc56c8a32`;
const base_url = `https://api.themoviedb.org/3`;
const api_url = `${base_url}/discover/movie?sort_by=popularity.desc&${api_key}`;
const search_url = `${base_url}/search/movie?${api_key}`;

fetchMovies(api_url);

function fetchMovies(url) {
  $.ajax({
    method: "GET",
    url: url,
    dataType: "json",
  })
    .then((data) => {
      const movies = data.results;
      console.log(movies[0]);
      displayMovies(movies);
    })
    .catch((error) => {
      console.log(error);
    });
}

$("#searchForm").on("submit", (e) => {
  e.preventDefault();
  let searchText = $("#searchText").val();
  if (searchText) {
    fetchMovies(`${search_url}&query=${searchText}`);
  } else {
    fetchMovies(api_url);
  }
});

// function getMovie(name) {
//   fetchMovies(`${search_url}&query=${name}`)
// }

function displayMovies(movies) {
  $(movies).each((i, val) => {
    let parentDiv = $("<div class='card'>").addClass("card");
    let moviePoster = $(
      `<img class='card-img-top' src="https://image.tmdb.org/t/p/w500${val.poster_path}" alt="movie poster">`
    );
    let textDiv = $(
      `<div class='card-body'><h6 class='card-title text-center'><a class=' nav-link text-info' href=${val.id}>${val.title}</a></h6></div>`
    );
    let rating = $(
      "<p class='card-text'><span class='badge bg-info text-dark'>TMdb</span> </p>"
    );
    rating
      .append(val.vote_average)
      .append(`<p class="card-text d-inline float-end">${val.release_date.slice(0, 4)}`);
    moviePoster.appendTo(parentDiv);
    parentDiv.append(textDiv, rating);
    $(".box").append(parentDiv);
  });
}
