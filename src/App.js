import './App.css';
import Home from './MainPage/Home';
import About from './About/About';
import pathFinding from './PathFindingVisualizer/pathfindingVisualizer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import {particlesOptions} from './AddOns/constants';
import Particles from 'react-particles-js';


function App() {
  return (
  	<div className="App">
    	<Router>
      <div>
      	<Switch>
      		<Route path="/" exact>
      			<h1 className="home-fonts">AlgoViz</h1>
      			<Home />
      		</Route>
      		<Route path="/sorting" component={SortingVisualizer} />
      		<Route path="/pathfinding" component={pathFinding} />
      		<Route path="/about" component={About} />
  	    </Switch>
      </div>
      {
      	// particle animation will only be in / or landing page
      }
        <Route path="/" exact>
    		  <Particles className='particles' params={particlesOptions} />
    		</Route>
      </Router>

    {// if yor need particle animation in all pages un-commnet 
  		//<Particles className='particles' params={particlesOptions} />

    }
  	</div>
  );
}

export default App;
