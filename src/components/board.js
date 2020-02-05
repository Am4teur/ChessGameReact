import React from "react";
import Square from './square.js'

export default class Board extends React.Component {
	renderSquare(i, j, piece, isMove, isSelected) {
		return (
			<Square
			key={"(" + i + ", " + j + ")"} //just to fix a warning
			pieceStyle={piece ? piece.style : null}
			bgColor={(i % 2 === 0 ? i * 10 + j : i * 10 + j + 1) % 2 === 0  ? "background-light" : "background-dark"}
			isMove={isMove} //"" or "isMove"
			isSelected={isSelected && isSelected[0]===i && isSelected[1]===j ? "isSelected" : ""}
			onClick={() => this.props.onClick(i, j)}
			/>
		)
	}

	render() {
		const squares = this.props.squares.slice();
		const isSelected = this.props.selectedPiece ? [this.props.selectedPiece[0],this.props.selectedPiece[1]] : null;
		let possibleMoves = [];
		if(this.props.possibleMoves) {
			possibleMoves = this.props.possibleMoves.slice();
		}

    const board = [];
    for(let i = 0; i < squares.length; i++){
      const boardRows = [];
      for(let j = 0; j < squares.length; j++){
				let isMove = "";
				//const isSelected = possibleMoves.includes([i, j]) ? "selected" : "";
				//includes method doesnt work with arrays "cause reference" so another old school for to do the job
				for(let k = 0; k < possibleMoves.length; ++k) {
					if(possibleMoves[k][0]===i && possibleMoves[k][1]===j) {
						isMove = "isMove";
					}
				}
        boardRows.push(this.renderSquare(i, j, squares[i][j], isMove, isSelected));
      }
		board.push(<div className="board-row" key={i}>{boardRows}</div>)
    }


		return (
			<div className="board">
				{board}
			</div>
		);
	}
}





