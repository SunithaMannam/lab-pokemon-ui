import React, { Component } from 'react'
import { addNewPokemon } from '../services/pokemonService';

export default class AddPokemon extends Component {
     state = {
        name:"",
        image: "",
         pokemontype: "",
         pokedexnum:"",
         height:"",
         weight:"",
    }
    
    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [ name]:  value,
            })
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("add new pokemon   clicked ... ");
        console.log(this.state);
        addNewPokemon(this.state, localStorage.getItem("accessToken"))
            .then(addPokeResp => console.log(addPokeResp))
            .catch(err => console.log(err));
    }
    
    render() {
        const {  name, image,pokemontype,pokedexnum,height,weight} = this.state;
        return (
            <div>
                <h2> Add a Pokemon </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                     <label>Name : </label>
                    <input  className="form-control"
                        name="name"
                        value={name}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                        />
                    </div>
                   
                      <div className="form-group"><label>Image URL : </label>
                    <input  className="form-control"
                        name="image"
                        value={image}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                     <label>Type : </label>
                    <select  value={pokemontype}
                        name="pokemontype"    className="form-control"
                         onChange={this.handleChange}
                    >
                        <option value="grass">GRASS</option>
                        <option value="water">WATER</option>
                        <option value="normal">NORMAL</option>
                        <option value="fire">FIRE</option>
                        <option value="electric">ELECTRIC</option>
                        </select>
                    </div>
                   
                    <div className="form-group">
                      <label>Pokedex number : </label>
                    <input  className="form-control"
                        name="pokedexnum"
                        value={pokedexnum}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                        />
                    </div>
                  
                    <div className="form-group">
                              <label>Height : </label>
                    <input  className="form-control"
                        name="height"
                        value={height}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
               
                    <div className="form-group">
                         <label>Weight : </label>
                    <input  className="form-control"
                        name="weight"
                        value={weight}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    
          <button   className="btn btn-primary  w-25 justify-content-center"> Add Pokemon </button>
                </form>
             </div>
        )
    }
}
