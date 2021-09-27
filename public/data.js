const api_key = `api_key=c820500c0a92520524ea977cc56c8a32`;
const base_url = `https://api.themoviedb.org/3`;
const api_url = `${base_url}/discover/movie?sort_by=popularity.desc&${api_key}`;
const search_url = `${base_url}/search/movie?${api_key}`;
const rating_url = `${base_url}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${api_key}`
const kids_url = `${base_url}/genre/movie/list?${api_key}`

fetchMovies(api_url);

function fetchMovies(url) {
  $.ajax({
    method: "GET",
    url: url,
    dataType: "json",
  })
    .then((data) => {
      console.log(data);
      const movies = data.results;
      
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
    searchText = ""
  } else {
    fetchMovies(api_url);
  }
});

// function getMovie(name) {
//   fetchMovies(`${search_url}&query=${name}`)
// }

function displayMovies(movies) {
  let output = '';
  $(movies).each((i, val) => {
    output += `
      <div class="card">
        <img src="https://image.tmdb.org/t/p/w500${val.poster_path}" class="card-img-top" alt="movie poster">
        <div class="card-body p-0 mt-2">
          <h6 class="card-title text-center"><a class=' nav-link text-info' href=${val.id}>${val.title}</a></h6>
          <p class="card-text d-inline"><span class='badge bg-info text-dark'>TMdb</span> ${val.vote_average}</p>
          <p class="card-text d-inline float-end">${val.release_date.slice(0, 4)}</p>
        </div>
      </div>`
    $(".box").html(output);
  });
}

$("#kids-btn").click(() => {
  fetchMovies(kids_url)
})

$("#rating-btn").click(() => {
  fetchMovies(rating_url)
})

