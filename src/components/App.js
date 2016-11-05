import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {

	constructor() {
		super(); // to use 'this'

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);

		// getInitialState()
		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish) {
		// update our state
		const fishes = {...this.state.fishes}; // ... is spread in ES6. making a copy
		// add in our new fish
		const timestamp = Date.now(); // adding time in millisecs
		fishes[`fish-${timestamp}`] = fish;
		// set state
		this.setState({ fishes }) // same thing as { fishes: fishes }
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		const order = {...this.state.order}; // object spread
		// update or add the new number of fish orderd
		order[key] = order[key] + 1 || 1;
		// update our state
		this.setState({ order })
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order />
				<Inventory addFish={ this.addFish } loadSamples={ this.loadSamples }/>
			</div>
		);
	}
}

export default App
