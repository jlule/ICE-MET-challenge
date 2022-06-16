import ArtGetter from "./artGetter.js";
const myGetter = new ArtGetter("artistSelect", "output");

myGetter.init();

// function submit() {
//     // const artist = document.querySelector("#artistSelect").value;
//     myGetter.filterByArtist(artist);
//     console.log("I submit!");
// }

// document.querySelector("#artistButton").addEventListener("click", submit);

console.log("Inside main");

document.forms["art"].addEventListener("submit", (e) => {
    document.getElementById("output").innerHTML = " ";
    e.preventDefault();
    // e.target would contain our form in this case
    myGetter.getSearch();
  });