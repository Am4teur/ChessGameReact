import React from "react";


export default class Square extends React.Component {
  render() {
    return (
      <button
      className={"square " + this.props.bgcolor}
      style={this.props.piece.style}
      onClick={this.props.onClick}
      >
      </button>
    );
  }

}