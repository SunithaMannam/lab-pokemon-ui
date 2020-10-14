import React, { Component } from 'react';
import { Link, Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from "../components/auth/PrivateRoute";
import AddPokemon from './AddPokemon'
import Pokemon from "./Pokemon";
import { getAllPokemons,getMyPokemons } from '../services/pokemonService';
import './Pokemon.css';

class Home extends Component {
    
    state = {
        pokemons: [],
        mypokemons :[],
        srchpokemon: "",
        viewMyPokemons: false,
        isNewPokemon: false,
    }

    componentDidMount = () => {
        getAllPokemons( )
            .then(pokemons => {
                this.setState({ pokemons  })
            }).catch(err => console.log(err));
    }
    
    handleSearch = (evt) => {
        this.setState({ [evt.target.name ]: evt.target.value });
    }
    
    listAllPokemons = () => {
        console.log( "listAllPokemons ")
        this.setState({ viewMyPokemons: false, isNewPokemon: false })
    }
    listMyPokemons = () => {
        getMyPokemons(localStorage.getItem("accessToken"))
            .then(mypokes => {
                this.setState({ mypokemons: mypokes,viewMyPokemons:true,isNewPokemon: false} )
        })
    }
    
    addPokemon = () => {
        this.setState({ isNewPokemon : true})
    }
    
    render() {    
        console.log( "home props: ", this.props )
        // const { pokemons } = this.state;
        let pokemons = [];
        let {mypokemons} = this.state;
        if (this.state.viewMyPokemons) {
            console.log(mypokemons);
            pokemons = this.state.pokemons.filter(
                each =>
                (mypokemons.map(ele => ele.pokemonId).includes( each._id))  )
            
            console.log( pokemons)
        } else {
            pokemons = this.state.pokemons;
        }
        const dispPokemons =
            pokemons.filter(poke =>
                poke.name.toLowerCase().trim()
                    .includes(this.state.srchpokemon.trim().toLowerCase()))
            .map(poke => <Pokemon key={poke._id} pokeInfo={poke} />);
            // pokemons.map(poke => <Pokemon key={poke._id} pokeInfo={poke} />);
        
        return (
            <div>
                {/*  sub menu for create and view my pokemons */}
                <BrowserRouter>
                    <ul className="side-bar">
                        <li> <Link to="/all-pokemons" onClick={this.listAllPokemons}> All Pokemons </Link>   </li>                         
                        <li>  <Link to="/my-pokemons" onClick={this.listMyPokemons} > My Pokemons </Link> </li>
                        <li><Link to="add-pokemon" onClick={this.addPokemon}> Add Pokemon </Link> </li>  
                    </ul>

                </BrowserRouter>
                {/* <h1> WELCOME {this.props.user? this.props.user.username.toUpperCase():""} </h1> */}
                { !this.state.isNewPokemon && (<div>
                    {/*  Search pokemons input */}
                    <input
                        type="text"
                        name="srchpokemon"
                        value={this.state.srchpokemon}
                        placeholder="Search for Pokemons ..."
                        onChange={this.handleSearch}
                    />
                  <div className="pmons-disp">   {dispPokemons} </div>
                </div>
                )}
                { this.state.isNewPokemon &&  <AddPokemon/>}
            </div>
        )
    }
}

export default Home;