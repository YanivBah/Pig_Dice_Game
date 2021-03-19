import React from "react";
import "./input.css";

class Input extends React.Component {
  state = {disabled: false};

  handleClick = (e) => {
    this.setState({ disabled: true });
    const num = parseInt(e.target.previousElementSibling.value);
    this.props.onClick(num);
  }
  render() {
    return (
      <div className="set-winning-score">
        <input
          disabled={this.state.disabled}
          type="number"
          name="winningScore"
          id="winningScore"
          min="6"
          defaultValue="100"
        />
        <button
          disabled={this.state.disabled}
          onClick={this.handleClick}
        >
          🗸
        </button>
      </div>
    );
  }
}

export default Input;
