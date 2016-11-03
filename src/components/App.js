import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {

	constructor() {
		super(); // to use 'this'


		this.addFish = this.addFish.bind(this);
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

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
				</div>
				<Order />
				<Inventory addFish={ this.addFish }/>
			</div>
		);
	}
}

export default App
