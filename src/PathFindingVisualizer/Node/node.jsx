import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      isVisited,
      isShortest,
      onMouseEnter,
      onMouseDown,
      onMouseUp,
    } = this.props;

    const extraClass = isStart
      ? "node node-start"
      : isFinish
      ? "node node-finish"
      : isWall
      ? "node-wall"
      : isShortest
      ? "node node-shortest-path"
      : isVisited
      ? "node node-visited"
                          : "node";


      let cellWidth = 15;
      let cellHeight = 15;
    return (

      <div
        id={`node-${row}-${col}`}
        className={`${extraClass}`}
        style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
