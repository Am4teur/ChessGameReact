import React from "react";

export default class Square extends React.Component {
  render() {
    return (
      <button className="square"
        style={{
          backgroundColor: this.props.bgcolor,
          color: "#ffffff" //white
        }}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }

}