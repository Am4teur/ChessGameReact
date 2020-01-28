import React from "react";
import Board from './board.js';

/* CONSTANTS */
var NROWS = 8;
var NCOLS = 8;


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

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.initBoard(),
      turn: 0,
      player: "white",
    };
  }

  initBoard() {
    let initialBoard = matrix(NROWS, NCOLS, null);

    initialBoard[0][0] = "Rook";//<img class='piece' src={ require('../chessPieces/black_pawn.png') } />;
    initialBoard[0][7] = "Rook";
    initialBoard[7][0] = "Rook";
    initialBoard[7][7] = "Rook";
    initialBoard[0][1] = "Knight";
    initialBoard[0][6] = "Knight";
    initialBoard[7][1] = "Knight";
    initialBoard[7][6] = "Knight";
    initialBoard[0][2] = "Bishop";
    initialBoard[0][5] = "Bishop";
    initialBoard[7][2] = "Bishop";
    initialBoard[7][5] = "Bishop";
    initialBoard[0][3] = "Queen";
    initialBoard[0][4] = "King";
    initialBoard[7][3] = "Queen";
    initialBoard[7][4] = "King";

    for(let i = 0; i < initialBoard[0].length ; ++i) {
      initialBoard[1][i] = "Pawn";
      initialBoard[6][i] = "Pawn";
    }

    return initialBoard;
  }

  handleClick(i, j) {
    let sqs = this.state.squares.slice();
    sqs[i][j] = "hand";
    this.setState({
      squares: sqs,
      turn: 0,
      player: "white",
    });
  }

  render() {
    const squares = this.state.squares.slice();
    let status = "Next player: " + this.state.player;
    const moves = "No moves";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {squares}
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
}
