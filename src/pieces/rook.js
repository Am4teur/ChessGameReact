import Piece from './piece.js';

export default class Rook extends Piece {
  constructor(player) {
    super(player, (player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
  }

  canMove(srci, srcj, desti, destj, board) {
    const moves = this.computeMoves(srci, srcj, board);

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

    for(let i = 1; i < board.length - srci ; ++i) {
      if(boardCopy[srci+i][srcj]) {
        if(boardCopy[srci+i][srcj].player !== boardCopy[srci][srcj].player) {
          moves.push([srci+i, srcj]);
        }
        break;
      }
      moves.push([srci+i, srcj]);
    }
    for(let i = 1; i < srci+1 ; ++i) {
      if(boardCopy[srci-i][srcj]) {
        if(boardCopy[srci-i][srcj].player !== boardCopy[srci][srcj].player) {
          moves.push([srci-i, srcj]);
        }
        break;
      }
      moves.push([srci-i, srcj]);
    }
    for(let i = 1; i < board.length - srcj ; ++i) {
      if(boardCopy[srci][srcj+i]) {
        if(boardCopy[srci][srcj+i].player !== boardCopy[srci][srcj].player) {
          moves.push([srci, srcj+i]);
        }
        break;
      }
      moves.push([srci, srcj+i]);
    }
    for(let i = 1; i < srcj+1 ; ++i) {
      if(boardCopy[srci][srcj-i]) {
        if(boardCopy[srci][srcj-i].player !== boardCopy[srci][srcj].player) {
          moves.push([srci, srcj+i]);
        }
        break;
      }
      moves.push([srci, srcj-i]);
    }

    return moves;
  }
}