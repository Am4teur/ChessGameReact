import Piece from './piece.js';

export default class Bishop extends Piece {
  constructor(player) {
    super(player, (player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
  }
}