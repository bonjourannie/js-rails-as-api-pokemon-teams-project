const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch (TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(trainer => renderTrainerHTML(trainer))
    })

function renderTrainerHTML(trainer)
    let div = document.createElement("div")
    div.classList.add("card")
    div.setAttribute("data-id", trainer.id)
    let p = document.createElement("p")
    p.innerText = trainer.name 
    let addPokemonBtn = document.createElement("button")
    addPokemonBtn.setAttribute("data-trainer-id", trainer.id)
    addPokemonBtn.innerText = "Add Pokemon"
    div.appendChild(p)
    div.appendChild(addPokemonBtn)
    document.querySelector("main").appendChild(div)
    let ul = document.createElement("ul")
    
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let button = document.createElement("button")
        button.innerText = "ReleasePokemon"
        button.classList.add("release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        li.appendChild(button)
        ul.appendChild(li)
    })
    div.appendChild(ul)
}

function addPokemons(event){
    let trainedId = event.target.dataset.trainerId
        fetch (POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/jason"
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        })
        .then(resp => resp.json())
        .then(pokemon => {
            console.log("e", event)
            if (pokemon.error){
                alert(pokemon.error)
            }
            else {
                let li = document.createElement("li")
                li.innerText =`${pokemon.nickname} (${pokemon.species})`
                let button = document.createElement("button")
                button.innerText = "ReleasePokemon"
                button.setAttribute("data-pokemon-id", '${pokemon.id}')
                button.classList.add("release")
                li.appendChild(button)
                event.target.parentElement.querySelector("ul").appentChild(li)
            }
        })
    }

    funtion handleDelete(event) {
        let pokemonId = event.target.dataset.pokemonId 
        fetch(`${POKEMONS_URL}/${pokemonId}`, {
            method: "DELETE"
        })
        .then (resp => resp.json())
        .then (jason => {
            event.target.parentElement.remove()
        })
    }

    function attatchListeners(){
        document.querySelector("main").addEventListener("click", (event) => {
            let btnText = event.target.innerText
            if (btnText == "ReleasePokemon") {
                handleDelete(event)
            } else if (btnText == "AddPokemon") {
                addPokemons(event)
            }
        })
    }

}
 
attatchListeners()