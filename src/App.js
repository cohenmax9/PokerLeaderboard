import React, { Component } from "react";
import "./App.css";
import PokerLeaderboard from "./components/PokerLeaderboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PokerLeaderboard />
      </div>
    );
  }
}

export default App;