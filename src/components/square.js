import React from "react";


export default class Square extends React.Component {
  render() {
    return (
      <button
      className={"square " + this.props.bgColor + " " + this.props.isSelected}
      style={this.props.pieceStyle}
      onClick={this.props.onClick}
      >
      </button>
    );
  }

}
