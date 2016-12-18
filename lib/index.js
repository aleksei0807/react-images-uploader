'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactProgressButton = require('react-progress-button');

var _reactProgressButton2 = _interopRequireDefault(_reactProgressButton);

require('babel-core/register');

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var ImagesUploader = (_class = function (_Component) {
	(0, _inherits3.default)(ImagesUploader, _Component);

	/* eslint-disable react/sort-comp */
	function ImagesUploader(props) {
		(0, _classCallCheck3.default)(this, ImagesUploader);

		var _this = (0, _possibleConstructorReturn3.default)(this, (ImagesUploader.__proto__ || Object.getPrototypeOf(ImagesUploader)).call(this, props));

		var imagePreviewUrls = [];
		if (_this.props.images && _this.props.multiple !== false) {
			imagePreviewUrls = _this.props.images || [];
		}
		if (_this.props.image && _this.props.multiple === false) {
			imagePreviewUrls = [_this.props.image];
		}
		_this.state = {
			imagePreviewUrls: imagePreviewUrls,
			loadState: '',
			optimisticPreviews: [],
			displayNotification: false
		};
		_this.input = null;
		return _this;
	}
	/* eslint-enable react/sort-comp */

	(0, _createClass3.default)(ImagesUploader, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			document.addEventListener('dragover', function (event) {
				// prevent default to allow drop
				event.preventDefault();
			}, false);
			document.addEventListener('drop', function (event) {
				// prevent default to allow drop
				event.preventDefault();
			}, false);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!this.props.images && nextProps.images && nextProps.multiple !== false) {
				this.setState({
					imagePreviewUrls: nextProps.images
				});
			}
			if (!this.props.image && nextProps.image && nextProps.multiple === false) {
				this.setState({
					imagePreviewUrls: [nextProps.image]
				});
			}
		}
	}, {
		key: 'deleteImage',
		value: function deleteImage(key) {
			if (!this.props.disabled) {
				var _imagePreviewUrls = this.state.imagePreviewUrls;
				_imagePreviewUrls.splice(key, 1);
				this.setState({
					imagePreviewUrls: _imagePreviewUrls
				});
				if (this.props.deleteImage && typeof this.props.deleteImage === 'function') {
					this.props.deleteImage(key);
				}
			}
		}
	}, {
		key: 'buildPreviews',
		value: function buildPreviews(urls, optimisticUrls, inButton) {
			var _this2 = this;

			var _props = this.props,
			    classNamespace = _props.classNamespace,
			    disabled = _props.disabled,
			    classNames = _props.classNames,
			    styles = _props.styles,
			    color = _props.color,
			    disabledColor = _props.disabledColor,
			    borderColor = _props.borderColor,
			    disabledBorderColor = _props.disabledBorderColor,
			    notificationBgColor = _props.notificationBgColor,
			    notificationColor = _props.notificationColor,
			    deleteElement = _props.deleteElement,
			    plusElement = _props.plusElement;


			if ((!urls || urls.length < 1) && (!optimisticUrls || optimisticUrls.length < 1)) {
				return _react2.default.createElement('div', {
					className: classNames.emptyPreview || classNamespace + 'emptyPreview',
					style: styles.emptyPreview
				});
			}
			var previews = [];
			var multiple = this.props.multiple;
			if (urls && urls.length > 0 && !(multiple === false && optimisticUrls && optimisticUrls.length > 0)) {
				previews = urls.map(function (url, key) {
					if (url) {
						var imgPreviewStyle = {
							backgroundImage: 'url(' + url + ')',
							borderColor: disabled ? disabledBorderColor : borderColor
						};

						if (_this2.props.size) {
							imgPreviewStyle = (0, _extends3.default)({}, imgPreviewStyle, {
								width: _this2.props.size,
								height: _this2.props.size
							}, styles.imagePreview || {});
						}

						var deletePreviewStyle = (0, _extends3.default)({
							color: disabled ? disabledColor : color,
							borderColor: disabled ? disabledBorderColor : borderColor
						}, styles.deletePreview || {});

						return _react2.default.createElement(
							'div',
							{
								className: classNames.imgPreview || classNamespace + 'imgPreview',
								key: key,
								style: imgPreviewStyle },
							!inButton ? _react2.default.createElement(
								'div',
								{
									className: classNames.deletePreview || classNamespace + 'deletePreview',
									style: deletePreviewStyle,
									onClick: function onClick(e) {
										e.preventDefault();
										_this2.deleteImage(key);
									} },
								deleteElement || _react2.default.createElement(
									'svg',
									{ xmlns: 'http://www.w3.org/2000/svg', width: '7.969', height: '8', viewBox: '0 0 7.969 8' },
									_react2.default.createElement('path', {
										id: 'X_Icon',
										'data-name': 'X Icon',
										style: {
											fill: disabled ? disabledColor : color,
											fillRule: 'evenodd'
										}
										/* eslint-disable max-len */
										, d: 'M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z'
										/* eslint-enable max-len */
										, transform: 'translate(-557 -602)'
									})
								)
							) : _react2.default.createElement(
								'div',
								{
									className: classNames.notification || classNamespace + 'notification',
									style: styles.notification ? (0, _extends3.default)({}, styles.notification, {
										display: _this2.state.displayNotification ? 'block' : 'none',
										backgroundColor: notificationBgColor,
										color: notificationColor
									}) : {
										display: _this2.state.displayNotification ? 'block' : 'none',
										backgroundColor: notificationBgColor,
										color: notificationColor
									} },
								_react2.default.createElement(
									'span',
									null,
									_this2.props.notification || _this2.buildPlus(disabled, notificationColor, disabledColor, plusElement)
								)
							)
						);
					}
					return null;
				});
			}
			if (optimisticUrls && optimisticUrls.length > 0) {
				(function () {
					var length = previews.length;
					previews = previews.concat(optimisticUrls.map(function (url, key) {
						if (url) {
							var imgPreviewStyle = {
								backgroundImage: 'url(' + url + ')',
								borderColor: disabled ? disabledBorderColor : borderColor
							};

							if (_this2.props.size) {
								imgPreviewStyle = (0, _extends3.default)({}, imgPreviewStyle, {
									width: _this2.props.size,
									height: _this2.props.size
								}, styles.imgPreview || {});
							}

							return _react2.default.createElement('div', {
								className: classNames.imgPreview || classNamespace + 'imgPreview',
								key: length + key,
								style: imgPreviewStyle
							});
						}
						return null;
					}));
				})();
			}
			return previews;
		}
	}, {
		key: 'loadImages',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(files, url, onLoadEnd) {
				var imageFormData, i, response, multiple, _imagePreviewUrls2, err, _err;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!url) {
									_context.next = 24;
									break;
								}

								_context.prev = 1;
								imageFormData = new FormData();


								for (i = 0; i < files.length; i++) {
									imageFormData.append('imageFiles', files[i], files[i].name);
								}

								_context.next = 6;
								return (0, _isomorphicFetch2.default)(url, {
									method: 'POST',
									credentials: 'include',
									body: imageFormData
								});

							case 6:
								response = _context.sent;

								if (!(response && response.status && response.status === 200)) {
									_context.next = 15;
									break;
								}

								_context.next = 10;
								return response.json();

							case 10:
								response = _context.sent;
								multiple = this.props.multiple;

								if (response instanceof Array || typeof response === 'string') {
									_imagePreviewUrls2 = [];

									if (multiple === false) {
										_imagePreviewUrls2 = response instanceof Array ? response : [response];
									} else {
										_imagePreviewUrls2 = this.state.imagePreviewUrls.concat(response);
									}
									this.setState({
										imagePreviewUrls: _imagePreviewUrls2,
										optimisticPreviews: [],
										loadState: 'success'
									});
									if (onLoadEnd && typeof onLoadEnd === 'function') {
										onLoadEnd(false, response);
									}
								} else {
									err = {
										message: 'invalid response type',
										response: response,
										fileName: 'ImagesUploader'
									};

									this.setState({
										loadState: 'error',
										optimisticPreviews: []
									});
									if (onLoadEnd && typeof onLoadEnd === 'function') {
										onLoadEnd(err);
									}
								}
								_context.next = 18;
								break;

							case 15:
								_err = {
									message: 'server error',
									status: response ? response.status : false,
									fileName: 'ImagesUploader'
								};

								this.setState({
									loadState: 'error',
									optimisticPreviews: []
								});
								if (onLoadEnd && typeof onLoadEnd === 'function') {
									onLoadEnd(_err);
								}

							case 18:
								_context.next = 24;
								break;

							case 20:
								_context.prev = 20;
								_context.t0 = _context['catch'](1);

								if (onLoadEnd && typeof onLoadEnd === 'function') {
									onLoadEnd(_context.t0);
								}
								this.setState({
									loadState: 'error',
									optimisticPreviews: []
								});

							case 24:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[1, 20]]);
			}));

			function loadImages(_x, _x2, _x3) {
				return _ref.apply(this, arguments);
			}

			return loadImages;
		}()
	}, {
		key: 'handleImageChange',
		value: function handleImageChange(e) {
			var _this3 = this;

			e.preventDefault();

			var filesList = e.target.files;
			var _props2 = this.props,
			    onLoadStart = _props2.onLoadStart,
			    onLoadEnd = _props2.onLoadEnd,
			    url = _props2.url,
			    optimisticPreviews = _props2.optimisticPreviews,
			    multiple = _props2.multiple;


			if (onLoadStart && typeof onLoadStart === 'function') {
				onLoadStart();
			}

			this.setState({
				loadState: 'loading'
			});

			if (this.props.max && filesList.length + this.state.imagePreviewUrls.length > this.props.max) {
				var err = {
					message: 'exceeded the number'
				};
				this.setState({
					loadState: 'error',
					optimisticPreviews: []
				});
				if (onLoadEnd && typeof onLoadEnd === 'function') {
					onLoadEnd(err);
				}
				return;
			}

			for (var i = 0; i < filesList.length; i++) {
				var file = filesList[i];

				if (optimisticPreviews) {
					var reader = new FileReader();
					reader.onload = function (upload) {
						if (multiple === false) {
							_this3.setState({
								optimisticPreviews: [upload.target.result]
							});
						} else {
							var prevOptimisticPreviews = _this3.state.optimisticPreviews;
							_this3.setState({
								optimisticPreviews: prevOptimisticPreviews.concat(upload.target.result)
							});
						}
					};
					reader.readAsDataURL(file);
				}

				if (!file.type.match('image.*')) {
					var _err2 = {
						message: 'file type error',
						type: file.type,
						fileName: 'ImagesUploader'
					};
					if (onLoadEnd && typeof onLoadEnd === 'function') {
						onLoadEnd(_err2);
					}
					this.setState({
						loadState: 'error'
					});
					return;
				}
			}

			if (url) {
				this.loadImages(filesList, url, onLoadEnd);
			}
		}
	}, {
		key: 'handleFileDrop',
		value: function handleFileDrop(files) {
			if (!this.props.disabled) {
				this.handleImageChange({
					preventDefault: function preventDefault() {
						return true;
					},
					target: {
						files: files
					}
				});
			}
		}

		/* eslint-disable max-len, no-undef */

	}, {
		key: 'buildPlus',
		value: function buildPlus(disabled, color, disabledColor, plusElement) {
			return plusElement || _react2.default.createElement(
				'svg',
				{
					version: '1.1',
					xmlns: 'http://www.w3.org/2000/svg',
					style: {
						width: 35,
						fill: disabled ? disabledColor : color
					},
					xmlnsXlink: 'http://www.w3.org/1999/xlink',
					x: '0px',
					y: '0px',
					viewBox: '0 0 1000 1000',
					enableBackground: 'new 0 0 1000 1000',
					xmlSpace: 'preserve' },
				_react2.default.createElement(
					'g',
					null,
					_react2.default.createElement('path', {
						d: 'M500,10c13.5,0,25.1,4.8,34.7,14.4C544.2,33.9,549,45.5,549,59v392h392c13.5,0,25.1,4.8,34.7,14.4c9.6,9.6,14.4,21.1,14.4,34.7c0,13.5-4.8,25.1-14.4,34.6c-9.6,9.6-21.1,14.4-34.7,14.4H549v392c0,13.5-4.8,25.1-14.4,34.7c-9.6,9.6-21.1,14.4-34.7,14.4c-13.5,0-25.1-4.8-34.7-14.4c-9.6-9.6-14.4-21.1-14.4-34.7V549H59c-13.5,0-25.1-4.8-34.7-14.4C14.8,525.1,10,513.5,10,500c0-13.5,4.8-25.1,14.4-34.7C33.9,455.8,45.5,451,59,451h392V59c0-13.5,4.8-25.1,14.4-34.7C474.9,14.8,486.5,10,500,10L500,10z'
					})
				)
			);
		}
		/* eslint-enable max-len, no-undef */

	}, {
		key: 'buildButtonContent',
		value: function buildButtonContent() {
			var _props3 = this.props,
			    multiple = _props3.multiple,
			    classNamespace = _props3.classNamespace,
			    disabled = _props3.disabled,
			    classNames = _props3.classNames,
			    styles = _props3.styles,
			    color = _props3.color,
			    disabledColor = _props3.disabledColor,
			    plusElement = _props3.plusElement;


			var pseudobuttonContentStyle = (0, _extends3.default)({
				color: disabled ? disabledColor : color
			}, styles.pseudobuttonContent);

			if (multiple !== false) {
				return _react2.default.createElement(
					'span',
					{
						className: classNames.pseudobuttonContent || classNamespace + 'pseudobuttonContent',
						style: pseudobuttonContentStyle },
					this.buildPlus(disabled, color, disabledColor, plusElement)
				);
			}
			var _state = this.state,
			    imagePreviewUrls = _state.imagePreviewUrls,
			    optimisticPreviews = _state.optimisticPreviews;

			if ((!imagePreviewUrls || imagePreviewUrls.length < 1) && (!optimisticPreviews || optimisticPreviews.length < 1)) {
				return _react2.default.createElement(
					'span',
					{
						className: classNames.pseudobuttonContent || classNamespace + 'pseudobuttonContent',
						style: pseudobuttonContentStyle },
					this.buildPlus(disabled, color, disabledColor, plusElement)
				);
			}
			return this.buildPreviews(imagePreviewUrls, optimisticPreviews, true);
		}
	}, {
		key: 'buildClose',
		value: function buildClose() {
			var _this4 = this;

			var _props4 = this.props,
			    multiple = _props4.multiple,
			    classNamespace = _props4.classNamespace,
			    disabled = _props4.disabled,
			    classNames = _props4.classNames,
			    styles = _props4.styles,
			    color = _props4.color,
			    disabledColor = _props4.disabledColor,
			    borderColor = _props4.borderColor,
			    disabledBorderColor = _props4.disabledBorderColor,
			    deleteElement = _props4.deleteElement;


			if (multiple !== false) {
				return null;
			}
			var imagePreviewUrls = this.state.imagePreviewUrls;

			if (!imagePreviewUrls || imagePreviewUrls.length < 1) {
				return null;
			}

			var deletePreviewStyle = (0, _extends3.default)({
				color: disabled ? disabledColor : color,
				borderColor: disabled ? disabledBorderColor : borderColor
			}, styles.deletePreview || {});

			return _react2.default.createElement(
				'div',
				{
					className: classNames.deletePreview || classNamespace + 'deletePreview',
					style: deletePreviewStyle,
					onClick: function onClick(e) {
						e.preventDefault();
						_this4.deleteImage(0);
					} },
				deleteElement || _react2.default.createElement(
					'svg',
					{ xmlns: 'http://www.w3.org/2000/svg', width: '7.969', height: '8', viewBox: '0 0 7.969 8' },
					_react2.default.createElement('path', {
						id: 'X_Icon',
						'data-name': 'X Icon',
						style: {
							fill: disabled ? disabledColor : color,
							fillRrule: 'evenodd'
						}
						/* eslint-disable max-len */
						, d: 'M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z'
						/* eslint-enable max-len */
						, transform: 'translate(-557 -602)'
					})
				)
			);
		}
	}, {
		key: 'showNotification',
		value: function showNotification() {
			var _props5 = this.props,
			    multiple = _props5.multiple,
			    disabled = _props5.disabled;
			var imagePreviewUrls = this.state.imagePreviewUrls;

			if (!disabled && multiple === false && imagePreviewUrls && imagePreviewUrls.length > 0) {
				this.setState({
					displayNotification: true
				});
			}
		}
	}, {
		key: 'hideNotification',
		value: function hideNotification() {
			var multiple = this.props.multiple;

			if (multiple === false) {
				this.setState({
					displayNotification: false
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _classnames,
			    _this5 = this;

			var _state2 = this.state,
			    imagePreviewUrls = _state2.imagePreviewUrls,
			    loadState = _state2.loadState,
			    optimisticPreviews = _state2.optimisticPreviews;
			var _props6 = this.props,
			    inputId = _props6.inputId,
			    disabled = _props6.disabled,
			    multiple = _props6.multiple,
			    label = _props6.label,
			    size = _props6.size,
			    classNamespace = _props6.classNamespace,
			    classNames = _props6.classNames,
			    styles = _props6.styles,
			    color = _props6.color,
			    disabledColor = _props6.disabledColor,
			    borderColor = _props6.borderColor,
			    disabledBorderColor = _props6.disabledBorderColor;


			var containerClassNames = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, classNames.container || classNamespace + 'container', true), (0, _defineProperty3.default)(_classnames, 'disabled', disabled), _classnames));

			var loadContainerStyle = (0, _extends3.default)({}, size ? {
				width: size,
				height: size
			} : {}, {
				color: disabled ? disabledColor : color
			}, styles.loadContainer || {});

			var pseudobuttonStyle = (0, _extends3.default)({}, size ? {
				width: size,
				height: size
			} : {}, {
				color: disabled ? disabledColor : color
			}, styles.pseudobuttonStyle || {});

			var labelStyle = (0, _extends3.default)({
				color: disabled ? disabledColor : color
			}, styles.label || {});

			var dropzoneStyle = (0, _extends3.default)({
				borderColor: disabled ? disabledBorderColor : borderColor
			}, styles.dropzone || {});

			return _react2.default.createElement(
				'div',
				{ className: containerClassNames, style: styles.container || {} },
				_react2.default.createElement(
					'label',
					{
						className: classNames.label || classNamespace + 'label',
						style: labelStyle,
						htmlFor: inputId || 'filesInput' },
					label || null
				),
				_react2.default.createElement(
					'div',
					{
						className: classNames.filesInputContainer || classNamespace + 'filesInputContainer',
						style: styles.filesInputContainer },
					_react2.default.createElement(
						'div',
						{
							className: classNames.loadContainer || classNamespace + 'loadContainer',
							style: loadContainerStyle },
						this.buildClose(),
						_react2.default.createElement(
							_reactDropzone2.default,
							{
								onDrop: this.handleFileDrop,
								disableClick: true,
								accept: 'image/*',
								className: classNames.dropzone || classNamespace + 'dropzone',
								style: dropzoneStyle,
								multiple:
								/* eslint-disable no-unneeded-ternary */
								multiple === false ? false : true
								/* eslint-enable no-unneeded-ternary */
							},
							_react2.default.createElement(
								_reactProgressButton2.default,
								{
									state: loadState,
									type: 'button',
									classNamespace: classNamespace + 'button-',
									className: classNames.pseudobutton || classNamespace + 'pseudobutton',
									style: pseudobuttonStyle,
									onClick: function onClick(e) {
										e.preventDefault();
										if (_this5.input) {
											_this5.input.click();
										}
									},
									onMouseOver: this.showNotification,
									onMouseLeave: this.hideNotification,
									onDragOver: this.showNotification,
									onDragLeave: this.hideNotification },
								this.buildButtonContent()
							)
						)
					),
					_react2.default.createElement('input', {
						name: inputId || 'filesInput',
						id: inputId || 'filesInput',
						className: classNames.fileInput || classNamespace + 'fileInput',
						style: (0, _extends3.default)({
							display: 'none'
						}, styles.fileInput || {}),
						ref: function ref(_ref2) {
							_this5.input = _ref2;
						},
						type: 'file',
						accept: 'image/*',
						multiple: multiple === false ? false : 'multiple',
						disabled: disabled || loadState === 'loading',
						onChange: this.handleImageChange
					})
				),
				multiple !== false ? this.buildPreviews(imagePreviewUrls, this.props.optimisticPreviews && optimisticPreviews) : null
			);
		}
	}]);
	return ImagesUploader;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'deleteImage', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'deleteImage'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildPreviews', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'buildPreviews'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadImages', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'loadImages'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleImageChange', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleImageChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleFileDrop', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleFileDrop'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildButtonContent', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'buildButtonContent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildClose', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'buildClose'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showNotification', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'showNotification'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideNotification', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'hideNotification'), _class.prototype)), _class);
