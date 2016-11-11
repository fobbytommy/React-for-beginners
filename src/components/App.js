import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

	constructor() {
		super(); // to use 'this'

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);

		// getInitialState()
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
			,{
				context: this,
				state: 'fishes'
		});

		// check if there is any order in localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if (localStorageRef) {
			// update our App component's order state
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
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
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
				/>
				<Inventory
					fishes={this.state.fishes}
					addFish={ this.addFish }
					loadSamples={ this.loadSamples }
					updateFish={ this.updateFish }
				/>
			</div>
		);
	}
}

export default App
