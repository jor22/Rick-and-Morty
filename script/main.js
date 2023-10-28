var api = "https://rickandmortyapi.com/api/character";
var next = undefined;

async function getCharacters() {
  const response = await fetch(api);
  const characters = await response.json();

  allCharact = [];
  next = characters.info.next;

  characters.results.forEach((character) => {
    const image = document.createElement("img");
    image.classList.add("character-img");
    image.src = character.image;

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("name-container");

    const characterName = document.createElement("h2");
    characterName.classList.add("character-name");
    characterName.textContent = character.name;
    nameContainer.append(characterName);

    const statusContainer = document.createElement("div");
    statusContainer.classList.add("status");
    const statusIcon = document.createElement("div");
    const status = document.createElement("h5");
    status.textContent = character.status + " - " + character.species;

    if (character.status == "Alive") {
      statusIcon.style.background = "rgb(85 204 68)";
    } else if (character.status == "Dead") {
      statusIcon.style.background = "#ff0100";
    } else {
      statusIcon.style.background = "#ffffff";
    }

    statusContainer.append(statusIcon, status);

    const locationContainer = document.createElement("div");
    locationContainer.classList.add("location");
    const locationIcon = document.createElement("img");
    locationIcon.src = "./Assets/location-icon.png";
    const location = document.createElement("h5");
    location.textContent = character.location.name;
    locationContainer.append(locationIcon, location);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    infoContainer.append(statusContainer, locationContainer);

    const container = document.createElement("article");
    container.classList.add("character-card");

    cardInfo.append(nameContainer, infoContainer);
    container.append(image, cardInfo);

    allCharact.push(container);
  });

  document.querySelector(".cards-container").append(...allCharact);
}

getCharacters();

function loadMore() {
  if (next != undefined) {
    api = next;
    getCharacters();
  } else {
    alert("No more characters!");
  }
}
