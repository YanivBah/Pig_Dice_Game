import React from "react";
import "./player.css";

class Player extends React.Component {

  checkWinnerOrCurrent = () => {
    console.log(this.props.winner);
    if (this.props.winner === this.props.player.toLowerCase()) {
      return "player winner";
    } else if (this.props.currentPlayer === this.props.player.toLowerCase()) {
      return "player current";
    } else {
      return "player";
    }
  }

  render() {
    return (
      <div className={this.checkWinnerOrCurrent()}>
        <h1>{this.props.player}</h1>
        <div className="totalScore">
          <h3>Total Score</h3>
          <span>{this.props.totalScore}</span>
        </div>
        {this.props.currentPlayer === this.props.player.toLowerCase() &&
          !(this.props.winner === this.props.player.toLowerCase()) && (
            <div className="currentScore">
              <h3>Current Score</h3>
              <span>{this.props.currentScore}</span>
            </div>
          )}
      </div>
    );
  }
}

export default Player;