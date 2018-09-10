// @flow

import React from 'react'
import '../sigma/main.js'
import { embedProps } from './tools'

type State = {
	loaded: boolean
};
type Props = {
	graph?: Sigma$Graph$Data,
	onGraphLoaded?: () => void,
	children?: mixed,
	sigma?: Sigma
};


/**

LoadGraph component, Can be used within Sigma component.

 @param {Sigma$Graph$Data} graph   Optional graph data
 @param {Function} onGraphLoaded   Optional callback for graph update

**/


class LoadGraph extends React.PureComponent {
	state: State;
	props: Props;

	constructor(props: Props) {
		super(props)
		this.state = {loaded:false}
	}

	componentDidMount() {
		this._load(this.props.graph)
	}

	componentWillReceiveProps(props: Props) {
		// reload only if graph changes
		// TODO if(... not shallowEqual(this.props.graph, props.graph) {
			this.setState({loaded:false})
			this._load(props.graph)
		// }
	}

	render() {
		if(!this.state.loaded)
			return null
		return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
	}

	onLoad = () => {
		if(this.props.sigma)
			this.props.sigma.refresh()
		this.setState({loaded:true})
		if(this.props.onGraphLoaded)
			return this.props.onGraphLoaded()
	}

	_load(graph?: Sigma$Graph$Data) {
		try {
			this.props.sigma.graph.clear()
			this.props.sigma.graph.read(graph)
			this.onLoad()
		} catch(e) {
			if(this.props.onSigmaException)
				this.props.onSigmaException(e)
		}
	}
}

export default LoadGraph;
