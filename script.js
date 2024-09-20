const pokemon_nome = document.getElementById('pokemon_nome');
const pokemon_imagem = document.getElementById('pokemon_imagem');
const pokemon_info = document.getElementById('pokemon_info');
const pokemon_caracteristicas = document.getElementById('pokemon_caracteristicas');
const pokemon_busca = document.getElementById('pokemon_busca');
const antes_btn = document.getElementById('antes_btn');
const prox_btn = document.getElementById('prox_btn');
const pokedex = document.getElementById('pokedex');

let currentPokemon = 1;

function fetchPokemon(id_ou_nome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id_ou_nome}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.log('Pokémon não encontrado!', error);
        });
}

function displayPokemon(data) {
    pokemon_nome.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemon_imagem.src = data.sprites.front_default;
    pokemon_info.textContent = `#${data.id} - Tipo: ${data.types.map(type => type.type.name).join(', ')}`;
    pokemon_caracteristicas.textContent = `Altura: ${(data.height / 10).toFixed(1)}M - Peso: ${(data.weight / 10).toFixed(1)} Kg`;

    mudarfundo(data.types[0].type.name);
}

function mudarfundo(type) {
        let color;
        switch (type) {
            case 'grass':
                color = '#70E000';
                break;
            case 'water':
                color = '#0FA3B1';
                break;
            case 'fire':
                color = '#FF8800';
                break;
            case 'rock':
                color = '#4A5759';
                break;
            case 'electric':
                color = '#FFD500';
                break;
            case 'fairy':
                color = '#F4978E';
                break;
            case 'steel':
                color = '#2F4858';
                break;
            case 'dark':
                color = '#231942';
                break;
            case 'ghost':
                color = '#9F86C0';
                break;
            case 'dragon':
                color = '#FFCB77';
                break;
            case 'ice':
                color = '#E0FBFC';
                break;
            case 'fighting':
                color = '#C4633E';
                break;
            case 'poison':
                color = '#7400B8';
                break;
            case 'ground':
                color = '#BC6C25';
                break;
            case 'flying':
                color = '#DEE2FF';
                break;
            case 'psychic':
                color = '#6D597A';
                break;
            case 'bug':
                color = '#006400';
                break;
            case 'normal':
                color = '#BABD8D';
                break;
            default:
                color = '#F4F1DE';
                break;
        }
        pokedex.style.backgroundColor = color;
    }//Precisa de ajuste e adicionar mais tipos

prox_btn.addEventListener('click', () => {
    currentPokemon++;
    fetchPokemon(currentPokemon);
});

antes_btn.addEventListener('click', () => {
    if (currentPokemon > 1) {
        currentPokemon--;
        fetchPokemon(currentPokemon);
    }
});
//botões não estão seguindo a ordem, refazer.

pokemon_busca.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const query = pokemon_busca.value.toLowerCase();
        fetchPokemon(query);
    }
});

fetchPokemon(currentPokemon);