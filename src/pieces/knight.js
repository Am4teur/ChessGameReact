import Piece from './piece.js';

export default class Bishop extends Piece {
  constructor(player) {
    super(player, (player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
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

    moves.push([srci-2, srcj-1]);
    moves.push([srci-2, srcj+1]);

    moves.push([srci-1, srcj-2]);
    moves.push([srci-1, srcj+2]);

    moves.push([srci+1, srcj-2]);
    moves.push([srci+1, srcj+2]);

    moves.push([srci+2, srcj-1]);
    moves.push([srci+2, srcj+1]);

    //remove out of the board moves
    for(let i = 0; i < moves.length ; ++i) {
      for(let j = 0; j < 2 ; ++j) {
        if(moves[i][j] > 7 || moves[i][j] < 0) {
          moves.splice(i,1);
          i--;
          break;
        }
        else if(boardCopy[moves[i][0]][moves[i][1]] && boardCopy[moves[i][0]][moves[i][1]].player === this.player) {
          moves.splice(i,1);
          i--;
          break;
        }
      }
    }

    return moves;
  }
}