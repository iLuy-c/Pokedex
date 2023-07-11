const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.buscar');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonAtual = -1;


// função que irá fazer requisição na API
async function buscarPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    // realizando arequisição e obtendo a uma resposta
    const response = await fetch(url);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    }
}

// função que irá renderinzar o pokemon na página
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await buscarPokemon(pokemon);
    console.log(data);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        pokemonAtual = data.id;
    }
    else {
        pokemonName.innerText = "Não encontrado t-t";
        pokemonNumber.innerText = "";
        pokemonImage.style.display = 'none';
    }
}

// evento de submit do formulário
form.addEventListener( 'submit', (e) => {
    // impede a página de dar o 'reload'
    e.preventDefault();
    // chamando a função renderPokemon passando o value digitado no input
    renderPokemon(input.value.toLowerCase());
})

// botão para passar para o proximo ou anterior
btnNext.addEventListener('click', () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
})

btnPrev.addEventListener('click', () => {
    if (pokemonAtual > 1) {
        pokemonAtual --;
        renderPokemon(pokemonAtual);
    }
})

renderPokemon(pokemonAtual)