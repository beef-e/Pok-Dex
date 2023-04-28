//using the pokeapi.co API

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
            let types=""
            for (let i = 0; i < s.types.length; i++) {
                types += `${s.types[i].type.name.charAt(0).toUpperCase() + s.types[i].type.name.slice(1)}`
                if(i!=s.types.length-1)
                    types += ", "
            }
            document.querySelector('#pokeType').innerText=  `Type: ${types}`;
            let items = ""
            for (let i = 0; i < s.moves.length; i++) {
                items += `<li>${s.moves[i].move.name}</li>`
                if(i==9)
                    break;
            }
            document.querySelector('#pokeMoves').innerHTML= `<ul>${items}</ul>`
            document.querySelector('#pokeHeight').innerText = `Height: ${s.height/10} m`;
            document.querySelector('#pokeWeight').innerText = `Weight: ${s.weight/10} Kg`;
            document.querySelector('#pokeStats').innerHTML = `<ul><li>HP: ${s.stats[0].base_stat}</li> <li>Attack: ${s.stats[1].base_stat}</li> <li>Defense: ${s.stats[2].base_stat}</li> <li>Special Attack: ${s.stats[3].base_stat}</li> <li>Special Defense: ${s.stats[4].base_stat}</li> <li>Speed: ${s.stats[5].base_stat}</li></ul>`
            console.log(s.species.url);
            fetch(s.species.url)
                .then(function (response) {
                    return response.json();
                    document.querySelector('#pokeLore').innerText = `${response.flavor_text_entries[0].flavor_text}`
                })

                .then(function (response) {
                    let newLore
                    newLore=response.flavor_text_entries[0].flavor_text.replace('\n', ' ')
                    newLore=newLore.replace('\f', ' ')
                    newLore=newLore.replace('POKéMON', 'Pokémon')
                    console.log(newLore)
                    document.querySelector('#pokeLore').innerText = `${newLore}`
                })






            //document.querySelector('#evolvesFrom').innerText = `Evolves from: ${s.species.name.charAt(0).toUpperCase() + s.species.name.slice(1)}`;
        })

        .catch(function(){
            console.log("error", console.error());
            console.error()
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