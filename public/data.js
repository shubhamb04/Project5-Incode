const api_key = `api_key=c820500c0a92520524ea977cc56c8a32`
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${api_key}`;

fetchMovies(api_url)

function fetchMovies(url){
  $.ajax({
    method: "GET",
    url: url,
    dataType: "json",
  }).done((data) => {
    const movies = data.results;
    displayMovies(movies)
  })
} 

function displayMovies(movies){
 $(movies).each((i, val) => {
    let parentDiv = $("<div class='card'>").addClass("card");
    let moviePoster = $("<img class='card-img-top'>").attr({
      src: "https://image.tmdb.org/t/p/w500" + val.poster_path,
      alt: "poster",
    });
    let textDiv = $("<div class='card-body'>")
      .html(`<p class='card-text'><a href=${val.id}>${val.title}</a>`)
      
    let rating = $("<p class='card-text'>")
      .css("text-align", "center")
      .text("Rating: ");
    rating.append(val.vote_average);
    moviePoster.appendTo(parentDiv);
    parentDiv.append(textDiv, rating);
    $(".box").append(parentDiv);
  });
}

$("#searchForm").on("submit", (e) => {
  e.preventDefault();
  let searchText = $("#searchText").val();
  
  getMovie(searchText);
  
  console.log($("#searchForm"));
})

function getMovie(searchText) {
  console.log(searchText);
}