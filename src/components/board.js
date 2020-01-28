import React from "react";
import Square from './square.js'

export default class Board extends React.Component {
	renderSquare(i, j) {
		return (
			<Square
				value={this.props.squares[i][j]}
				bgcolor={(i % 2 === 0 ? i * 10 + j : i * 10 + j + 1) % 2 === 0 ? "#ffffff" : "#000000"}
				onClick={() => this.props.onClick(i, j)}                       // white    :  black
			/>
		)
	}

	render() {
		const nodes = this.props.squares;

		return (
			<div className="board">
				{nodes.map((row, rowIdx) => {
					return (
						<div className="board-row">
							{row.map((node, nodeIdx) => {
								return this.renderSquare(rowIdx, nodeIdx);
							})}
						</div>
					)
				})}
			</div>
		);
	}
}