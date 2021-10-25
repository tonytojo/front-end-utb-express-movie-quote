//Variable definitions
const myform = document.querySelector("#my-form");
const movie = document.querySelector("#movie");
const year = document.querySelector("#year");
const table = document.querySelector(".movie-list");
const info = document.querySelector('#info');
const movies = [];

//Define a class MovieHandler that will handle all about movies
//The class is a representaion for handling a quotes for a movie
class MovieHandler {
  constructor(movies, ths) {
    this.movies = movies; //Represents the result for movies
    this.ths = ths; //Represents the th for the thead
  }

  //Create the thead with all its children
  createTableHead() {
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");

    //Loop through the th list and add to thead and tr
    for (let key of this.ths) {
      var th = document.createElement("th");
      th.classList.add(key);
      th.innerHTML = key;
      tr.appendChild(th);
      thead.appendChild(tr);
    }

    table.appendChild(thead);
  }

  //Create a tbody with all its children
  createTable() {
    if (this.movies.length > 0) {
      let tbody = document.createElement("tbody");

      //Loop through the array of movies
      for (let element of this.movies) {
        let tr = table.insertRow();
        //Loop through the elemets of the object
        for (let key in element) {
          if (key === "type") 
            continue;
          let td = tr.insertCell();
          td.innerHTML = element[key];
          tr.appendChild(td);
        }

        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
    }
    else{
      info.style.display = "block";
      document.querySelector('#info').innerHTML = "The was no match for this search condition";
    }
  }

  //Delete all rows for thead and tbody
  deleteRows() {
    $("#myTable thead tr").remove();
    $("#myTable tbody tr").remove();
  }

  //Add new movies to the class
  addMovies(movies) {
    this.movies = movies;
  }

  //Is called when you click the submit button
  //Arguments:
  //Both movie and year is the input value from the form field
  getData = async (movie, year) => {
    let res, response;

    this.movies = [];

    //Both movie and year is given
    if (movie !== "" && year !== "") {
      res = await fetch(`/movies/search/movie/${movie}/year/${year}`);
      displayResult(await res.json());
    }
    //Only movie is given
    else if (movie !== "" && year === "") {
      res = await fetch(`/movies/search/movie/${movie}`);
      displayResult(await res.json());
    }
    //Only year is given
    else if (movie === "" && year !== "") {
      res = await fetch(`/movies/search/year/${year}`);
      displayResult(await res.json());
    } 
    //Invalid search give error message
    else {
      alert("You must at least fill in one field");
    }
  };
} // end MovieHandler

//Instansiate a new class of MovieHandler
movieEngine = new MovieHandler(movies, ["quote", "movie", "year"]);
info.style.display = "none";

//Event handler that is called when clicking submit
myform.addEventListener("submit", (event) => {
  event.preventDefault();

  info.style.display = "none";
  movieEngine.deleteRows();
  info.innerHTML = "";

  //Start the process to get from backend
  movieEngine.getData(movie.value, year.value);
});

//Create the tbody with all its children
const createTable = (table, movies) => {
  let tbody = document.createElement("tbody");

  //Loop through the array of movied
  for (let element of movies) {
    let tr = table.insertRow(); //Create a tr
    for (key in element) {
      if (key === "type") continue;
      let td = tr.insertCell(); //Create a td
      td.innerHTML = element[key];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
};

//Is called when we receive a result from backend
displayResult = (movies) => {
  if (movies.length !== 0) 
    movieEngine.addMovies(movies);
  movieEngine.createTableHead();
  movieEngine.createTable();
};