//using the pokeapi.co API

let link = 'https://pokeapi.co/api/v2/pokemon';
let allPokemon = null;
const ex=['mr-mime', 'mime-jr']

document.addEventListener('DOMContentLoaded', function (e) {
    fetch(link + '?limit=1300')
        .then(function (response) {
            return response.json();
        })

        .then(function (s) {
            allPokemon = s.results.map(value =>{
                return {
                    ...value,
                    label: (value.name.charAt(0).toUpperCase() + value.name.slice(1)).replace('-', ' '),
                }
            }).filter(value => {
                if(!value.name.includes('-') || ex.includes(value.name)){
                    return value
                }
            })


            document.querySelector('#pokemon').addEventListener('keyup', function (event) {
                let v = event.currentTarget.value.toLowerCase()
                let filtered = allPokemon.filter(pokemon => pokemon.name.includes(v))
                document.querySelector('#autocompleteBox').innerHTML = ""
                console.log(filtered)
                if(v.length>2){
                    
                    document.querySelector('#autocompleteBox').classList.remove('is-hidden')
                    for(let i=0; i<filtered.length; i++){
                        document.querySelector('#autocompleteBox').innerHTML += `<a href="#" class="has-text-centered color-black">${filtered[i].label} </a>`
                    }

                    /*<img src="${filtered[i].sprites.front_default}"></img>*/
                }

                if(event.keyCode == 13){
                    document.querySelector('#autocompleteBox').classList.add('is-hidden')
                }
            });
        })

        .catch(function (e) {
            //TODO: handle error
        })

});

document.querySelector('form').addEventListener('submit', function (event) {
	event.preventDefault();
	let pokemon = document.querySelector('#pokemon').value;
    pokemon=slugify(pokemon);
	let newlink = link + '/' + pokemon;
    console.log(newlink);
    document.querySelector('#autocompleteBox').classList.add('is-hidden')

	fetch(newlink)
        .then(function (response) {
		    //console.log("response");
		    return response.json();
	    })

        .then(function (s){
            document.querySelector('#pokeimage').innerHTML = '<img src="' + s.sprites.front_default + '" class="max-height">';
            document.querySelector('#pokeName').innerText=  `${(s.name.charAt(0).toUpperCase() + s.name.slice(1)).replace('-', ' ')}`;
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
                    for(let i=0; i<response.flavor_text_entries.length; i++){
                        if(response.flavor_text_entries[i].language.name=='en'){
                            let newLore
                            newLore=response.flavor_text_entries[i].flavor_text.replace('\n', ' ')
                            newLore=newLore.replace('\f', ' ')
                            newLore=newLore.replace('POKéMON', 'Pokémon')
                            //console.log(newLore)
                            document.querySelector('#pokeLore').innerText = `${newLore}`
                            i=response.flavor_text_entries.length
                        }
                    }

                    if(response.evolves_from_species!=null)
                        document.querySelector('#evolvesFrom').innerText = `Evolves from: ${response.evolves_from_species.name.charAt(0).toUpperCase() + response.evolves_from_species.name.slice(1)}`;
                    else
                        document.querySelector('#evolvesFrom').innerText = `Evolves from: None`;
                })

                .catch(function(){
                    console.log("error", console.error());
                    document.querySelector('#pokeLore').innerText = `No description found`; 
                    document.querySelector('#pokeName').innerText= ''
                    document.querySelector('#pokeType').innerText= ''
                    document.querySelector('#pokeMoves').innerHTML= ''
                    document.querySelector('#pokeStats').innerText = ''
                    document.querySelector('#evolvesFrom').innerText = ''
                    document.querySelector('#pokeHeight').innerText = ''
                    document.querySelector('#pokeWeight').innerText = ''
                    document.querySelector('#pokeimage').innerHTML = '<img src="https://www.serebii.net/pokemongo/pokemon/035.png"><p>something went wrong *_*</p>';
                })
            //document.querySelector('#evolvesFrom').innerText = `Evolves from: ${s.species.name.charAt(0).toUpperCase() + s.species.name.slice(1)}`;
        })

        .catch(function(){
            console.log("error", console.error());
            console.error()
            document.querySelector('#pokeName').innerText= ''
            document.querySelector('#pokeType').innerText= ''
            document.querySelector('#pokeMoves').innerHTML= ''
            document.querySelector('#pokeStats').innerText = ''
            document.querySelector('#pokeLore').innerText = ''
            document.querySelector('#evolvesFrom').innerText = ''
            document.querySelector('#pokeHeight').innerText = ''
            document.querySelector('#pokeWeight').innerText = ''
            document.querySelector('#pokeimage').innerHTML = '<img src="https://www.serebii.net/pokemongo/pokemon/035.png"><p>This pokémon does not exist. Are you sure you spelled it correctly?</p>';
        })
});

function slugify (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}