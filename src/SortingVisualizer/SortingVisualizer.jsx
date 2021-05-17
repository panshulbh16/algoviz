import React from 'react';
import { particlesOptions } from '../AddOns/constants';
import Particles from 'react-particles-js';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort';
import { algo } from './allAlgorithms';
import './SortingVisualizer.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Styles} from '../AddOns/styled.js';

export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            title: [],
            algorithmName: [],
            functionName: [],
            desc:[],
            text: algo[1].desc,
            // loading: false,
            // dropdown      
            items: algo || [],
            showItems: false,
            selectedItem: algo[1].algoName,
            value:30,

            // misc
            // algoNow: "Nothing"
        };
    }

    componentDidMount() {
        this.resetArray();
        this.modifyState();
    }



    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }));
    };

    selectItem = (item,id) => {
        // console.log(item,id);
        this.setState({
            selectedItem: item,
            showItems: false,
            text: algo[id-1].desc

        });
    };

    resetArray(arraysize=30) {
        const array = [];
        for (let i = 0; i < arraysize; i++) {
            array.push(randomIntFromInterval(5, 350));
        }
        this.setState({ loading: false })
        this.setState({ array });
    }

    modifyState() {
        let title = [];
        let algorithmName = [];
        let functionName = [];
        let desc = [];
        // console.log(this.state.myobj, this.state.array);
        for (let i = 0; i < algo.length; i++) {
            title.push(algo[i]["name"]);
            algorithmName.push(algo[i]["algoName"]);
            functionName.push(algo[i]["methods"]);
            desc.push(algo[i]["desc"]);
        }
        // console.log(title, algorithmName, functionName)
        this.setState({
            title: title,
            algorithmName: algorithmName,
            functionName: functionName,
            desc: desc,
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

        if (sortingTechnique === "NewArray") {
            this.resetArray();
        }
        else if (sortingTechnique === "MergeSort"){
            animations = getMergeSortAnimations(this.state.array);
            // setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
            console.log(this.state.array, animations);
        }
        else if (sortingTechnique === "BubbleSort"){
            animations = getBubbleSortAnimations(this.state.array);
            console.log(animations);
        }
        else if (sortingTechnique === "SelectionSort"){
            animations = getSelectionSortAnimations(this.state.array);
            console.log(animations);
        }

        // animations = this.getAnimationArray(animations, functionName);
        // setTimeout(() => {

            for (let i = 0; i < animations.length; i++) {
        // this.setState({ loading: true });

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
            // this.setState({ loading: false }) 
        // }}, 10);
}
        
        //         this.resetArray()
        
                // setTimeout(() => {
            // this.setState({ loading: false })
        // }, animations.length * 10);

        
    }


    // runAnimation(sortingTechnique, functionName){

    // }

    handleOnChange = (e) => {
        this.setState({value:e.target.value});
         this.resetArray(this.state.value)
    }

    render() {
        const { array, title, algorithmName, functionName, desc, loading } = this.state;
        // console.log(array, title, algorithmName, functionName, loading);
        return (
            <div className="parent_container">
                <nav className="navbar">
                    <h1>Sorting Visualizer</h1>
                <Styles>
                    <div className="slider"> <input type="range" min={10} max={70} value={this.state.value} className="slider" onChange={this.handleOnChange}/>
                    <div className="value">{this.state.value}</div></div>
                </Styles>
                    <button onClick={() => this.resetArray(this.state.value)}>Generate New Array</button>
                </nav>
                <div className="container">
                    <div className="description">
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
                                        style={{ paddingRight:"10%",left:'18%' ,position: "absolute", border : "solid", borderWidth: 'thin' , backgroundColor: 'rgba(0,0,0,1)',  display: this.state.showItems ? "block" : "none" }}
                                        className={"select-box--items"}
                                    >
                                        {algo.map(item => (
                                            <div
                                                key={item.id}
                                                onClick={() => this.selectItem(item.algoName,item.id)/*, this.mapDesc(item.id)*/}
                                                className={this.state.selectedItem === item ? "selected" : ""}
                                            >
                                                {item.algoName}
                                            </div>
                                        ))}
                                    </div>

                
                                    <div className="descText">{this.state.text}</div> 


                                    <button className="algo-button" onClick={() => this.sort(this.state.selectedItem)}>
                                        Visualize {this.state.selectedItem}
                                    </button>
                                    {/*console.log("loading state", this.state.loading)*/}
                                {/*    <Loader type="Rings"
                                        color='lightpink'
                                        height={100}
                                        width={100}
                                        visible={this.state.loading}> </Loader>*/}

                                    {/*console.log("loading state", this.state.loading)*/}


                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="array-container">

                        {
                            array.map((value, idx) => (
                                <div
                                    className="array-bar" key={idx}
                                    key={idx}
                                    style={{ height: `${value}px` , width: `${450/this.state.value}px`}}
                                >
                                    
                                </div>
                            ))
                        }
                        <hr />


                        {/*<span onClick={() => this.resetArray()}>Running {this.state.algoNow}</span>*/}

                        {/*{
                        title.map((value, idx) => (
                            <button onClick={this.sort.bind(this, algorithmName[idx], functionName[idx])}>{value}</button>
                        ))
                    }*/}

                    </div>


                    <Particles className='particles' params={particlesOptions} />

                </div>
            </div>
        );

    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

