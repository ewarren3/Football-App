import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Components from "./Components/Components";
import Parse from "parse";

Parse.initialize("WlxyHgyyn9gTHN34zS4e2RLT0yDFkR8HpggoK457", "3XA6RzfxNbyMl4iAIgXHbMTsiYzvNl2bHqZC3rIF");
Parse.serverURL = "https://parseapi.back4app.com/";

// Root component of the Notre Dame Football application
function App() {
  return (
    <>
      <Components />
    </>
  )
}

export default App