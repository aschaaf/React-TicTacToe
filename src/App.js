import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Tic Tac Toe",
      winner: false,
      winning_banner: "",
      player_turn: "X",
      board: ["", "", "", "", "", "", "", "", ""]
    };
  }

  squareClicked(index) {
    let player_turn = this.state.player_turn;
    let board = this.state.board;
    let winning_banner = this.state.winning_banner;
    let winner = this.state.winner;

    if (winner) {
      return;
    }

    board[index] = player_turn;

    let winning_combos = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Col 1
      [1, 4, 7], // Col 2
      [2, 5, 8], // Col 3
      [0, 4, 8], // Diag 1
      [2, 4, 6] // Diag 2
    ];

    for (let i = 0; i < winning_combos.length; i++) {
      let winning_row = winning_combos[i];
      let p1 = winning_row[0];
      let p2 = winning_row[1];
      let p3 = winning_row[2];

      if (
        board[p1] !== "" &&
        board[p1] === board[p2] &&
        board[p2] === board[p3] &&
        board[p3] === board[p1]
      ) {
        winning_banner = player_turn + " Wins!";
        winner = true;
      }
    }
    player_turn = player_turn == "X" ? "O" : "X";

    this.setState({
      player_turn: player_turn,
      board: board,
      winning_banner: winning_banner,
      winner: winner
    });
  }

  resetBoard() {
    let board = this.state.board;
    board = ["", "", "", "", "", "", "", "", ""];

    this.setState({
      board: board,
      winner: false,
      player_turn: "X"
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <div className="board">
          {this.state.board.map((square, index) => {
            return (
              <div onClick={() => this.squareClicked(index)} className="square">
                <h3 className="symbol">{square}</h3>
              </div>
            );
          })}
        </div>
        {this.state.winner && (
          <div>
            <h2>{this.state.winning_banner}</h2>
            <button type="button" onClick={() => this.resetBoard()}>
              Reset?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
