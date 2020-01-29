import React from "react";
import Board from './board.js';
import King from "../pieces/king.js";


/* CONSTANTS */
var NSQUARES = 64;


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.initBoard(),
      turn: 0,
      playerTurn: 0,
    };
  }

  handleClick(i) {
    //select new peace OR make a move with a selected pice
    let sqs = this.state.squares.slice();
    sqs[i] = "hand";
    this.setState({
      squares: sqs,
      turn: 0,
      playerTurn: this.state.playerTurn === 0 ? 1 : 0,
    });
  }

  render() {
    //const squares = this.state.squares.slice();
    let status = "Next player: " + this.state.playerTurn;
    const moves = "No moves";

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares = {this.state.squares}
          onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  initBoard() {
    let squares = Array(NSQUARES).fill(null);

    for(let i = 8; i < 16; i++){
      squares[i] = new King(2);
      squares[i+40] = new King(1);
    }
    squares[0] = new King(2);
    squares[7] = new King(2);
    squares[56] = new King(1);
    squares[63] = new King(1);
  
    squares[1] = new King(2);
    squares[6] = new King(2);
    squares[57] = new King(1);
    squares[62] = new King(1);
  
    squares[2] = new King(2);
    squares[5] = new King(2);
    squares[58] = new King(1);
    squares[61] = new King(1);
  
    squares[3] = new King(2);
    squares[4] = new King(2);
  
    squares[59] = new King(1);
    squares[60] = new King(1);
  
    return squares;
  }
}

/* ============================== */
/* HELPER FUNCTION                */
/* ============================== */

function matrix(rows, cols, defaultValue){
  var arr = [];
  for(var i=0; i < rows; i++){
      arr.push([]);
      arr[i].push( new Array(cols));
      for(var j=0; j < cols; j++){
        arr[i][j] = defaultValue;
      }
  }
  return arr;
}