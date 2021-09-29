// const api_key = "?api_key=c820500c0a92520524ea977cc56c8a32"
// const base_url = "https://api.themoviedb.org/3";

$.ajax(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=c820500c0a92520524ea977cc56c8a32`).then(data => {
    console.log(data);
    const details = [data.genres[0].name, data.original_language, data.production_companies[0].name, data.release_date, data.runtime, data.vote_average, data.tagline];
    let filmDis = $("<div class='row'>")
    filmDis.append(`<div class="col-md-4"><img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="img-fluid"></div>`)
    filmDis.append(`<div class="col-md-8"><h2 class="card-title">${data.title}</h2><ul class="list-group"><li class="list-group-item bg-secondary text-info"><strong>Genre: ${details[0]}<li class="list-group-item bg-secondary text-info"><strong>Language: ${details[1]}<li class="list-group-item bg-secondary text-info"><strong>Production: ${details[2]}<li class="list-group-item bg-secondary text-info"><strong>Release Date: ${details[3]}<li class="list-group-item bg-secondary text-info"><strong>Duration: ${details[4]} Min<li class="list-group-item bg-secondary text-info"><strong>Rating: ${details[5]} <button class="btn btn-info" id="rate-btn">Rate</li><li class="list-group-item bg-secondary text-info"><strong>Tagline: ${details[6]}</ul>`)
    filmDis.append(`<p class="card-text mt-2">${data.overview}`)
    $("#movie_view").append(filmDis)
})

$("#rate-btn").on("click", () => {
    console.log("clicked");
})