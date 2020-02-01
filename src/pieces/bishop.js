import Piece from './piece.js';

export default class Bishop extends Piece {
  constructor(player) {
    super(player, (player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
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

    for(let i = 1; i < board.length - srci && i < board.length - srcj ; ++i) {
      if(boardCopy[srci+i][srcj+i]) {
        if(boardCopy[srci+i][srcj+i].player !== boardCopy[srci][srcj].player) {
          moves.push([srci+i, srcj+i]);
        }
        break;
      }
      moves.push([srci+i, srcj+i]);
    }
    for(let i = 1; i < srci+1 && i < srcj+1 ; ++i) {
      if(boardCopy[srci-i][srcj-i]) {
        if(boardCopy[srci-i][srcj-i].player !== boardCopy[srci][srcj].player) {
          moves.push([srci-i, srcj-i]);
        }
        break;
      }
      moves.push([srci-i, srcj-i]);
    }
    for(let i = 1; i < srci+1 && i < board.length - srcj ; ++i) {
      if(boardCopy[srci-i][srcj+i]) {
        if(boardCopy[srci-i][srcj+i].player !== boardCopy[srci][srcj].player) {
          moves.push([srci-i, srcj+i]);
        }
        break;
      }
      moves.push([srci-i, srcj+i]);
    }
    for(let i = 1; i < board.length - srci && i < srcj+1 ; ++i) {
      if(boardCopy[srci+i][srcj-i]) {
        if(boardCopy[srci+i][srcj-i].player !== boardCopy[srci][srcj].player) {
          moves.push([srci+i, srcj+i]);
        }
        break;
      }
      moves.push([srci+i, srcj-i]);
    }

    return moves;
  }
}