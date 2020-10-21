import React from "react";
import "./App.scss";
import Nav from "./components/Navbar"
import Home from "./components/routes/Home"
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav/>
      <Home/>
      </header>
    </div>
  );
}

export default App;
