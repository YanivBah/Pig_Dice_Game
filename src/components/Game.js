import React from "react";
import Dice from "./Dice/Dice";
import Button from "./Button/Button";
import Input from "./Input/Input";
import Player from "./Player/Player";
import "./game.css";

class Game extends React.Component {
  state = {
    winningScore: 100,
    currentPlayerTurn: "player1",
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

  setWinningScore = (num) => this.setState({ winningScore: num });

  checkIfWinner = () => {
    const player = this.state[this.state.currentPlayerTurn];
    if (player.totalScore + player.currentScore >= this.state.winningScore) {
      // W-I-P
    }
  }

  updateCurrentScore = async (num) => {
    const player = this.state.currentPlayerTurn;
    const currentScore = this.state[player].currentScore;
    if (num !== 12) {
      await this.setState({
        [player]: {
          currentScore: num + currentScore,
          totalScore: this.state[player].totalScore,
        },
      });
    } else {
      await this.setState({
        [player]: {
          currentScore: 0,
          totalScore: this.state[player].totalScore,
        },
      });
      this.switchTurn();
    }
    await this.checkIfWinner();
  };

  switchTurn = () => {
    const player = this.state.currentPlayerTurn;
    this.setState({ rollDice: false });
    this.setState({
      [player]: {
        currentScore: 0,
        totalScore:
          this.state[player].totalScore + this.state[player].currentScore,
      },
    });
    if (this.state.currentPlayerTurn === "player1") {
      this.setState({ currentPlayerTurn: "player2" });
    } else {
      this.setState({ currentPlayerTurn: "player1" });
    }
  };

  rollDice = async () => {
    (await this.state.rollDice)
      ? this.setState({ rollDice: false })
      : this.setState({ rollDice: true });
    if (!this.state.rollDice) {
      setTimeout(() => {
        this.setState({ rollDice: true });
      }, 100);
    }
  };

  render() {
    return (
      <div className="gameboard">
        <Player
          player="Player1"
          currentPlayer={this.state.currentPlayerTurn}
          totalScore={this.state.player1.totalScore}
          currentScore={this.state.player1.currentScore}
        />
        <Player
          player="Player2"
          currentPlayer={this.state.currentPlayerTurn}
          totalScore={this.state.player2.totalScore}
          currentScore={this.state.player2.currentScore}
        />
        <div className={`control ${this.state.currentPlayerTurn}`}>
          <Button onClick={this.rollDice} icon="dice-sharp" text="Roll Dice" />
          <Button
            onClick={this.switchTurn}
            icon="swap-horizontal"
            text="Hold"
          />
          <Button onClick={this.switchTurn} icon="refresh" text="New Game" />
          <Input onClick={this.setWinningScore} />
        </div>
        <div className="dices">
          {this.state.rollDice && <Dice onRender={this.updateCurrentScore} />}
        </div>
      </div>
    );
  }
}

export default Game;