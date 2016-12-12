/* @flow */
import React, { Component } from 'react';
import ImagesUploader from '../src/index';
import '../src/styles/styles.css';

export default class App extends Component {
	render() {
		return (
			<ImagesUploader optimisticPreviews />
		);
	}
}
