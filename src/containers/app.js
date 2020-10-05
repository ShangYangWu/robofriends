import React from 'react';
import Cardlist from '../components/cardlist.js';
import Searchbox from '../components/searchbox.js';
// import {robots} from './robots.js';
import Scroll from '../components/scroll.js';
import ErrorBoundry from '../components/ErrorBoundry.js';
import './app.css';


class App extends React.Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield:''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then( response => {
				return response.json();
		}).then( users => {
			this.setState({ robots:users })
		});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
		// const filteredRobots = this.state.robots.filter((robots) =>{
		// 	return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		// })
		// console.log(filteredRobots);
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter((robot) =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return (!robots.length) ?
			<h1 className='tc'>loading</h1> :
			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<Searchbox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundry>
							<Cardlist robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
			);
	}
}


export default App;