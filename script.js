//Construir dos funciones que realicen una petición GET a la API de Rick ando Morty. La primera función debemos implementar los métodos de promesas .then() y .catch() y en la segunda función debemos hacer uso de las palabras claves async/await para consumir la promesa.

//1. Función usando .then() .catch()

const url = "https://rickandmortyapi.com/api/character";

const printCharacters = (container, charactersList) => {
  container.innerHTML = "";
  charactersList.forEach((character) => {
    container.innerHTML += `
        <article class="card">
            <img src=${character.image} alt=${character.name}>
            <section>
                <div>
                <h2>${character.name}</h2>
                <div class="status"><div class="icon ${
                  character.status.toLowerCase() === "alive"
                    ? "isAlive"
                    : character.status.toLowerCase() === "dead"
                    ? "isDead"
                    : "isUnKnown"
                }"></div><span>${character.status} - ${
      character.species
    }</span></div>
                </div>

                <div>
                    <h6>Última Localización</h6>
                    <p>${character.location.name}</p>
                </div>
                
                <div>
                    <h6>Primera vez visto en</h6>
                    <p>${character.origin.name}</p>
                </div>
            </section>
        </article>
        `;
  });
};

const getCharacters = (url) => {
  fetch(url)
    .then((response) => {
      response.json().then((result) => {
        console.log(result.results);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const returnCharacter = (url) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          // console.log(result.results);
          resolve(result.results);
        });
      })
      .catch((error) => reject(error));
  });

returnCharacter(url)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

//2. async/await
const getCharacters2 = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const characters = await getCharacters2(url);
  const container = document.querySelector("main");
  printCharacters(container, characters);
});
