import Piece from './piece.js';
import '../index.css';

export default class Pawn extends Piece {
  constructor(player) {
    super(player, (player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.enPassantMove = null;
  }

  canMove(srci, srcj, desti, destj, board) {
    const moves = this.computeMoves(srci, srcj, board);

    //moves.includes([desti, destj]);
    //includes method doesnt work with arrays "cause reference" so another old school for to do the job
    for(let i = 0; i < moves.length; ++i) {
      if(moves[i][0]===desti && moves[i][1]===destj) {
        return true;
      }
    }

    return false;
  }

  computeMoves(srci, srcj, board) {
    let moves = [];
    const boardCopy = board.slice();

    if(this.player===0) { //player white
      if(!boardCopy[srci+1][srcj]) {
        moves.push([srci+1, srcj]);
        if(srci===1 && !boardCopy[srci+2][srcj]) {
          moves.push([srci+2, srcj])
        }
      }
      if(boardCopy[srci+1][srcj+1] && boardCopy[srci+1][srcj+1].player===1) {
        moves.push([srci+1, srcj+1]);
      }
      if(boardCopy[srci+1][srcj-1] && boardCopy[srci+1][srcj-1].player===1) {
        moves.push([srci+1, srcj-1]);
      }
    }
    else { //player black
      if(!boardCopy[srci-1][srcj]) {
        moves.push([srci-1, srcj]);
        if(srci===6 && !boardCopy[srci-2][srcj]) {
          moves.push([srci-2, srcj])
        }
      }
      if(boardCopy[srci-1][srcj+1] && boardCopy[srci-1][srcj+1].player===0) {
        moves.push([srci-1, srcj+1]);
      }
      if(boardCopy[srci-1][srcj-1] && boardCopy[srci-1][srcj-1].player===0) {
        moves.push([srci-1, srcj-1]);
      }
    }

    //remove out of the board moves
    for(let i = 0; i < moves.length ; ++i) {
      for(let j = 0; j < 2 ; ++j) {
        if(moves[i][j] > 7 || moves[i][j] < 0) {
          moves.splice(i,1);
          i--;
          break;
        }
      }
    }

    return moves;
  }

  addEnPassantToOthers(desti, destj, board) {
    const boardCopy = board.slice();
    let enPassantMoves = [];
    let move = null;

    const p = this.player===0 ? 1 : -1;

    if(boardCopy[desti][destj+1]) { // && boardCopy[desti][destj+1].type == "Pawn"
      move = [desti, destj+1, desti+p, destj-1];
    }
    enPassantMoves.push(move);
    move = null;

    if(boardCopy[desti][destj-1]) {
      move = [desti, destj+1, desti+p, destj+1];
    }
    enPassantMoves.push(move);

    return enPassantMoves;
  }
}