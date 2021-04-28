import React from 'react';
import  {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js';
import  {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.js';
import  {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort';
import { algo } from './allAlgorithms';
import './SortingVisualizer.css';



export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            title: [],
            algorithmName: [],
            functionName: [],
        };
    }

    componentDidMount() {
        this.resetArray(); 
        this.modifyState();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 30; i++) {
            array.push(randomIntFromInterval(5, 350));
        }
        this.setState({ array });
    }

    modifyState(){
        let title = [];
        let algorithmName = [];
        let functionName = [];
        // console.log(this.state.myobj, this.state.array);
        for (let i = 0; i<algo.length; i++){
            title.push(algo[i]["name"]);
            algorithmName.push(algo[i]["algoName"]);
            functionName.push(algo[i]["methods"]);
        }
        console.log(title, algorithmName, functionName)
        this.setState({ 
            title: title,
            algorithmName: algorithmName,
            functionName: functionName,
        });
    }

    // getAnimationArray(animations, functionName){
    //     // var hackerAll = functionName;
    //     // var fn_string = hackerAll.toString()
    //     // console.log("hello", fn_string);
    //     // var back_to_fn = new Function(`return ${fn_string}`)()

    //     switch(functionName){
    //         case "getMergeSortAnimations": 
    //             animations = getMergeSortAnimations(this.state.array);
    //             break;
    //         case "getBubbleSortAnimations": 
    //             animations = getBubbleSortAnimations(this.state.array);
    //             break;
    //         case "getSelectionSortAnimations": 
    //             animations = getSelectionSortAnimations(this.state.array);
    //             break;
    //         case "resetArray": 
    //             animations = this.resetArray();
    //             break;
    //         default: 
    //         console.log(functionName)

    //             console.log("Sorry, issues are there");
    //             break;
    //     }
    //     return animations;
    // }

    sort(sortingTechnique, functionName) {
        let animations = [];
        if (sortingTechnique === "NewArray"){
            this.resetArray();
        }
        else if (sortingTechnique === "Merge")
            animations = getMergeSortAnimations(this.state.array);
        else if (sortingTechnique === "Bubble")
            animations = getBubbleSortAnimations(this.state.array);
        else if (sortingTechnique === "Selection")
            animations = getSelectionSortAnimations(this.state.array);
        
        // animations = this.getAnimationArray(animations, functionName);



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
    // buttons(){
        
    //     return [title, algorithmName, functionName]

    // }

                           

    render() {
        const { array, title, algorithmName, functionName } = this.state;
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

                

                {
                    title.map((value, idx) => (
                        <button onClick={this.sort.bind(this, algorithmName[idx], functionName[idx])}>{value}</button>
                    ))
                }



{/*                    <button onClick={() => this.resetArray()}>Generate New Array</button>

                    <button onClick={this.sort.bind(this, "Merge")}>Merge Sort</button>

                    <button onClick={this.sort.bind(this, "Bubble")}>Bubble Sort</button>

                    <button onClick={this.sort.bind(this, "Selection")}>Selection Sort</button>
*/}


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
