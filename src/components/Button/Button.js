import React from "react";
import "./button.css";

class Button extends React.Component {
  render() {
    return (
      <button className="btn" onClick={this.props.onClick}>
        <ion-icon name={this.props.icon}></ion-icon>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
