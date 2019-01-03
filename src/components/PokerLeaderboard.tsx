import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import { formatWinnings } from "../utils/utils";
import { PokerPlayer } from "../interfaces/interfaces";

interface Props {
  data: PokerPlayer[];
  updatePokerData: (data: PokerPlayer[]) => void;
}

interface UpdatedGrid {
  fromRow: number;
  toRow: number;
  updated: {};
}

export default class PokerLeaderboard extends Component<Props> {
  async fetchPokerData(): Promise<PokerPlayer[]> {
    try {
      const response: Response = await fetch("/pokerPlayer");
      const data: PokerPlayer[] = await response.json();

      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      return data;
    } catch (err) {
      console.error("Error fetching poker data", err);
      return [];
    }
  }

  async componentDidMount() {
    const data: PokerPlayer[] = await this.fetchPokerData();
    this.props.updatePokerData(data);
  }

  onGridRowsUpdated = async ({ fromRow, updated }: UpdatedGrid) => {
    const rowToUpdate = { ...this.props.data[fromRow], ...updated };

    const response = await fetch("/pokerPlayer", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rowToUpdate)
    });

    const data: PokerPlayer[] = await response.json();
    this.props.updatePokerData(data);
  };

  formatData(data: PokerPlayer[]) {
    const sortedData = data.sort((a, b) =>
      a.winnings < b.winnings ? 1 : b.winnings < a.winnings ? -1 : 0
    );
    return sortedData.map(({ name, country, winnings }) => ({
      name,
      country,
      winnings: formatWinnings(winnings)
    }));
  }

  render() {
    const { data } = this.props;
    const formattedData = this.formatData(data);

    const columns = [
      { key: "name", name: "Player", editable: true },
      { key: "winnings", name: "Winnings", editable: true },
      { key: "country", name: "Native of", editable: true }
    ];
    const rowGetter = (rowNumber: number) => formattedData[rowNumber];

    return (
      <div>
        <h3>All-Time Tournament Earnings</h3>
        <ReactDataGrid
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={formattedData.length}
          minHeight={formattedData.length * 35 + 50}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>
    );
  }
}
