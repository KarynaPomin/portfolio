import logo from './logo.svg';
import './App.css';
import AboutPage from './Components/AboutPage';
import PricePage from './Components/PricePage';
import ProjectsPage from './Components/ProjectsPaje';
import { useState } from 'react';

function App() {
  const text = "pl";

  return (
    <>
      <main>
          <AboutPage text={text} />
          <PricePage text={text} />
          <ProjectsPage text={text} />
      </main>
    </>
  );
}

export default App;
