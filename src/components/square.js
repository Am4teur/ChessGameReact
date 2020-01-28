import React from "react";

export default class Square extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <button
        className="square"
        style={{
          backgroundColor: this.props.bgcolor,
          color: "#fff"
        }}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }

}