import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { ContextContainer } from './components/ContextContainer/ContextContainer';
import CanvasContainer from './components/CanvasContainer';


function App() {
  const [coverLetter, setCoverLetter] = useState<string>('');
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ContextContainer 
          onCoverLetterGenerated={setCoverLetter}
          currentCoverLetter={coverLetter}
        />
        <CanvasContainer 
          coverLetter={coverLetter}
          onCoverLetterChange={setCoverLetter}
        />
      </div>
    </div>
  );
}

export default App;
