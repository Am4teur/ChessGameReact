import React from "react";
import Board from './board.js';

import King from "../pieces/king.js";
import Queen from "../pieces/queen.js";
import Rook from "../pieces/rook.js";
import Bishop from "../pieces/bishop.js";
import Knight from "../pieces/knight.js";
import Pawn from "../pieces/pawn.js";


/* CONSTANTS */
var NROWS = 8;
var NCOLS = 8;


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.initBoard(),
      turn: 0,
      playerTurn: 0,
    };
  }

  handleClick(i, j) {
    //select new peace OR make a move with a selected pice
    let sqs = this.state.squares.slice();
    sqs[i][j] = "hand";
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
          onClick = {(i, j) => this.handleClick(i, j)}
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
    let initialBoard = matrix(NROWS, NCOLS, null);

    initialBoard[0][0] = new Rook(0); //"Rook";
    initialBoard[7][0] = new Rook(1); //"Rook";
    initialBoard[0][7] = new Rook(0); //"Rook";
    initialBoard[7][7] = new Rook(1); //"Rook";
    initialBoard[0][1] = new Knight(0); //"Knight";
    initialBoard[0][6] = new Knight(0); //"Knight";
    initialBoard[7][1] = new Knight(1); //"Knight";
    initialBoard[7][6] = new Knight(1); //"Knight";
    initialBoard[0][2] = new Bishop(0); //"Bishop";
    initialBoard[0][5] = new Bishop(0); //"Bishop";
    initialBoard[7][2] = new Bishop(1); //"Bishop";
    initialBoard[7][5] = new Bishop(1); //"Bishop";
    initialBoard[0][3] = new Queen(0); //"Queen";
    initialBoard[0][4] = new King(0); //"King";
    initialBoard[7][3] = new Queen(1); //"Queen";
    initialBoard[7][4] = new King(1); //"King";

    for(let i = 0; i < initialBoard[0].length ; ++i) {
      initialBoard[1][i] = new Pawn(0); //"Pawn";
      initialBoard[6][i] = new Pawn(1); //"Pawn";
    }

    return initialBoard;
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