import React from 'react';
import { particlesOptions } from '../AddOns/constants';
import Particles from 'react-particles-js';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort';
import { algo } from './allAlgorithms_sorting';
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
            text: algo[0].desc,
            // loading: false,
            // dropdown      
            item: algo || [],
            showItems: false,
            selectedalgo: algo[0].algoName,
            selectedItem: algo[0].name,
            value: 30,
            speed: 10,
            speedState: "Speed",

            visualizingAlgorithm: false,
            // misc
            // algoNow: "Nothing"
        };
    }

    componentDidMount() {
        this.resetArray();
        this.modifyState();
    }

    changeSpeed(speed) {
        if (this.state.visualizingAlgorithm) {return;}
        let value = 20
        if (speed === "Slow") value = 30;
        else if (speed === "Medium") value = 20;
        else if (speed === "Fast") value = 10;

        this.setState({ speedState: speed });
        this.setState({ speed: value });

    }

    dropDown = () => {
        if (this.state.visualizingAlgorithm) {return;}
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }));
    };

    selectItem = (algo,item,id,text) => {
         console.log(item,id,text);
        this.setState({
            selectedalgo: algo,
            selectedItem: item,
            showItems: false,
            text: text,

        });
    };


    resetArray(arraysize=30) {
        if (this.state.visualizingAlgorithm) {return;}
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
        let desc = [];
        // console.log(this.state.myobj, this.state.array);
        for (let i = 0; i < algo.length; i++) {
            title.push(algo[i]["name"]);
            algorithmName.push(algo[i]["algoName"]);
            desc.push(algo[i]["desc"]);
        }
        // console.log(title, algorithmName)
        this.setState({
            title: title,
            algorithmName: algorithmName,
            desc: desc,
        });
    }



    sort(sortingTechnique) {
        if (this.state.visualizingAlgorithm) {return;}
        let animations = [];
        if (sortingTechnique === "NewArray") {
            this.resetArray();
        }
        else if (sortingTechnique === "Visualize Algorithm" || sortingTechnique === "Select an Algorithm!") {
            this.setState({ selectedalgo: "Select an Algorithm!" });
            return;
        }
        else if (sortingTechnique === "Visualize MergeSort"){
            // this.setState({ visualizingAlgorithm: true });
            animations = getMergeSortAnimations(this.state.array);
            // setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
            console.log(this.state.array, animations);
        }
        else if (sortingTechnique === "Visualize BubbleSort"){
            this.setState({ visualizingAlgorithm: true });
            animations = getBubbleSortAnimations(this.state.array);
            console.log(animations);
        }
        else if (sortingTechnique === "Visualize SelectionSort"){
            this.setState({ visualizingAlgorithm: true });
            animations = getSelectionSortAnimations(this.state.array);
            console.log(animations);
        }

        // animations = this.getAnimationArray(animations, functionName);
       /*
        *this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, animations.length * 10);
        */

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
                }, i * this.state.speed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.speed);
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
        if (this.state.visualizingAlgorithm) {return;}
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
                    <button  onClick={() => this.sort(this.state.selectedalgo)}>
                        {this.state.selectedalgo}
                    </button>

                    <button onClick={() => this.resetArray(this.state.value)}>Generate New Array</button>
                    
                    <div className="dropdown-container">
                        <div className="select-box--box">
                            <div className="select-box--container">
                                <div className="select-box--selected-item">
                                    {this.state.speedState}
                                    {/*{console.log(this.state.selectedItem.value)}*/}
                                </div>
                                <div className="select-box--arrow" onClick={this.dropDown}>
                                    <span
                                        className={`${this.state.speedState !== "Speed"
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
                                            <button
                                                key={item.id}
                                                className="button_dropdown"
                                                type="button"
                                                onClick={() => this.selectItem(item.algoName, item.name ,item.id,item.desc)/*, this.mapDesc(item.id)*/}
                                               // className={this.state.selectedItem === item ? "selected" : ""}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>

                
                                    <div className="desText">{this.state.text.split('\n').map((item, i) => <p key={i}>{item}</p>)}</div>


                                    
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

