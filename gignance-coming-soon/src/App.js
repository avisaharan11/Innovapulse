import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import NotifyMe from './components/NotifyMe';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <NotifyMe />
      <Footer />
    </div>
  );
}

export default App;
