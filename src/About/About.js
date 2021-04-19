import React from 'react';
import Cards from './Cards.js';
import './about.css';
import {particlesOptions} from '../AddOns/constants';
import Particles from 'react-particles-js';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class About extends React.Component{
	// The constructor for a React component is called before it is mounted.
	constructor(props){
		// super is for calling the parent class (React.Component)
		super(props);
		// porps is passed, to access parent's attributes and use in this component
		this.state = {};
	}
	render(){
		return(
      		<div>
      			<Cards />
      			<hr />
      			<Link to="/">
	      			<Button className="btn btn-warning btn-lg sort-btn" type='submit'><h3>Visit Homepage</h3></Button>
	      		</Link>

				<Link to="/sorting">
	      			<Button className="btn btn-warning btn-lg sort-btn" type='submit'><h3>Visit Sorting</h3></Button>
	      		</Link>

	      		<Link to="/pathfinding">
	      			<Button className="btn btn-warning btn-lg path-btn" type='submit'><h3>Visit Path Finding</h3></Button>
	      		</Link>

				<Particles className='particles' params={particlesOptions} />

	      	</div>

		);
	}
}