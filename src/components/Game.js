import React from "react";
import Dice from "./Dice/Dice";
import Button from "./Button/Button";
// import Input from "./Input/Input";
import Player from "./Player/Player";
import "./game.css";

class Game extends React.Component {
  state = {
    winningScore: this.props.winningScore,
    currentPlayerTurn: "player1",
    rollDice: false,
    winner: null,
    player1: {
      name: this.props.player1name,
      totalScore: 0,
      currentScore: 0,
    },

    player2: {
      name: this.props.player2name,
      totalScore: 0,
      currentScore: 0,
    },
  };

  setWinningScore = (num) => this.setState({ winningScore: num });

  checkIfWinner = async () => {
    const player = this.state[this.state.currentPlayerTurn];
    if (player.totalScore + player.currentScore >= this.state.winningScore) {
      await this.setState({ winner: this.state.currentPlayerTurn, rollDice: false });
      const winner = this.state[this.state.winner].name;
      if (localStorage.getItem('winnings') === null) {
        const winners = [];
        winners.push({name: winner, counter: 1});
        localStorage.setItem('winnings',JSON.stringify(winners));
      } else {
        const data = JSON.parse(localStorage.getItem("winnings"));
        const current = data.find((winner) => this.state[this.state.winner].name === winner.name);
        if (current) {
          current.counter++;
          console.log(current);
        } else {
          const winner = {name: this.state[this.state.winner].name, counter: 1};
          data.push(winner);
        }
        localStorage.setItem('winnings',JSON.stringify(data));
      }
    }
    this.switchTurn();
  };

  updateCurrentScore = async (num) => {
    const player = this.state.currentPlayerTurn;
    const currentScore = this.state[player].currentScore;
    if (num !== 12) {
      await this.setState({
        [player]: {
          name: this.props[`${player}name`],
          currentScore: num + currentScore,
          totalScore: this.state[player].totalScore,
        },
      });
    } else {
      await this.setState({
        [player]: {
          name: this.props[`${player}name`],
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

  newGame = () => {
    this.setState({
      winningScore: this.state.winningScore,
      currentPlayerTurn: "player1",
      rollDice: false,
      winner: null,
      player1: {
        totalScore: 0,
        currentScore: 0,
      },
      player2: {
        totalScore: 0,
        currentScore: 0,
      },
    });
  };

  render() {
    return (
      <div className="gameboard">
        <Player
          player="player1"
          playerName={this.props.player1name.replace(" ", "")}
          currentPlayer={this.state.currentPlayerTurn}
          winner={this.state.winner}
          totalScore={this.state.player1.totalScore}
          currentScore={this.state.player1.currentScore}
        />
        <Player
          player="player2"
          playerName={this.props.player2name.replace(" ", "")}
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
              currentScore={
                this.state[this.state.currentPlayerTurn].currentScore
              }
            />
          </div>
        )}
        <div className="new-game">
          <Button onClick={this.newGame} icon="refresh" text="New Game" />
        </div>
        {/* <Input onClick={this.setWinningScore} /> */}
        <div className="dices">
          {this.state.rollDice && <Dice onRender={this.updateCurrentScore} />}
        </div>
      </div>
    );
  }
}

export default Game;