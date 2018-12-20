'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/main.js');

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

LoadGraph component, Can be used within Sigma component.

 @param {Sigma$Graph$Data} graph   Optional graph data
 @param {Function} onGraphLoaded   Optional callback for graph update

**/

// import shallowCompare from 'react-addons-shallow-compare'

var LoadGraph = function (_React$PureComponent) {
	_inherits(LoadGraph, _React$PureComponent);

	function LoadGraph(props) {
		_classCallCheck(this, LoadGraph);

		var _this = _possibleConstructorReturn(this, (LoadGraph.__proto__ || Object.getPrototypeOf(LoadGraph)).call(this, props));

		_this.onLoad = function () {
			if (_this.props.sigma) _this.props.sigma.refresh();
			//React.Children.forEach(this.props.children, function(c) {
			//	c._refreshGraph()
			//})
			if (_this.state.listener) {
				_this.state.listener._restartForceAtlas2();
			}
			_this.setState({ loaded: true });
			if (_this.props.onGraphLoaded) return _this.props.onGraphLoaded();
		};

		_this.state = { loaded: false };
		return _this;
	}

	_createClass(LoadGraph, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._load(this.props.graph);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			// reload only if graph changes
			// TODO if(... not shallowEqual(this.props.graph, props.graph) {
			this.setState({ loaded: false });
			this._load(props.graph);
			// }
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (!this.state.loaded) return null;
			return _react2.default.createElement(
				'div',
				null,
				(0, _tools.embedProps)(this.props.children, { sigma: this.props.sigma, ref: function ref(c) {
						return _this2.setState({ listener: c });
					} })
			);
		}
	}, {
		key: '_load',
		value: function _load(graph) {
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
	}]);

	return LoadGraph;
}(_react2.default.PureComponent);

LoadGraph.propTypes = {
	graph: typeof Sigma$Graph$Data === 'function' ? require('prop-types').instanceOf(Sigma$Graph$Data) : require('prop-types').any,
	onGraphLoaded: require('prop-types').func,
	children: require('prop-types').any,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
exports.default = LoadGraph;