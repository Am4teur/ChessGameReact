import React from "react";

export default class Square extends React.Component {
  render() {
    return (
      <button
      className={"square " + this.props.bgcolor}
      onClick={this.props.onClick}
      >
        {this.props.piece.player}
      </button>
    );
  }

}