/* @flow */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CustomComponent from '../src/index';
import styles from '../src/styles/index.css';

@CSSModules(styles)
export default class App extends Component {
	render() {
		return (
			<CustomComponent styleName="custom-component" />
		);
	}
}
