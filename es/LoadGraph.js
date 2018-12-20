import React from 'react';
import '../sigma/main.js';
import { embedProps } from './tools';
// import shallowCompare from 'react-addons-shallow-compare'

/**

LoadGraph component, Can be used within Sigma component.

 @param {Sigma$Graph$Data} graph   Optional graph data
 @param {Function} onGraphLoaded   Optional callback for graph update

**/

class LoadGraph extends React.PureComponent {

	constructor(props) {
		super(props);

		this.onLoad = () => {
			if (this.props.sigma) this.props.sigma.refresh();
			//React.Children.forEach(this.props.children, function(c) {
			//	c._refreshGraph()
			//})
			if (this.state.listener) {
				this.state.listener._restartForceAtlas2();
			}
			this.setState({ loaded: true });
			if (this.props.onGraphLoaded) return this.props.onGraphLoaded();
		};

		this.state = { loaded: false };
	}

	componentDidMount() {
		this._load(this.props.graph);
	}

	componentWillReceiveProps(props) {
		// reload only if graph changes
		// TODO if(... not shallowEqual(this.props.graph, props.graph) {
		this.setState({ loaded: false });
		this._load(props.graph);
		// }
	}

	render() {
		if (!this.state.loaded) return null;
		return React.createElement(
			'div',
			null,
			embedProps(this.props.children, { sigma: this.props.sigma, ref: c => this.setState({ listener: c }) })
		);
	}

	_load(graph) {
		try {
			console.log("LoadGraph._load");
			this.props.sigma.graph.clear();
			console.log("LoadGraph._load clear");
			this.props.sigma.graph.read(graph);
			console.log("LoadGraph._load read");
			this.onLoad();
			console.log("LoadGraph._load onLoad");
		} catch (e) {
			console.log('Sigma.LoadGraph._load catch ' + e);
			console.log("LoadGraph._load error ", e);
			if (this.props.onSigmaException) this.props.onSigmaException(e);
		}
	}
}

LoadGraph.propTypes = {
	graph: typeof Sigma$Graph$Data === 'function' ? require('prop-types').instanceOf(Sigma$Graph$Data) : require('prop-types').any,
	onGraphLoaded: require('prop-types').func,
	children: require('prop-types').any,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
export default LoadGraph;