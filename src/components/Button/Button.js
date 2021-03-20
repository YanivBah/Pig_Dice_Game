import React from "react";
import "./button.css";

class Button extends React.Component {
  state = {disabled: false};
  disableButton = () => {
    this.setState({disabled: true});
    this.props.onClick();
    setTimeout(() => this.setState({ disabled: false }),1000);
  }

  render() {
    return (
      <button
        disabled={this.state.disabled}
        className="btn"
        onClick={this.disableButton}
      >
        <ion-icon name={this.props.icon}></ion-icon>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
