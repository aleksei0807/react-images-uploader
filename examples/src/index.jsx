/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import ImagesUploader from '../../lib/index';
import '../../styles.css';
import '../../font.css';

ReactDOM.render(
	<div className="examples-container">
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
	</div>,
	document.getElementById('root')
);
