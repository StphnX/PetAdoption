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
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Messages from './pages/Messages';
import Message from './components/Message';
import LoggedInHomepage from './pages/LoggedInHomepage';
import UserProfile from './pages/UserProfile';
import WriteMessage from './components/WriteMessage';
import NotFound from './pages/NotFound';



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
        <Route path='/pets' element={<Pets/>} />
        <Route path='/pets/:id' element={<PetDetails />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/message' element={<Message />} />
        <Route path='/home' element={<LoggedInHomepage />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/newmessage' element={<WriteMessage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
