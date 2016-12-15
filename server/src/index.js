/* @flow */
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';

const app = express();

app.use('/static', express.static('./server/static'));

app.use(corsPrefetch);

app.post('/multiple', imagesUpload(
	'./server/static/multipleFiles',
	'http://localhost:9090/static/multipleFiles',
	true
));

app.post('/notmultiple', imagesUpload(
	'./server/static/files',
	'http://localhost:9090/static/files'
));

app.listen(9090, () => {
	console.log('Listen: 9090');
});
