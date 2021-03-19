import React from "react";
import "./player.css";

class Player extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.currentPlayer === this.props.player.toLowerCase()
            ? "player current"
            : "player"
        }
      >
        <h1>{this.props.player}</h1>
        <div className="totalScore">
          <h3>Total Score</h3>
          <span>{this.props.totalScore}</span>
        </div>
        <h3>Current Score - {this.props.currentScore}</h3>
      </div>
    );
  }
}

export default Player;