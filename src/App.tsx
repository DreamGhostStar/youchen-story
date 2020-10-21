import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button';
import Transition from './components/Transition/transition';
import Alert from './components/Alert/alert';
import './App.css'
import axios from 'axios'

library.add(fas)

function App() {
  return (
    <div className="App">
      <Button>xxx</Button>
    </div >
  );
}

export default App;
