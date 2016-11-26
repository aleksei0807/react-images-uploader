import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomComponent from '../src/index';
import CSSModules from 'react-css-modules';
import styles from '../src/styles/index.css';

@CSSModules(styles)
class App extends Component {
	render() {
		return (
			<CustomComponent styleName="custom-component" />
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
