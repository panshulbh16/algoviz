import React from 'react';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort';
import './SortingVisualizer.css';



export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 30; i++) {
            array.push(randomIntFromInterval(5, 350));
        }
        this.setState({ array });
    }



    sort(sortingTechnique: String) {
        console.log(sortingTechnique);
        let animations = [];
        if (sortingTechnique === "Merge")
            animations = getMergeSortAnimations(this.state.array);
        else if (sortingTechnique === "Bubble")
            animations = getBubbleSortAnimations(this.state.array);
        else if (sortingTechnique === "Selection")
            animations = getSelectionSortAnimations(this.state.array);
        // else --> call your algo function ;)
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'purple' : 'lightpink';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 10);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 10);
            }
        }

    }

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                {
                    array.map((value, idx) => (
                        <div
                            className="array-bar" key={idx}
                            key={idx}
                            style={{ height: `${value}px` }}
                        >

                        </div>
                    ))
                }
                <hr />

                <div>

                    <button onClick={() => this.resetArray()}>Generate New Array</button>

                    <button onClick={this.sort.bind(this, "Merge")}>Merge Sort</button>

                    <button onClick={this.sort.bind(this, "Bubble")}>Bubble Sort</button>

                    <button onClick={this.sort.bind(this, "Selection")}>Selection Sort</button>


                </div>

            </div>
        );

    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length != arrayTwo.length)
        return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] != arrayTwo[i])
            return false;
    }
    return true;
}
