import axios from 'axios';

const service = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: true
});

// get all pokemons 
export const getAllPokemons = () => {

    return service.get("pokemon/all" )
    .then((pokemons) =>  pokemons.data)
    .catch((error) => console.log(error));
}

// get user specific pokemons
export const getMyPokemons = (token) => {
    console.log("getMyPokemons called ", token )
    const headers = {
        'accessToken': token,
    };
    return service.get("pokemon/myPokemons",  {headers} )
    .then((pokemons) =>  pokemons.data)
    .catch((error) => console.log(error));
}

//  create pokemon 
export const addNewPokemon = (pokeInfo,token) => {
    console.log("addNewPokemon called ", pokeInfo )
    const headers = {
        'accessToken': token,
    };
    // return service.post("user/login",loginDetails)
    return service.put("pokemon/new", pokeInfo, {headers} )
    .then((pokemoncreated) =>  pokemoncreated.data)
    .catch((error) => console.log(error));
}