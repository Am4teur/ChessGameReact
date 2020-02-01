import React from "react";
import Square from './square.js'

export default class Board extends React.Component {
	renderSquare(i, j, bgColor, sq) {
		return (
			<Square
			key={"(" + i + ", " + j + ")"} //just to fix a warning
			piece={sq ? sq : "00"}
			bgcolor={bgColor}
			onClick={() => this.props.onClick(i, j)}
			/>
		)
	}

	render() {
		const squares = this.props.squares.slice();

    const board = [];
    for(let i = 0; i < squares.length; i++){
      const boardRows = [];
      for(let j = 0; j < squares.length; j++){
        const bgColor = (i % 2 === 0 ? i * 10 + j : i * 10 + j + 1) % 2 === 0  ? "background-light" : "background-dark";
        boardRows.push(this.renderSquare(i, j, bgColor, squares[i][j]));
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





