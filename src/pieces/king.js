import Piece from './piece.js';

export default class King extends Piece {
  constructor(player){
    super(player, (player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
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

    for(let i = -1; i < 2  ; ++i) {
      for(let j = -1; j < 2 ; ++j) {
        if(i!==0 && j!==0);
          moves.push([srci+i, srcj+j]);
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