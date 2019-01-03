import React, { Component, SyntheticEvent } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { PokerPlayer } from "../interfaces/interfaces";

interface Props {
  updatePokerData: (data: PokerPlayer[]) => void;
}

interface State {
  name: string;
  country: string;
  winnings: string;
}

export default class PokerForm extends Component<Props, State> {
  state = {
    name: "",
    country: "",
    winnings: ""
  };

  handleInputChange = (field: string, value: string | number) => {
    this.setState({ ...this.state, [field]: value });
  };

  handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const response: Response = await fetch("/pokerPlayer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });

    const data: PokerPlayer[] = await response.json();
    this.props.updatePokerData(data);
  };

  render() {
    return (
      <form>
        <InputLabel>Name: </InputLabel>
        <Input
          name="name"
          onChange={event => this.handleInputChange("name", event.target.value)}
        />
        <InputLabel>Country: </InputLabel>
        <Input
          name="country"
          onChange={event =>
            this.handleInputChange("country", event.target.value)
          }
        />
        <InputLabel>Winnings: </InputLabel>
        <Input
          name="winnings"
          type="number"
          onChange={event =>
            this.handleInputChange("winnings", parseInt(event.target.value))
          }
        />
        <Button type="submit" color="primary" onClick={this.handleSubmit}>
          Add Player
        </Button>
      </form>
    );
  }
}
