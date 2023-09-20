import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import NotifyMe from './components/NotifyMe';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <NotifyMe />
      <Contact />
    </div>
  );
}

export default App;
