// Get the searched movie / tvshow
$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


function getMovies(searchText){
  console.log(searchText);


  // starts api call
  function getMovieInfo(){
      $.ajax({
          url: 'https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=' + searchText,
          //url with the search function info
          // url: 'https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=justice',
          type: 'get',
          data: {

          },
          headers: {
              'X-Mashape-Key': 'z1xDPj8j13mshYzCH5sYSURkdDHSp10Oin6jsn5ONzNlAotpfC' // my api key
          },
          dataType: 'json',
          success: function(data) {
              console.log(data);
              var y = 0;

              //x is for the $.each where I go through each movie



              // //These are just so I can quickly refrence all the different outputs
              // console.log(data.results[0]);
              // console.log(data.results[0].name);
              // console.log(data.results[0].picture);
              // console.log(data.results[0].locations[0].display_name);
              // console.log(data.results[0].locations[0].icon);
              // console.log(data.results[0].locations[0].url);

              //testing out how to change html picture and other elements

              // name.innerText = data.results[0].name;
              // $("#picture").attr('src', data.results[0].picture);
              let output = '';

              for (var x = 0; x < data.results.length; x++) {
                  console.log(x);
                  console.log(data.results[x]);
                  var movieName = data.results[x].name;
                  var moviePosterUrl = data.results[x].picture;

                  //THIS IS THE CARD LAYOUT BEING DISPLAYED:
                  // <div class="card" style="width: 20rem;">
                  //   <img class="card-img-top" src="..." alt="Card image cap">
                  //   <div class="card-block">
                  //     <h4 class="card-title">Card title</h4>
                  //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  //     <a href="#" class="btn btn-primary">Go somewhere</a>
                  //   </div>
                  // </div>

                  //START output card div
                  //example just the <h1>
                  output += `
                  <div class="card" style="width: 20rem;">
                  <img class="card-img-top" src="${data.results[x].picture}" alt="Card image cap">
                  <div class="card-block">
                  <h4 class="card-title">${data.results[x].name}</h4>
                  `;

                  //This section goes though and gets all the different links to watch the movie
                  // it also outputs the card with link to movie
                  //example: just the thing inbetween the <h1> and the </h1>, or maybe a <strong>ASdf</strong>
                  // this section also switches between disabled and enabled with the cards
                  for (var i = 0; i < data.results[x].locations.length; i++) {
                    var location = data.results[x].locations[i].display_name
                    var locationUrl = data.results[x].locations[i].url
                    if (location == "iTunes") {
                      console.log("ITUNES");
                      console.log(locationUrl);
                      output += `
                      <br>
                      `;
                      output += `
                      <a href="${locationUrl}" class="btn btn-primary">Watch On ${location}</a>
                      `;
                    }
                    if (location == "Netflix") {
                      console.log("NETFLIX");
                      //The reason for the substring is because for netflix the link starts with nflx://   example: nflx://www.netflix.com/title/80088567
                      console.log(locationUrl.substring(7));
                      var netflixLink = locationUrl.substring(7);
                      output += `
                      <br>
                      `;
                      output += `
                      <a href="https://${netflixLink}" class="btn btn-primary">Watch On ${location}</a>
                      `;
                      //The reason for the https:// is because we remove the first few letters from the link, and now need to add the https cus other links have it but for some reason netflix doesnt.
                      //api issue
                    }
                    if (location == "Amazon Instant") {
                      console.log("AMAZON INSTANT");
                      console.log(locationUrl);
                      output += `
                      <br>
                      `;
                      output += `
                      <a href="${locationUrl}" class="btn btn-primary">Watch On ${location}</a>
                      `;
                    }
                    if (location == "Amazon Prime") {
                      console.log("AMAZON PRIME");
                      console.log(locationUrl);
                      output += `
                      <br>
                      `;
                      output += `
                      <a href="${locationUrl}" class="btn btn-primary">Watch On ${location}</a>
                      `;
                    }
                    if (location == "Google Play") {
                      console.log("Google Play");
                      console.log(locationUrl);
                      output += `
                      <br>
                      `;
                      output += `
                      <a href="${locationUrl}" class="btn btn-primary">Watch On ${location}</a>
                      `;
                    }

                  }

                  //ENDS the output, so all the </div> n such.
                  //example the </h1>
                  output += `
                    </div>
                  </div>
                  `;

              }

              $('#movies').html(output);





          }
      });
  }

      $('#btn').click(function(e) {
        e.preventDefault();
         getMovieInfo();


  });
    getMovieInfo();

}
