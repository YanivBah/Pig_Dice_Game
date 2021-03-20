import React from "react";
import "./input.css";

class Input extends React.Component {
  state = {disabled: false};

  handleClick = (e) => {
    this.setState({ disabled: true });
    this.props.onClick(e.target.previousElementSibling.value);
  }
  
  render() {
    return (
      <div className="input">
        <input
          disabled={this.state.disabled}
          type={this.props.type}
          name={this.props.name}
          id={this.props.name}
          defaultValue={this.props.defaultValue}
        />
        <button disabled={this.state.disabled} onClick={this.handleClick}>
          🗸
        </button>
      </div>
    );
  }
}

export default Input;
