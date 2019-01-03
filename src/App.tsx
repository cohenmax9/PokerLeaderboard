import React, { Component } from "react";
import "./App.css";
import PokerLeaderboard from "./components/PokerLeaderboard";
import PokerForm from "./components/PokerForm";
import { PokerPlayer } from "./interfaces/interfaces";

interface Props {}

interface State {
  data: PokerPlayer[];
}

export default class App extends Component<Props, State> {
  state = { data: [] };

  updatePokerData = (data: PokerPlayer[]) => {
    this.setState({ data });
  };

  render() {
    return (
      <div className="App">
        <PokerForm updatePokerData={this.updatePokerData} />
        <PokerLeaderboard
          data={this.state.data}
          updatePokerData={this.updatePokerData}
        />
      </div>
    );
  }
}
