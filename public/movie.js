// const api_key = "?api_key=c820500c0a92520524ea977cc56c8a32"
// const base_url = "https://api.themoviedb.org/3";

$.ajax(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=c820500c0a92520524ea977cc56c8a32`).then(data => {
    console.log(data);
    let filmDis = $("<div class='card m-auto mb-3'>")
    filmDis.append(`<img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="img-fluid">`)
    filmDis.append(`<h2 class="card-title">${data.title}`)
    filmDis.append(`<p class="card-text">${data.overview}`)
    $("#movie_view").append(filmDis)
})