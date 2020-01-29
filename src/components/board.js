import React from "react";
import Square from './square.js'

export default class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
			piece={this.props.squares[i] ? this.props.squares[i] : "00"}
			bgcolor={(Math.floor(i/8)%2===0 && i%2===0) || (Math.floor(i/8)%2===1 && i%2===1)  ? "background-light" : "background-dark"}
			onClick={() => this.props.onClick(i)}
			/>
		)
	}

	render() {
		const squares = this.props.squares;
		const board = new Array(squares.length).fill(null);

		for(let i = 0; i < squares.length ; ++i) {
			board.push(this.renderSquare(i))
		}

		return (
			<div className="board-row">
				{board}
			</div>
		);
	}
}





