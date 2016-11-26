import React, { Component } from 'react';

export default class CustomComponent extends Component {
	render() {
		return (
			<div className={this.props.className || 'custom-component'}>
				Custom Component
			</div>
		);
	}
}
