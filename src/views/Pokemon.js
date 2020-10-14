import React from 'react'
import './Pokemon.css';

export default function Pokemon(props) {
    const { pokeInfo } = props;
    return (
       
       <div className=" pokemon "  >            
            <img  className="card-img-top" src={pokeInfo.image} alt="" />
            <div className="card-body pokemon-body">
                <h3 className="card-title">{pokeInfo.name}  </h3>
                <p className="card-text">  <strong> Poke-dox Number: </strong> {pokeInfo.pokedexnum} </p>
                <p className="card-text">  <strong> Type: </strong> {pokeInfo.pokemontype} </p>
                <p className="card-text">  <strong> Height: </strong> {pokeInfo.height} </p>
                <p className="card-text">  <strong> Weight: </strong> {pokeInfo.weight} </p>
            </div>
           
        </div>
    )
}
