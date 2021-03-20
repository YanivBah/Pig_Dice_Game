import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
// import App from './App';
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import "./index.css";

class Start extends React.Component {
  state = {start: false, winningScore: 100, player1name: 'Player1', player2name: 'Player2'};


  render() {
    if (this.state.start) {
      return <Game />;
    }
    return (
      <div className="start-menu">
        <h1>
          <ion-icon name="dice"></ion-icon> Pig Dice Game
        </h1>
        <div className="control">
          <div className="line">
            <span>Winning Goal: </span>
            <Input
              type="number"
              name="winningscore"
              defaultValue="100"
              onClick={(value) => this.setState({ winningScore: value })}
            />
          </div>
          <div className="line">
            <span>Player1 Name: </span>{" "}
            <Input
              name="player1name"
              defaultValue="Player1"
              type="text"
              onClick={(value) => this.setState({ player1name: value })}
            />
          </div>
          <div className="line">
            <span>Player2 Name: </span>{" "}
            <Input
              name="player2name"
              defaultValue="Player2"
              type="text"
              onClick={(value) => this.setState({ player2name: value })}
            />
          </div>
        </div>
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
