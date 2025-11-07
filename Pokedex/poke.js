const pokeApiUrl = "https://pokeapi.co/api/v2/";
const pokedex = () => {
    const pokemonStatsElements = {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed"),
    };

    let currentClassType = null;
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay'/>";
    const images = {
        imgPokemonNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif",
    };
    const containers = {
        imageContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElement: document.getElementById("pokemonId")
    };
    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    };
    const pokemonInput = document.getElementById("pokemonName");

    const processPokemonTypes = (pokemonData) => {
        let pokemonType = "";
        const firstClass = pokemonData.types[0].type.name;
        pokemonData.types.forEach((pokemonTypeData) => {
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
        });
        if (currentClassType) {
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType);
        }
        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);
        currentClassType = firstClass;
        containers.pokemonTypesContainer.innerHTML = pokemonType;
    };

    const processPokemonStats = (pokemonData) => {
        pokemonData.stats?.forEach((pokemonStatData) => {
            switch (pokemonStatData.stat.name) {
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
            }
        });
    };

    const processPokemonMoves = (pokemonData) => {
        let pokemonMovesContent = "";
        pokemonData.moves?.forEach((pokemonMove) => {
            pokemonMovesContent += `<li>${pokemonMove.move.name}</li>`;
        });
        containers.pokemonMovesElement.innerHTML = pokemonMovesContent;
    };

    const processPokemonAbilities = (pokemonData) => {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?.forEach((pokemonAbility) => {
            pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`;
        });
        containers.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
    };

    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };

    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };

    const getPokemonData = async (pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .catch((error) => ({requestFailed: true}));

    const checkDisabled = (button) => {
        button.disabled = button.id === "btnDown" && containers.pokemonIdElement.value <= 1;
    };

    const setPokemonData = async (pokemonName) => {
        if (pokemonName) {
            setLoading();
            const pokemonData = await getPokemonData(typeof pokemonName === typeof "" ? pokemonName.toLowerCase() : pokemonName);
            if (pokemonData.requestFailed) {
                containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound);
            } else {
                containers.imageContainer.innerHTML = `
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)}
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny)}
                `;
                containers.pokemonNameElement.innerHTML = pokemonData.name;
                containers.pokemonIdElement.value = pokemonData.id;
                processPokemonTypes(pokemonData);
                processPokemonStats(pokemonData);
                processPokemonAbilities(pokemonData);
                processPokemonMoves(pokemonData);
            }
            setLoadingComplete();
        } else {
            Swal.fire({
                title: "Error!",
                text: "Ingresa el nombre de un pokémon primero",
                icon: "error",
                confirmButtonText: "Aceptar.",
            });
        }
    };

    const triggers = () => {
        buttons.search.onclick = () => setPokemonData(pokemonInput.value);
        pokemonInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                setPokemonData(pokemonInput.value);
            }
        }
        buttons.next.onclick = () => setPokemonData(+containers.pokemonIdElement.value + 1);
        buttons.previous.onclick = () => setPokemonData(+containers.pokemonIdElement.value - 1);
    };
    setLoadingComplete();
    triggers();
};

window.onload = pokedex;
