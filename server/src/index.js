/* @flow */
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';

const app = express();

app.use('/static', express.static('./static'));

app.use(corsPrefetch);

app.post('/multiple', imagesUpload(
	'./static/multipleFiles',
	'http://localhost:9090/static/multipleFiles',
	true
));

app.post('/notmultiple', imagesUpload(
	'./static/files',
	'http://localhost:9090/static/files'
));

app.listen(9090, () => {
	console.log('Listen: 9090');
});
