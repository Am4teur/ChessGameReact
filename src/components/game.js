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
      history: [{
        squares: this.initBoard(),
      }],
      turn: 0,
      playerTurn: 0,  //could be derived from this.state.turn but its more readable like this
      selectedPiece: null,
      selectedPiecei: null,
      selectedPiecej: null,
      possibleMoves: [],
      check: null,
    };
  }

  handleClick(i, j) {
    //select new peace OR make a move with a selected pice
    const history = this.state.history.slice(0, this.state.turn + 1);;
    const current = history[history.length - 1];
    let sqs = current.squares.slice();

    const selp = this.state.selectedPiece;
    const seli = this.state.selectedPiecei;
    const selj = this.state.selectedPiecej;

    if(selp) { //do something with piece selected
      if(selp.canMove(seli, selj, i, j, sqs)) {
        const sqFull = sqs[i][j] ? true : false;
        sqs[i][j] = sqs[seli][selj]; //(at least) this 2 lines should be atomic (=>lock)
        sqs[seli][selj] = null;      //(at least) this 2 lines should be atomic (=>lock)

        /* Begin of "En Passant" Move */
        const p = this.state.playerTurn === 0 ? -1 : 1;
        if(this.removeEnPassantPiece(selp, sqFull)) {
          sqs[i + p][j] = null;
        }
        this.clearEnPassant(sqs);
        this.setEnPassant(selp, seli, i);
        /* End of "En Passant" Move */
        /* Begin of "Swap King" Move */
        if((selp.constructor.name === "King" || selp.constructor.name === "Rook") && selp.firstMove === true) {
          if(this.isSwapKingMove(selp, selj, j)) {
            if(selj + 2 === j) {
              sqs[seli][selj + 1] = sqs[seli][7];
              sqs[seli][7] = null;
            }
            else {
              sqs[seli][selj - 1] = sqs[seli][0];
              sqs[seli][0] = null;
            }
          }
          selp.firstMove = false;
        }
        /* End of "Swap King" Move */
        /* Begin of "Pawn at the end" Move */
        if(selp.constructor.name === "Pawn" && (i===7 || i ===0)) {
          // pedir input ao user
          sqs[i][j] = new Queen(this.state.playerTurn);
        }
        /* End of "Pawn at the end" Move */

        this.setState({
          history: history.concat([{
            squares: sqs,
          }]),
          turn: history.length,
          playerTurn: this.state.playerTurn === 0 ? 1 : 0,
          check: this.check(),
        });
      }

      this.setState({
        selectedPiece: null,
        selectedPiecei: null,
        selectedPiecej: null,
        possibleMoves: [],
      });
    }
    else if(sqs[i][j] && sqs[i][j].player === this.state.playerTurn){ //select piece
      this.setState({
        selectedPiece: sqs[i][j],
        selectedPiecei: i,
        selectedPiecej: j,
        possibleMoves: sqs[i][j].computeMoves(i, j, sqs),
      });
      /* testing */
      //console.log(sqs[i][j].computeMoves(i, j, sqs));
    }
  }

  removeEnPassantPiece(selp, destSquare) {
    return selp.constructor.name === "Pawn" && !destSquare;
  }

  clearEnPassant(sqs) {
    for(let i = 0; i < sqs.length ; ++i) {
      for(let j = 0; j < sqs[i].length ; ++j) {
        if(sqs[i][j] && sqs[i][j].constructor.name==="Pawn") {
          sqs[i][j].enPassantMove = null;
        }
      }
    }
  }

  setEnPassant(selp, srci, desti) {
    if(selp.constructor.name === "Pawn" && (srci + 2 === desti || srci - 2 === desti)) {
      selp.enPassantMove = true;
    }
  }

  isSwapKingMove(selp, srcj, destj) {
    return selp.constructor.name === "King" && (srcj + 2 === destj || srcj - 2 === destj);
  }

  check() {

  }

  jumpTo(step) {
    this.setState({
      turn: step,
      playerTurn: step % 2 === 0 ? 0 : 1,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.turn];
    let status = "Next player: " + this.state.playerTurn;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares = {current.squares}
          selectedPiece = {[this.state.selectedPiecei, this.state.selectedPiecej]}
          possibleMoves = {this.state.possibleMoves}
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

    initialBoard[0][0] = new Rook(0);
    initialBoard[0][7] = new Rook(0);
    initialBoard[7][0] = new Rook(1);
    initialBoard[7][7] = new Rook(1);
    initialBoard[0][1] = new Knight(0);
    initialBoard[0][6] = new Knight(0);
    initialBoard[7][1] = new Knight(1);
    initialBoard[7][6] = new Knight(1);
    initialBoard[0][2] = new Bishop(0);
    initialBoard[0][5] = new Bishop(0);
    initialBoard[7][2] = new Bishop(1);
    initialBoard[7][5] = new Bishop(1);
    initialBoard[0][3] = new Queen(0);
    initialBoard[0][4] = new King(0);
    initialBoard[7][3] = new Queen(1);
    initialBoard[7][4] = new King(1);

    for(let i = 0; i < initialBoard[0].length ; ++i) {
      initialBoard[1][i] = new Pawn(0);
      initialBoard[6][i] = new Pawn(1);
    }

    return initialBoard;
  }
}

/* ============================== */
/* HELPER FUNCTION                */
/* ============================== */

function matrix(rows, cols, defaultValue){
  var arr = [];
  for(var i = 0; i < rows; i++){
      arr.push([]);
      arr[i].push( new Array(cols));
      for(var j = 0; j < cols; j++){
        arr[i][j] = defaultValue;
      }
  }
  return arr;
}

/* 
initialBoard[0][0] = new Rook(0);
initialBoard[7][0] = new Rook(1);
initialBoard[0][7] = new Rook(0);
initialBoard[7][7] = new Rook(1);
initialBoard[0][1] = new Knight(0);
initialBoard[0][6] = new Knight(0);
initialBoard[7][1] = new Knight(1);
initialBoard[7][6] = new Knight(1);
initialBoard[0][2] = new Bishop(0);
initialBoard[0][5] = new Bishop(0);
initialBoard[7][2] = new Bishop(1);
initialBoard[7][5] = new Bishop(1);
initialBoard[0][3] = new Queen(0);
initialBoard[0][4] = new King(0);
initialBoard[7][3] = new Queen(1);
initialBoard[7][4] = new King(1); */