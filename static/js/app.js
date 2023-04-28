let link = 'https://pokeapi.co/api/v2/pokemon/';

document.querySelector('form').addEventListener('submit', function (event) {
	event.preventDefault();
	let pokemon = document.querySelector('#pokemon').value;
    pokemon=pokemon.toLowerCase();
	let newlink = link + pokemon;
    console.log(newlink);

	fetch(newlink)
        .then(function (response) {
		    //console.log("response");
		    return response.json();
	    })

        .then(function (s){
            document.querySelector('#pokeimage').innerHTML = '<img src="' + s.sprites.front_default + '" class="max-height">';
            document.querySelector('#pokeName').innerText=  `${s.name.charAt(0).toUpperCase() + s.name.slice(1)}`;
            document.querySelector('#pokeType').innerText=  `Type: ${s.types[0].type.name}`;
            let items = ""
            for (let i = 0; i < s.moves.length; i++) {
                items += `<li>${s.moves[i].move.name}</li>`
                if(i==9)
                    break;
            }
            document.querySelector('#pokeMoves').innerHTML= `<ul>${items}</ul>`
        })

        .catch(function(){
            console.log("error");
            document.querySelector('#pokeName').innerText= ''
            document.querySelector('#pokeType').innerText= ''
            document.querySelector('#pokeMoves').innerHTML= ''
            document.querySelector('#pokeimage').innerHTML = '<img src="https://www.serebii.net/pokemongo/pokemon/035.png"><p>Questo pokémon non esiste. Sicuro di averlo digitato correttamente?</p>';
        })
});

/*document.querySelector('#pokemon').addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#Invio').click();
    }
});*/