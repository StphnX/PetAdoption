import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Home from './pages/home';
import MainContent from './components/MainContent';
import { NavLink, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import About from './pages/About';
import CreateAdd from './pages/CreateAdd';
import Messages from './pages/Messages';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/createadd' element={<CreateAdd/>} />
        <Route path='/messages' element={<Messages/>} />
      </Routes>
    </>
  );
}

export default App;

          // <Route path='/api/pokemon' element={<App pokemons={pokemons} />} />
          // <Route path='/api/pokemon/:id/' element={<Pokemon />} />
          // <Route path='/api/pokemon/:id/:info/' element={<PokemonInfo />} />
          // <Route path='/api/pokemon/:id/fight/' element={<PokeFight allPokemons={pokemons} singlePokemon={pokemonSelection} />} />
          // <Route path='/pokewinner/:winner/:pokedexId' element={<PokeCard allPokemons={pokemons}/>} />