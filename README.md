# React Images Uploader

[![NPM](https://nodei.co/npm/react-images-uploader.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-images-uploader/)

React.js component for uploading images to the server

![Demo](https://cdn.rawgit.com/aleksei0807/react-images-uploader/master/examples/demo.gif "Demo")

## Examples

### Example for multiple images:

```javascript
import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export default class MyUploader extends Component {
	render() {
		return (
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
		);
	}
}
```

### Example for one picture:

```javascript
import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export default class MyUploader extends Component {
	render() {
		return (
			<ImagesUploader
				url="http://localhost:9090/notmultiple"
				optimisticPreviews
				multiple={false}
				onLoadEnd={(err) => {
					if (err) {
						console.error(err);
					}
				}}
				label="Upload a picture"
				/>
		);
	}
}
```

### Example server (Node.js, Express)

you need to install cors-prefetch-middleware and images-upload-middleware from npm.

```javascript
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
```

## Props

- `url: string` - server url;
- `classNamespace: string` - namespace for all classNames (`default: 'iu-'`);
- `inputId: string` - id and name for hidden input type file. Used for htmlFor in label (`default: 'filesInput'`);
- `label: string` - label text;
- `images: Array` - an array of references to the already uploaded images;
- `disabled: boolean`;
- `onLoadStart: function()` - callback, which is called when the download starts;
- `onLoadEnd: function(error: { message: string, ... }, response?: JSON)`

	Error messages:
	- `invalid response type` - additional params: response, fileName (imagesUploader);
	- `server error` - additional params: status (response status), fileName (imagesUploader);
	- `exceeded the number` - if there is `max` property and files count > max;
	- `file type error` - additional params: type (file type), fileName (imagesUploader);

- `deleteImage: function(key: number)` - callback which is called when the image has been deleted from the list;
- `optimisticPreviews: boolean` - enables optimistic previews `default: false`;
- `multiple: boolean` - allows to upload a bunch of images !`default: true`!;
- `image: string` - this property works only when multiple: false! already loaded picture;
- `notification: string` - this property works only with multiple: false! notification text;
- `max: number` - the maximum number of pictures for a single upload;
- `color: string` - color for text and svg `default: '#142434'`;
- `disabledColor: string` - color for text and svg in disabled mode `default: '#bec3c7'`;
- `borderColor: string` - border color `default: '#a9bac8'`;
- `disabledBorderColor: string` - border color in disabled mode `default: '#bec3c7'`;
- `notificationBgColor: string` - background color for notification `default: 'rgba(0, 0, 0, 0.3)'`;
- `notificationColor: string` - text and svg color for notification `default: '#fafafa'`;
- `deleteElement: string|element` - element for removing images;
- `plusElement: string|element` - element for adding images;
```
classNames: {
	container: string,
	label: string,
	deletePreview: string,
	loadContainer: string,
	dropzone: string,
	pseudobutton: string,
	pseudobuttonContent: string,
	imgPreview: string,
	fileInput: string,
	emptyPreview: string,
	filesInputContainer: string,
	notification: string,
}
```
```
styles: {
	container: Object,
	label: Object,
	deletePreview: Object,
	loadContainer: Object,
	dropzone: Object,
	pseudobutton: Object,
	pseudobuttonContent: Object,
	imgPreview: Object,
	fileInput: Object,
	emptyPreview: Object,
	filesInputContainer: Object,
	notification: Object,
}
```
