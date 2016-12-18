/* @flow */
import React, { Component } from 'react';
import ImagesUploader from '../src/index';
import '../src/styles/styles.css';
import '../src/styles/font.css';

export default class App extends Component {
	render() {
		return (
			<div>
				<ImagesUploader
					url="http://localhost:9090/multiple"
					optimisticPreviews
					onLoadEnd={(err) => {
						if (err) {
							console.error(err);
						}
					}}
					label="Upload multiple images"
					/>
				<ImagesUploader
					url="http://localhost:9090/notmultiple"
					optimisticPreviews
					multiple={false}
					onLoadEnd={(err) => {
						if (err) {
							console.error(err);
						}
					}}
					styles={{
						container: {
							paddingTop: 15,
						},
					}}
					label="Upload a picture"
					/>
			</div>
		);
	}
}
