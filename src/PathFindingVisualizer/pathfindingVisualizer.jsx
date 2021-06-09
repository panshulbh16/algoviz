import React, { Component } from "react";
import "./pathfindingVisualizer.css";
import Node from "./Node/node";
import { particlesOptions } from '../AddOns/constants';
import Particles from 'react-particles-js';
import { algo } from './allAlgorithms_pathfinding';
//Pathfinding Algorithms
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "../pathfindingAlgorithms/dijkstra";
import {
  astar,
  getNodesInShortestPathOrderAstar,
} from "../pathfindingAlgorithms/astar";
import {
  breadthFirstSearch,
  getNodesInShortestPathOrderBFS,
} from "../pathfindingAlgorithms/breadthFirstSearch";
import {
  depthFirstSearch,
  getNodesInShortestPathOrderDFS,
} from "../pathfindingAlgorithms/depthFirstSearch";


const initialNum = getInitialNum(500,350);
const initialNumRows = initialNum[0];
const initialNumColumns = initialNum[1];

const startFinishNode = getStartFinishNode(initialNumRows, initialNumColumns);
const startNodeRow = startFinishNode[0];
const startNodeCol = startFinishNode[1];
const finishNodeRow = startFinishNode[2];
const finishNodeCol = startFinishNode[3];

class PathfindingVisualizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    visualizingAlgorithm: false,
    width: window.innerWidth,
    height: window.innerHeight,
    numRows: initialNumRows,
    numColumns: initialNumColumns,
      speed: 10,
      items: algo || [],
      selectedalgo: algo[0].algoName,
      selectedItem: algo[0].name,
      pathState: false,
      speedState: "Speed",
      text: algo[0].desc,
  };

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  updateSpeed = (path) => {
    this.setState({ speed: path });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    const grid = getInitialGrid(this.state.numRows, this.state.numColumns);
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseIsPressed) {
      const newGrid = getNewGridWithWalls(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }


    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }));
    };

    selectItem = (algo,item, id,text) => {
        // console.log(item,id);
        this.setState({
            selectedalgo:algo,
            selectedItem: item,
            showItems: false,
            text: text

        });
    };

   

    changeSpeed(speed) {
        if (this.state.visualizingAlgorithm) {
            return;
        }
        let value = [10, 10];
        if (speed === "Slow") value = [50, 30];
        else if (speed === "Medium") value = [25, 20];
        else if (speed === "Fast") value = [10, 10];
        this.setState({ speedState: speed });
        this.updateSpeed(value[0], value[1]);
   
    }

  clearGrid() {
    if (this.state.visualizingAlgorithm) {
      return;
    }
    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          !(
            (row === startNodeRow && col === startNodeCol) ||
            (row === finishNodeRow && col === finishNodeCol)
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getInitialGrid(this.state.numRows, this.state.numColumns);
    this.setState({
      grid: newGrid,
      visualizingAlgorithm: false,
    });
  }

  clearPath() {
    if (this.state.visualizingAlgorithm ) {
      return;
      }

    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-shortest-path"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getGridWithoutPath(this.state.grid);
    this.setState({
      grid: newGrid,
      visualizingAlgorithm: false,
      generatingMaze: false,
    });
  }

  animateShortestPath = (nodesInShortestPathOrder, visitedNodesInOrder) => {
    if (nodesInShortestPathOrder.length === 1)
      this.setState({ visualizingAlgorithm: false });
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRender(
            this.state.grid,
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
          this.setState({ grid: newGrid, visualizingAlgorithm: false });
        }, i * (3 * this.state.speed));
        return;
      }
      let node = nodesInShortestPathOrder[i];
      setTimeout(() => {
        //shortest path node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, i * (3 * this.state.speed));
    }
  };

  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    let newGrid = this.state.grid.slice();
    for (let row of newGrid) {
      for (let node of row) {
        let newNode = {
          ...node,
          isVisited: false,
        };
        newGrid[node.row][node.col] = newNode;
      }
    }
    this.setState({ grid: newGrid });
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
        }, i * this.state.speed);
        return;
      }
      setTimeout(() => {
        //visited node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, i * this.state.speed);
    }
  };

    visualizeAlgo(algoname) {
        if (this.state.visualizingAlgorithm) {
            return;
        }
        if (algoname === "Visualize Algorithm" || algoname === "Select an Algorithm!") {
            this.setState({ selectedalgo: "Select an Algorithm!" });
            return;
        }
        this.setState({ visualizingAlgorithm: true });
        this.clearPath();
        setTimeout(() => {
            const { grid } = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];
            let visitedNodesInOrder, nodesInShortestPathOrder;
            
            if (algoname === "Visualize Dijkstra") {
                visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(
                    finishNode
                );

            }
            else if (algoname === "Visualize AStar") {
                visitedNodesInOrder = astar(grid, startNode, finishNode);
                nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(
                    finishNode
                );
            }
            else if (algoname === "Visualize BFS") {
                visitedNodesInOrder = breadthFirstSearch(
                    grid,
                    startNode,
                    finishNode
                );
                nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(
                    finishNode
                );
            }
            else { //DFS
                visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
                nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(
                    finishNode
                );

            }
           this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
        }, this.state.speed);
    }





  render() {
    let { grid } = this.state;
    return (
        <div className="parent_container">
            
 

            <nav className="navbar">
                <h1>Pathfinding Visualizer</h1>
                <div className="dropdown-container">
                    <div className="select-box--box">
                        <div className="select-box--container">
                            <div className="select-box--selected-item">
                                {this.state.selectedItem}
                                {/*{console.log(this.state.selectedItem.value)}*/}
                            </div>
                            <div className="select-box--arrow" onClick={this.dropDown}>
                                <span
                                    className={`${this.state.showItems
                                        ? "select-box--arrow-up"
                                        : "select-box--arrow-down"
                                        }`}
                                />
                            </div>
                            <div
                                style={{ paddingRight: "10%", left: '18%', position: "absolute", border: "solid", borderWidth: 'thin', backgroundColor: 'rgba(0,0,0,1)', display: this.state.showItems ? "block" : "none" }}
                                className={"select-box--items"}
                            >
                                {algo.map(item => (
                                    <button
                                        key={item.id}
                                        className="button_dropdown"
                                        type="button"
                                        onClick={() => this.selectItem(item.algoName, item.name, item.id, item.desc)/*, this.mapDesc(item.id)*/}
                                       // className={this.state.selectedItem === item ? "selected" : ""}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown-container">
                    <div className="select-box--box">
                        <div className="select-box--container">
                            <div className="select-box--selected-item">
                                {this.state.speedState}
                                {/*{console.log(this.state.selectedItem.value)}*/}
                            </div>
                            <div className="select-box--arrow" onClick={this.dropDown}>
                                <span
                                    className={`${this.state.speedState!=="Speed"
                                        ? "select-box--arrow-up"
                                        : "select-box--arrow-down"
                                        }`}
                                />
                            </div>
                            <div
                                style={{ paddingRight: "10%", left: '18%', position: "absolute", border: "solid", borderWidth: 'thin', backgroundColor: 'rgba(0,0,0,1)', display: this.state.showItems ? "block" : "none" }}
                                className={"select-box--items"}
                            >
                                <button
                                    className="button_dropdown"
                                    type="button"
                                    onClick={() => this.changeSpeed("Slow")}
                                >
                                    Slow
                                </button>
                                <button
                                    className="button_dropdown"
                                    type="button"
                                    onClick={() => this.changeSpeed("Medium")}
                                >
                                    Medium
                               </button>
                                <button
                                    className="button_dropdown"
                                    type="button"
                                    onClick={() => this.changeSpeed("Fast")}
                                >
                                    Fast
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="algo-button" onClick={() => this.visualizeAlgo(this.state.selectedalgo)}>
                    {this.state.selectedalgo}
                </button>
                <button
                    className="algo-button"
                    onClick={() => this.clearGrid()}
                >
                    Clear Gird
              </button>
            </nav>

            <div className="container">

                <div className="description">
                    {
                        <div className="desc_text">{this.state.text}</div> 
                    }

                    

                </div>
        
        <div
          className={
            this.state.visualizingAlgorithm 
              ? "grid-visualizing"
              : "grid"
          }
                >
          <div className="node-container">
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isVisited,
                    isShortest,
                    isWall,
                  } = node;
                  return (
                    <Node
                      key={nodeId}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isShortest={isShortest}
                      isWall={isWall}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      width={this.state.width}
                      height={this.state.height}
                      numRows={this.state.numRows}
                      numColumns={this.state.numColumns}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
                </div>
                <Particles className="particles" params={particlesOptions} />
            </div>
        </div>
    );
  }
}

function getInitialNum(width, height) {
  let numColumns;
  if (width > 1500) {
    numColumns = Math.floor(width / 25);
  } else if (width > 1250) {
    numColumns = Math.floor(width / 22.5);
  } else if (width > 1000) {
    numColumns = Math.floor(width / 20);
  } else if (width > 750) {
    numColumns = Math.floor(width / 17.5);
  } else if (width > 500) {
    numColumns = Math.floor(width / 15);
  } else if (width > 250) {
    numColumns = Math.floor(width / 12.5);
  } else if (width > 0) {
    numColumns = Math.floor(width / 10);
  }
  let cellWidth = Math.floor(width / numColumns);
  let numRows = Math.floor(height / cellWidth);
  return [numRows, numColumns];
}

function getRandomNums(num) {
  let randomNums1 = [];
  let temp = 2;
  for (let i = 5; i < num / 2; i += 2) {
    randomNums1.push(temp);
    temp += 2;
  }
  let randomNums2 = [];
  temp = -2;
  for (let i = num / 2; i < num - 5; i += 2) {
    randomNums2.push(temp);
    temp -= 2;
  }
  return [randomNums1, randomNums2];
}

function getStartFinishNode(numRows, numColumns) {
  let randomNums;
  let x;
  let y;
  let startNodeRow;
  let startNodeCol;
  let finishNodeRow;
  let finishNodeCol;
  if (numRows < numColumns) {
    randomNums = getRandomNums(numRows);
    x = Math.floor(numRows / 2);
    y = Math.floor(numColumns / 4);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow =
      x + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    startNodeCol = y + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    finishNodeRow =
      x + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
    finishNodeCol =
      numColumns - y + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
  } else {
    randomNums = getRandomNums(numColumns);
    x = Math.floor(numRows / 4);
    y = Math.floor(numColumns / 2);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow = x + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    startNodeCol =
      y + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    finishNodeRow = numRows - x + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
    finishNodeCol =
      y + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
  }
  return [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol];
}

const getInitialGrid = (numRows, numColumns) => {
  let grid = [];
  for (let row = 0; row < numRows; row++) {
    let currentRow = [];
    for (let col = 0; col < numColumns; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    totalDistance: Infinity,
    isVisited: false,
    isShortest: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWalls = (grid, row, col) => {
  let newGrid = grid.slice();
  let node = grid[row][col];
  let newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getGridWithoutPath = (grid) => {
  let newGrid = grid.slice();
  for (let row of grid) {
    for (let node of row) {
      let newNode = {
        ...node,
        distance: Infinity,
        totalDistance: Infinity,
        isVisited: false,
        isShortest: false,
        previousNode: null,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  return newGrid;
};

const updateNodesForRender = (
  grid,
  nodesInShortestPathOrder,
  visitedNodesInOrder
) => {
  let newGrid = grid.slice();
  for (let node of visitedNodesInOrder) {
    if (
      (node.row === startNodeRow && node.col === startNodeCol) ||
      (node.row === finishNodeRow && node.col === finishNodeCol)
    )
      continue;
    let newNode = {
      ...node,
      isVisited: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
  for (let node of nodesInShortestPathOrder) {
    if (node.row === finishNodeRow && node.col === finishNodeCol) {
      return newGrid;
    }
    let newNode = {
      ...node,
      isVisited: false,
      isShortest: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
};



export default PathfindingVisualizer;

