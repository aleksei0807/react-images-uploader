'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _corsPrefetchMiddleware = require('cors-prefetch-middleware');

var _corsPrefetchMiddleware2 = _interopRequireDefault(_corsPrefetchMiddleware);

var _imagesUploadMiddleware = require('images-upload-middleware');

var _imagesUploadMiddleware2 = _interopRequireDefault(_imagesUploadMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


app.use('/static', _express2.default.static('./static'));

app.use(_corsPrefetchMiddleware2.default);

app.post('/multiple', (0, _imagesUploadMiddleware2.default)('./static/multipleFiles', 'http://localhost:9090/static/multipleFiles', true));

app.post('/notmultiple', (0, _imagesUploadMiddleware2.default)('./static/files', 'http://localhost:9090/static/files'));

app.listen(9090, function () {
	console.log('Listen: 9090');
});
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, 'app', 'server/src/index.js');
}();

;