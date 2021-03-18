import React from "react";

class Dice extends React.Component {
  state = {
    dice1: 0,
    dice2: 0,
  };

  getRandomNumber = () => {
    const min = Math.ceil(1);
    const max = Math.floor(6);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount() {
    const num1 = this.getRandomNumber();
    const num2 = this.getRandomNumber();
    this.setState({ dice1: num1, dice2: num2 });
    this.props.onRender(num1+num2);
  }

  render() {
    return (
      <div>
        <div>Dice 1: {this.state.dice1}</div>
        <div>Dice 2: {this.state.dice2}</div>
      </div>
    );
  }
}

export default Dice;