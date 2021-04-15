import React from 'react';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import {getSelectionSortAnimation } from '../SortingAlgorithms/SelectionSort';
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
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
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
    /*
    quickSort() {


    }

    heapSort() {

    }
*/


    selectionSort(){
        const [animations, array] = getBubbleSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "compare1") || (animations[i][0] === "compare2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "compare1") ? 'purple' : 'pink';
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * 40);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * 40);  
            }
        }
    }

    bubbleSort() {
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "compare1" || animations[i][0] === "compare2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "compare1") ? 'purple' : 'pink';
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * 40);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                console.log(swap, barIndex, newHeight);
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * 40);  
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
                            style={{height: `${value}px`}}
                        >
                            
                        </div>
                    ))
                }
               <div>
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
               
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>

                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>

                    <button onClick={() => this.selectionSort()}>Selection Sort</button>

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
