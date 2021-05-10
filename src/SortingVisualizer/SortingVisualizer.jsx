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

export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            title: [],
            algorithmName: [],
            functionName: [],

            loading: false,
            // dropdown      
            items: algo || [],
            showItems: false,
            selectedItem: algo[1].algoName,

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

    selectItem = item => {
        this.setState({
            selectedItem: item,
            showItems: false,
        });
    };


    resetArray() {
        const array = [];
        for (let i = 0; i < 30; i++) {
            array.push(randomIntFromInterval(5, 350));
        }
        this.setState({ loading: false })
        this.setState({ array });
    }

    modifyState() {
        let title = [];
        let algorithmName = [];
        let functionName = [];
        // console.log(this.state.myobj, this.state.array);
        for (let i = 0; i < algo.length; i++) {
            title.push(algo[i]["name"]);
            algorithmName.push(algo[i]["algoName"]);
            functionName.push(algo[i]["methods"]);
        }
        // console.log(title, algorithmName, functionName)
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

        console.log("loading state sort", this.state.loading)
        let animations = [];
        console.log("Hello", sortingTechnique, functionName)

        if (sortingTechnique === "NewArray") {
            this.resetArray();
        }
        else if (sortingTechnique === "MergeSort")
            animations = getMergeSortAnimations(this.state.array);
        else if (sortingTechnique === "BubbleSort")
            animations = getBubbleSortAnimations(this.state.array);
        else if (sortingTechnique === "SelectionSort")
            animations = getSelectionSortAnimations(this.state.array);

        // animations = this.getAnimationArray(animations, functionName);
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, animations.length * 10);
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
        //this.setState({ loading: false }) 


    }

    render() {
        const { array, title, algorithmName, functionName, loading } = this.state;

        console.log(array, title, algorithmName, functionName, loading);
        return (
            <div className="parent_container">
                <nav className="navbar">
                    <h1>Sorting Visualizer</h1>
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                </nav>
                <div className="container">

                    <div className="description">
                        {/*{
                        title.map((value, idx) => (
                            <button onClick={this.sort.bind(this, algorithmName[idx], functionName[idx])}>{value}</button>
                        ))
                    }*/}

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
                                        style={{ display: this.state.showItems ? "block" : "none" }}
                                        className={"select-box--items"}
                                    >
                                        {algo.map(item => (
                                            <div
                                                key={item.id}
                                                onClick={() => this.selectItem(item.algoName)}
                                                className={this.state.selectedItem === item ? "selected" : ""}
                                            >
                                                {item.algoName}
                                            </div>
                                        ))}
                                    </div>

                                    {/* <button className="algo-button" onClick={() => this.sort(this.state.selectedItem)}>
                                       
                                        {loading && <i className="fa fa-refresh fs-spin"></i>}
                                        {loading && <span> Visualizing {this.state.selectedItem}</span>}
                                        {!loading && <span>Visualize {this.state.selectedItem} </span>}
                                        
                                    </button>
                                    */}

                                    <button className="algo-button" onClick={() => this.sort(this.state.selectedItem)}>
                                        Visualize {this.state.selectedItem}
                                    </button>
                                    {console.log("loading state", this.state.loading)}
                                    <Loader type="Rings"
                                        color='lightpink'
                                        height={100}
                                        width={100}
                                        visible={this.state.loading}> </Loader>

                                    {console.log("loading state", this.state.loading)}


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
                                    style={{ height: `${value}px` }}
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

