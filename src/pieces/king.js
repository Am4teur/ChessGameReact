import Piece from './piece.js';

export default class King extends Piece {
  constructor(player){
    super(player, (player === 1? "./chessPieces/black_pawn.png" : "./chessPieces/black_pawn.png"));
  }

  isMovePossible(src, dest){
    return (src - 9 === dest || 
      src - 8 === dest || 
      src - 7 === dest || 
      src + 1 === dest || 
      src + 9 === dest || 
      src + 8 === dest || 
      src + 7 === dest || 
      src - 1 === dest);
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  getSrcToDestPath(src, dest){
    return [];
  }
}