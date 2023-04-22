let link = 'https://pokeapi.co/api/v2/pokemon/';

document.querySelector('#Invio').addEventListener('click', function (event) {
	event.preventDefault();
	let pokemon = document.querySelector('#pokemon').value;
    pokemon=pokemon.toLowerCase();
	let newlink = link + pokemon;
    console.log(newlink);

	fetch(newlink)
        .then(function (response) {
		    console.log("response");
		    return response.json();
	    })

        .then(function (s){
            document.querySelector('#pokeimage').innerHTML = '<img src="' + s.sprites.front_default + '" class="max-height">';
        })

        .catch(function(){
            console.log("error");
            document.querySelector('#pokeimage').innerHTML = '<img src="https://www.serebii.net/pokemongo/pokemon/035.png"><p>Questo pokémon non esiste. Sicuro di averlo digitato correttamente?</p>';
        })
});