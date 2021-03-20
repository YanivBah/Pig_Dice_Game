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
    winner: null,
    player1: {
      totalScore: 90,
      currentScore: 0,
    },

    player2: {
      totalScore: 0,
      currentScore: 0,
    },
  };

  // computerPlay = async () => {
  //   console.log(this.state.currentPlayerTurn);
  //   if (this.state.currentPlayerTurn === 'player2') {
  //     for (let i = 0;i <= 4;i++) {
  //       console.log('hello');
  //       await setTimeout(this.rollDice,1500);
  //     }
  //   }
  // }

  setWinningScore = (num) => this.setState({ winningScore: num });

  checkIfWinner = () => {
    const player = this.state[this.state.currentPlayerTurn];
    if (player.totalScore + player.currentScore >= this.state.winningScore) {
      this.setState({ winner: this.state.currentPlayerTurn, rollDice: false});
      console.log(`Winner ${this.state.winner}`);
    }
      this.switchTurn();
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
      this.checkIfWinner();
    }
  };

  switchTurn = async () => {
    const player = this.state.currentPlayerTurn;
    await this.setState({ rollDice: false });
    await this.setState({
      [player]: {
        currentScore: 0,
        totalScore:
          this.state[player].totalScore + this.state[player].currentScore,
      },
    });
    if (this.state.winner === null) {
      if (this.state.currentPlayerTurn === "player1") {
        await this.setState({ currentPlayerTurn: "player2" });
      } else {
        await this.setState({ currentPlayerTurn: "player1" });
      }
    }
    // await this.computerPlay();
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
          winner={this.state.winner}
          totalScore={this.state.player1.totalScore}
          currentScore={this.state.player1.currentScore}
        />
        <Player
          player="Player2"
          currentPlayer={this.state.currentPlayerTurn}
          winner={this.state.winner}
          totalScore={this.state.player2.totalScore}
          currentScore={this.state.player2.currentScore}
        />
        {!this.state.winner && (
          <div className={`control ${this.state.currentPlayerTurn}`}>
            <Button
              onClick={this.rollDice}
              icon="dice-sharp"
              text="Roll Dice"
            />
            <Button
              onClick={this.checkIfWinner}
              icon="swap-horizontal"
              text="Hold"
            />
            <Button onClick={this.switchTurn} icon="refresh" text="New Game" />
            <Input onClick={this.setWinningScore} />
          </div>
        )}
        <div className="dices">
          {this.state.rollDice && <Dice onRender={this.updateCurrentScore} />}
        </div>
      </div>
    );
  }
}

export default Game;