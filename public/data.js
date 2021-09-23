
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c820500c0a92520524ea977cc56c8a32`
        $.ajax({
            method: "GET",
            url: api_url,
            dataType: "json"
        }).done(data => {
            // console.log(data.results);
            const movies = data.results
            console.log(movies);
            $(movies).each((i, val) => {
                let parentDiv = $("<div class='card'>").addClass("card")
                let moviePoster = $("<img class='card-img-top'>").attr({ src: "https://image.tmdb.org/t/p/w500"+val.poster_path, alt: "poster" })
                let textDiv = $("<div class='card-body'>").html("<p class='card-text'>").text(val.title)
                let rating = $("<p class='card-text'>").css("text-align", "center").text("Rating: ")
                rating.append(val.vote_average)
                moviePoster.appendTo(parentDiv)
                parentDiv.append(textDiv, rating)
                $(".box").append(parentDiv)
                
            })
           

            
        })   


   

    