ImagesUploader.propTypes = {
	url: _react.PropTypes.string.isRequired,
	classNamespace: _react.PropTypes.string,
	inputId: _react.PropTypes.string,
	label: _react.PropTypes.string,
	images: _react.PropTypes.array,
	disabled: _react.PropTypes.bool,
	onLoadStart: _react.PropTypes.func,
	onLoadEnd: _react.PropTypes.func,
	deleteImage: _react.PropTypes.func,
	optimisticPreviews: _react.PropTypes.bool,
	multiple: _react.PropTypes.bool,
	image: _react.PropTypes.string,
	notification: _react.PropTypes.string,
	max: _react.PropTypes.number,
	color: _react.PropTypes.string,
	disabledColor: _react.PropTypes.string,
	borderColor: _react.PropTypes.string,
	disabledBorderColor: _react.PropTypes.string,
	notificationBgColor: _react.PropTypes.string,
	notificationColor: _react.PropTypes.string,
	deleteElement: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	plusElement: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	classNames: _react.PropTypes.shape({
		container: _react.PropTypes.string,
		label: _react.PropTypes.string,
		deletePreview: _react.PropTypes.string,
		loadContainer: _react.PropTypes.string,
		dropzone: _react.PropTypes.string,
		pseudobutton: _react.PropTypes.string,
		pseudobuttonContent: _react.PropTypes.string,
		imgPreview: _react.PropTypes.string,
		fileInput: _react.PropTypes.string,
		emptyPreview: _react.PropTypes.string,
		filesInputContainer: _react.PropTypes.string,
		notification: _react.PropTypes.string
	}),
	styles: _react.PropTypes.shape({
		container: _react.PropTypes.object,
		label: _react.PropTypes.object,
		deletePreview: _react.PropTypes.object,
		loadContainer: _react.PropTypes.object,
		dropzone: _react.PropTypes.object,
		pseudobutton: _react.PropTypes.object,
		pseudobuttonContent: _react.PropTypes.object,
		imgPreview: _react.PropTypes.object,
		fileInput: _react.PropTypes.object,
		emptyPreview: _react.PropTypes.object,
		filesInputContainer: _react.PropTypes.object,
		notification: _react.PropTypes.object
	})
};
ImagesUploader.defaultProps = {
	classNames: {},
	styles: {},
	multiple: true,
	color: '#142434',
	disabledColor: '#bec3c7',
	borderColor: '#a9bac8',
	disabledBorderColor: '#bec3c7',
	notificationBgColor: 'rgba(0, 0, 0, 0.3)',
	notificationColor: '#fafafa',
	classNamespace: 'iu-'
};
exports.default = ImagesUploader;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(ImagesUploader, 'ImagesUploader', 'src/index.jsx');
}();

;