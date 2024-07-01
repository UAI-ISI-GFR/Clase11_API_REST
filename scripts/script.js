document.getElementById('getAllBtn').addEventListener('click', fetchAllCharacters);
document.getElementById('filterBtn').addEventListener('click', fetchFilteredCharacters);

async function fetchAllCharacters() {
    try {
        var response = await fetch('https://rickandmortyapi.com/api/character');
        var data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        showError("Error al realizar la petición");
    }
}

async function fetchFilteredCharacters() {
    var name = document.getElementById('name').value;
    var status = document.getElementById('status').value;
    var species = document.getElementById('species').value;
    var type = document.getElementById('type').value;
    var gender = document.getElementById('gender').value;

    var query = `name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`;
    
    try {
        var response = await fetch(`https://rickandmortyapi.com/api/character/?${query}`);
        var data = await response.json();
        if (data.error) {
            showError("No se encontró al personaje");
        } else {
            displayCharacters(data.results);
        }
    } catch (error) {
        showError("Error al realizar la petición");
    }
}

function displayCharacters(characters) {
    var container = document.getElementById('characterContainer');
    container.innerHTML = '';
    characters.forEach(character => {
        var card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Type: ${character.type}</p>
            <p>Gender: ${character.gender}</p>
        `;
        container.appendChild(card);
    });
}

function showError(message) {
    var container = document.getElementById('characterContainer');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}
