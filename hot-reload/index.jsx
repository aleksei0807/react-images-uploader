/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const rootElement = document.getElementById('root');

ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	rootElement
);

if (module.hot && typeof module.hot.accept === 'function') {
	module.hot.accept('./app.jsx', () => {
		const NextApp = require('./app').default;

		ReactDOM.render(
			(<AppContainer>
				<NextApp />
			</AppContainer>), rootElement
		);
	});
}
