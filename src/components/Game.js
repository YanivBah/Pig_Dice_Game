import React from "react";
import Dice from "./Dice/Dice";

class Game extends React.Component {
  state = {
    winningScore: 100,
    currentPlayerTurn: 'player1',
    rollDice: false,
    player1: {
      totalScore: 0,
      currentScore: 0,
    },

    player2: {
      totalScore: 0,
      currentScore: 0,
    },
  };

  updateCurrentScore = (num) => {
    const player = this.state.currentPlayerTurn;
    const currentScore = this.state[player].currentScore;
    if (num !== 12) {
      this.setState({[player]: {
          currentScore: num + currentScore,
          totalScore: this.state[player].totalScore,},
      });
      this.switchTurn();
    } else {
      this.setState({[player]: {
          currentScore: 0,
          totalScore: 0,},
      });
    }
    console.log(`Numbers rolled: ${num}`);
  }
  
  switchTurn = () => {
    if (this.state.currentPlayerTurn === 'player1') {
      this.setState({currentPlayerTurn: 'player2'});
    } else {
      this.setState({ currentPlayerTurn: "player1" });
    }
  }

  rollDice = async () => {
    await this.state.rollDice
      ? this.setState({ rollDice: false })
      : this.setState({ rollDice: true });
    if (!this.state.rollDice) {
      setTimeout(() => {this.setState({ rollDice: true })},100)
    }
  }

  render() {
    return (
      <div>
        {this.state.rollDice && <Dice onRender={this.updateCurrentScore} />}
        <div>
          <h1>Player1:</h1>
          <h3>Total Score - {this.state.player1.totalScore}</h3>
          <h3>Current Score - {this.state.player1.currentScore}</h3>
        </div>
        <div>
          <h1>Player2:</h1>
          <h3>Total Score - {this.state.player2.totalScore}</h3>
          <h3>Current Score - {this.state.player2.currentScore}</h3>
        </div>
        <button onClick={this.rollDice}>Roll Dice</button>
      </div>
    );
  }
}

export default Game;