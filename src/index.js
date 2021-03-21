import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import "./index.css";

class Start extends React.Component {
  state = {
    start: false,
    settings: false,
    leaderboard: false,
    winningScore: 100,
    player1name: "Player1",
    player2name: "Player2",
  };

  showButtons = () => {
    return (
      <div className="control">
        <Button
          onClick={() =>
            this.setState({ start: true, settings: false, leaderboard: false })
          }
          icon="game-controller"
          text="Start"
        />
        <Button
          onClick={() =>
            this.setState({ start: false, settings: true, leaderboard: false })
          }
          icon="construct"
          text="Settings"
        />
        <Button
          onClick={() =>
            this.setState({ start: false, settings: false, leaderboard: true })
          }
          icon="barbell-outline"
          text="Leaderboard"
        />
      </div>
    );
  }

  showLeaderboard = () => {
    if (localStorage.getItem("winnings") === null) {
      return (
        <div className="control">
          <h3>Sorry but I didn't found any winners yet.</h3>
          <Button
            onClick={() => this.setState({ leaderboard: false })}
            icon="arrow-back-circle-sharp"
            text="Back"
          />
        </div>
      );
    }
    const winners = JSON.parse(localStorage.getItem("winnings"));
    winners.sort((a,b) => b.counter-a.counter);
    return (
      <div className="control">
        {winners.map((winner) => {
          return (
            <div>
              <h4>{winner.name}</h4>
              <span>Won {winner.counter} times</span>
            </div>
          );
        })}
        <Button
          onClick={() => this.setState({ leaderboard: false })}
          icon="arrow-back-circle-sharp"
          text="Back"
        />
      </div>
    );
  }

  showSettings = () => {
    return (
      <div className="control">
        <div className="line">
          <span>Winning Goal: </span>
          <Input
            type="number"
            name="winningscore"
            defaultValue={this.state.winningScore}
            onClick={(value) => this.setState({ winningScore: value })}
          />
        </div>
        <div className="line">
          <span>Player1 Name: </span>{" "}
          <Input
            name="player1name"
            defaultValue={this.state.player1name}
            type="text"
            onClick={(value) => this.setState({ player1name: value })}
          />
        </div>
        <div className="line">
          <span>Player2 Name: </span>{" "}
          <Input
            name="player2name"
            defaultValue={this.state.player2name}
            type="text"
            onClick={(value) => this.setState({ player2name: value })}
          />
        </div>
        <div className="line">
          <Button
            onClick={() => this.setState({ settings: false })}
            icon="arrow-back-circle-sharp"
            text="Back"
          />
          <Button
            onClick={() => localStorage.clear()}
            icon="cloud-offline"
            text="Delete Local Storage"
          />
        </div>
      </div>
    );
  };

  render() {
    if (this.state.start) {
      return <Game player1name={this.state.player1name} player2name={this.state.player2name} winningScore={this.state.winningScore} />;
    }
    return (
      <div className="start-menu">
        <h1>
          <ion-icon name="dice"></ion-icon> Pig Dice Game
        </h1>
        {this.showButtons()}
        {this.state.settings && this.showSettings()}
        {this.state.leaderboard && this.showLeaderboard()}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Start />
  </div>,
  document.querySelector("#root")
);
