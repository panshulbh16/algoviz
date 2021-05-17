import React from 'react';
import './about.css';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Cards extends React.Component{
	// The constructor for a React component is called before it is mounted.
	constructor(props){
		// super is for calling the parent class (React.Component)
		super(props);
		// porps is passed, to access parent's attributes and use in this component
		this.state = {};
	}
	render(){
		return (

			<div className="all-cards">
				<div className="card" style={{width: '12rem'}}>
				  <img className="card-img-top" src="https://avatars.githubusercontent.com/u/72337293?v=4" alt="Card image cap" />
				  <div className="card-body">
				    <h5 className="card-title">Mehul Shrivastava</h5>
				    <p className="card-text"></p>
				    <a href="#" className="btn btn-primary">Github</a>
				  </div>
				</div>

				<div className="card" style={{width: '12rem'}}>
				  <img className="card-img-top" src="https://avatars.githubusercontent.com/u/46718284?v=4" alt="Card image cap" />
				  <div className="card-body">
				    <h5 className="card-title">Neha</h5>
				    <p className="card-text"></p>
				    <a href="#" className="btn btn-primary">Github</a>
				  </div>
				</div>
				
				<div className="card" style={{width: '12rem'}}>
				  <img className="card-img-top" src="https://avatars.githubusercontent.com/u/40309513?v=4" alt="Card image cap" />
				  <div className="card-body">
				    <h5 className="card-title">Panshul</h5>
				    <p className="card-text"></p>
				    <a href="#" className="btn btn-primary">Github</a>
				  </div>
				</div>
				<div className="card" style={{width: '12rem'}}>
				  <img className="card-img-top" src="https://avatars.githubusercontent.com/u/69101765?v=4" alt="Card image cap" />
				  <div className="card-body">
				    <h5 className="card-title">Parakh</h5>
				    <p className="card-text"></p>
				    <a href="#" className="btn btn-primary">Github</a>
				  </div>
				</div>
			</div>
		);
	}
}

export default Cards;
