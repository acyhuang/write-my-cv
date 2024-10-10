import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ContextContainer from './components/ContextContainer';
import CanvasContainer from './components/CanvasContainer';


function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ContextContainer />
        <CanvasContainer />
      </div>
    </div>
  );
}

export default App;
