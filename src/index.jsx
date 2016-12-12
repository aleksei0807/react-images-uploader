/* @flow */
import React, { Component } from 'react';

export default class ImagesUploader extends Component {
	render() {
		const { classNamespace = 'iu-' } = this.props;

		return (
			<div className={`${classNamespace}container`} classNamespace={classNamespace}>
				ImagesUploader
			</div>
		);
	}
}
