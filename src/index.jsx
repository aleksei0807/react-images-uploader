/* @flow */
import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import Button from 'react-progress-button';
import 'babel-core/register';
import 'babel-polyfill';

export default class ImagesUploader extends Component {
	/* eslint-disable react/sort-comp */
	state: {
		imagePreviewUrls: Array<string>;
		loadState: string;
		optimisticPreviews: Array<string>;
		displayNotification: boolean;
	};
	input: ?HTMLInputElement;

	static propTypes = {
		url: PropTypes.string.isRequired,
		classNamespace: PropTypes.string,
		inputId: PropTypes.string,
		label: PropTypes.string,
		images: PropTypes.array,
		disabled: PropTypes.bool,
		onLoadStart: PropTypes.func,
		onLoadEnd: PropTypes.func,
		deleteImage: PropTypes.func,
		optimisticPreviews: PropTypes.bool,
		multiple: PropTypes.bool,
		image: PropTypes.string,
		notification: PropTypes.string,
		max: PropTypes.number,
		color: PropTypes.string,
		disabledColor: PropTypes.string,
		borderColor: PropTypes.string,
		disabledBorderColor: PropTypes.string,
		notificationBgColor: PropTypes.string,
		notificationColor: PropTypes.string,
		deleteElement: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		plusElement: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		classNames: PropTypes.shape({
			container: PropTypes.string,
			label: PropTypes.string,
			deletePreview: PropTypes.string,
			loadContainer: PropTypes.string,
			dropzone: PropTypes.string,
			pseudobutton: PropTypes.string,
			pseudobuttonContent: PropTypes.string,
			imgPreview: PropTypes.string,
			fileInput: PropTypes.string,
			emptyPreview: PropTypes.string,
			filesInputContainer: PropTypes.string,
			notification: PropTypes.string,
		}),
		styles: PropTypes.shape({
			container: PropTypes.object,
			label: PropTypes.object,
			deletePreview: PropTypes.object,
			loadContainer: PropTypes.object,
			dropzone: PropTypes.object,
			pseudobutton: PropTypes.object,
			pseudobuttonContent: PropTypes.object,
			imgPreview: PropTypes.object,
			fileInput: PropTypes.object,
			emptyPreview: PropTypes.object,
			filesInputContainer: PropTypes.object,
			notification: PropTypes.object,
		}),
	}

	static defaultProps = {
		classNames: {},
		styles: {},
		multiple: true,
		color: '#142434',
		disabledColor: '#bec3c7',
		borderColor: '#a9bac8',
		disabledBorderColor: '#bec3c7',
		notificationBgColor: 'rgba(0, 0, 0, 0.3)',
		notificationColor: '#fafafa',
		classNamespace: 'iu-',
	};

	constructor(props: Object) {
		super(props);
		let imagePreviewUrls = [];
		if (this.props.images && this.props.multiple !== false) {
			imagePreviewUrls = this.props.images || [];
		}
		if (this.props.image && this.props.multiple === false) {
			imagePreviewUrls = [this.props.image];
		}
		this.state = {
			imagePreviewUrls,
			loadState: '',
			optimisticPreviews: [],
			displayNotification: false,
		};
		this.input = null;
	}
	/* eslint-enable react/sort-comp */

	componentWillMount() {
		document.addEventListener('dragover', (event) => {
			// prevent default to allow drop
			event.preventDefault();
		}, false);
		document.addEventListener('drop', (event) => {
			// prevent default to allow drop
			event.preventDefault();
		}, false);
	}

	componentWillReceiveProps(nextProps: Object) {
		if (!this.props.images && nextProps.images && nextProps.multiple !== false) {
			this.setState({
				imagePreviewUrls: nextProps.images,
			});
		}
		if (!this.props.image && nextProps.image && nextProps.multiple === false) {
			this.setState({
				imagePreviewUrls: [nextProps.image],
			});
		}
	}

	@autobind
	deleteImage(key: number) {
		if (!this.props.disabled) {
			const imagePreviewUrls = this.state.imagePreviewUrls;
			imagePreviewUrls.splice(key, 1);
			this.setState({
				imagePreviewUrls,
			});
			if (this.props.deleteImage && typeof this.props.deleteImage === 'function') {
				this.props.deleteImage(key);
			}
		}
	}

	@autobind
	buildPreviews(urls: Array<string>, optimisticUrls?: Array<string>, inButton?: boolean) {
		const {
			classNamespace,
			disabled,
			classNames,
			styles,
			color,
			disabledColor,
			borderColor,
			disabledBorderColor,
			notificationBgColor,
			notificationColor,
			deleteElement,
			plusElement,
		} = this.props;

		if ((!urls || urls.length < 1) && (!optimisticUrls || optimisticUrls.length < 1)) {
			return (
				<div
					className={classNames.emptyPreview || `${classNamespace}emptyPreview`}
					style={styles.emptyPreview}
					/>
			);
		}
		let previews = [];
		const multiple = this.props.multiple;
		if (urls
			&& urls.length > 0
			&& (!(multiple === false && optimisticUrls && optimisticUrls.length > 0))) {
			previews = urls.map((url, key) => {
				if (url) {
					let imgPreviewStyle = {
						backgroundImage: `url(${url})`,
						borderColor: disabled ? disabledBorderColor : borderColor,
					};

					if (this.props.size) {
						imgPreviewStyle = {
							...imgPreviewStyle,
							...{
								width: this.props.size,
								height: this.props.size,
							},
							...(styles.imagePreview || {}),
						};
					}

					const deletePreviewStyle = {
						...{
							color: disabled ? disabledColor : color,
							borderColor: disabled ? disabledBorderColor : borderColor,
						},
						...(styles.deletePreview || {}),
					};

					return (
						<div
							className={classNames.imgPreview || `${classNamespace}imgPreview`}
							key={key}
							style={imgPreviewStyle}>
							{!inButton ? <div
								className={classNames.deletePreview || `${classNamespace}deletePreview`}
								style={deletePreviewStyle}
								onClick={(e) => {
									e.preventDefault();
									this.deleteImage(key);
								}}>
								{deleteElement
								|| (<svg xmlns="http://www.w3.org/2000/svg" width="7.969" height="8" viewBox="0 0 7.969 8">
									<path
										id="X_Icon"
										data-name="X Icon"
										style={{
											fill: disabled ? disabledColor : color,
											fillRule: 'evenodd',
										}}
										/* eslint-disable max-len */
										d="M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z"
										/* eslint-enable max-len */
										transform="translate(-557 -602)"
										/>
								</svg>)}
							</div> : <div
								className={classNames.notification || `${classNamespace}notification`}
								style={styles.notification ? {
									...styles.notification,
									...{
										display: this.state.displayNotification ? 'block' : 'none',
										backgroundColor: notificationBgColor,
										color: notificationColor,
									},
								} : {
									display: this.state.displayNotification ? 'block' : 'none',
									backgroundColor: notificationBgColor,
									color: notificationColor,
								}}>
								<span>
									{this.props.notification
										|| this.buildPlus(disabled, notificationColor, disabledColor, plusElement)}
								</span>
							</div>}
						</div>
					);
				}
				return null;
			});
		}
		if (optimisticUrls && optimisticUrls.length > 0) {
			const length = previews.length;
			previews = previews.concat(optimisticUrls.map((url, key) => {
				if (url) {
					let imgPreviewStyle = {
						backgroundImage: `url(${url})`,
						borderColor: disabled ? disabledBorderColor : borderColor,
					};

					if (this.props.size) {
						imgPreviewStyle = {
							...imgPreviewStyle,
							...{
								width: this.props.size,
								height: this.props.size,
							},
							...(styles.imgPreview || {}),
						};
					}

					return (
						<div
							className={classNames.imgPreview || `${classNamespace}imgPreview`}
							key={length + key}
							style={imgPreviewStyle}
							/>
					);
				}
				return null;
			}));
		}
		return previews;
	}

	@autobind
	async loadImages(files: FileList, url: string, onLoadEnd?: Function): any {
		if (url) {
			try {
				const imageFormData = new FormData();

				for (let i = 0; i < files.length; i++) {
					imageFormData.append('imageFiles', files[i], files[i].name);
				}

				let response = await fetch(url, {
					method: 'POST',
					body: imageFormData,
				});

				if (response && response.status && response.status === 200) {
					response = await response.json();
					const multiple = this.props.multiple;
					if (response instanceof Array || typeof response === 'string') {
						let imagePreviewUrls = [];
						if (multiple === false) {
							imagePreviewUrls = response instanceof Array ? response : [response];
						} else {
							imagePreviewUrls = this.state.imagePreviewUrls.concat(response);
						}
						this.setState({
							imagePreviewUrls,
							optimisticPreviews: [],
							loadState: 'success',
						});
						if (onLoadEnd && typeof onLoadEnd === 'function') {
							onLoadEnd(false, response);
						}
					} else {
						const err = {
							message: 'invalid response type',
							response,
							fileName: 'ImagesUploader',
						};
						this.setState({
							loadState: 'error',
							optimisticPreviews: [],
						});
						if (onLoadEnd && typeof onLoadEnd === 'function') {
							onLoadEnd(err);
						}
					}
				} else {
					const err = {
						message: 'server error',
						status: response ? response.status : false,
						fileName: 'ImagesUploader',
					};
					this.setState({
						loadState: 'error',
						optimisticPreviews: [],
					});
					if (onLoadEnd && typeof onLoadEnd === 'function') {
						onLoadEnd(err);
					}
				}
			} catch (err) {
				if (onLoadEnd && typeof onLoadEnd === 'function') {
					onLoadEnd(err);
				}
				this.setState({
					loadState: 'error',
					optimisticPreviews: [],
				});
			}
		}
	}

	@autobind
	handleImageChange(e: Object) {
		e.preventDefault();

		const filesList = e.target.files;
		const { onLoadStart, onLoadEnd, url, optimisticPreviews, multiple } = this.props;

		if (onLoadStart && typeof onLoadStart === 'function') {
			onLoadStart();
		}

		this.setState({
			loadState: 'loading',
		});

		if (this.props.max
			&& (filesList.length + this.state.imagePreviewUrls.length) > this.props.max
		) {
			const err = {
				message: 'exceeded the number',
			};
			this.setState({
				loadState: 'error',
				optimisticPreviews: [],
			});
			if (onLoadEnd && typeof onLoadEnd === 'function') {
				onLoadEnd(err);
			}
			return;
		}

		for (let i = 0; i < filesList.length; i++) {
			const file = filesList[i];

			if (optimisticPreviews) {
				const reader = new FileReader();
				reader.onload = (upload) => {
					if (multiple === false) {
						this.setState({
							optimisticPreviews: [upload.target.result],
						});
					} else {
						const prevOptimisticPreviews = this.state.optimisticPreviews;
						this.setState({
							optimisticPreviews: prevOptimisticPreviews.concat(upload.target.result),
						});
					}
				};
				reader.readAsDataURL(file);
			}

			if (!file.type.match('image.*')) {
				const err = {
					message: 'file type error',
					type: file.type,
					fileName: 'ImagesUploader',
				};
				if (onLoadEnd && typeof onLoadEnd === 'function') {
					onLoadEnd(err);
				}
				this.setState({
					loadState: 'error',
				});
				return;
			}
		}

		if (url) {
			this.loadImages(filesList, url, onLoadEnd);
		}
	}

	@autobind
	handleFileDrop(files: FileList) {
		if (!this.props.disabled) {
			this.handleImageChange({
				preventDefault: () => true,
				target: {
					files,
				},
			});
		}
	}

	/* eslint-disable max-len, no-undef */
	buildPlus(
		disabled: boolean,
		color: string,
		disabledColor: string,
		plusElement?: string|React$Element<*>
	) {
		return plusElement || (
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					width: 35,
					fill: disabled ? disabledColor : color,
				}}
				xmlnsXlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 1000 1000"
				enableBackground="new 0 0 1000 1000"
				xmlSpace="preserve">
				<g>
					<path
						d="M500,10c13.5,0,25.1,4.8,34.7,14.4C544.2,33.9,549,45.5,549,59v392h392c13.5,0,25.1,4.8,34.7,14.4c9.6,9.6,14.4,21.1,14.4,34.7c0,13.5-4.8,25.1-14.4,34.6c-9.6,9.6-21.1,14.4-34.7,14.4H549v392c0,13.5-4.8,25.1-14.4,34.7c-9.6,9.6-21.1,14.4-34.7,14.4c-13.5,0-25.1-4.8-34.7-14.4c-9.6-9.6-14.4-21.1-14.4-34.7V549H59c-13.5,0-25.1-4.8-34.7-14.4C14.8,525.1,10,513.5,10,500c0-13.5,4.8-25.1,14.4-34.7C33.9,455.8,45.5,451,59,451h392V59c0-13.5,4.8-25.1,14.4-34.7C474.9,14.8,486.5,10,500,10L500,10z"
						/>
				</g>
			</svg>
		);
	}
	/* eslint-enable max-len, no-undef */

	@autobind
	buildButtonContent() {
		const {
			multiple,
			classNamespace,
			disabled,
			classNames,
			styles,
			color,
			disabledColor,
			plusElement,
		} = this.props;

		const pseudobuttonContentStyle = {
			...{
				color: disabled ? disabledColor : color,
			},
			...(styles.pseudobuttonContent),
		};

		if (multiple !== false) {
			return (
				<span
					className={classNames.pseudobuttonContent || `${classNamespace}pseudobuttonContent`}
					style={pseudobuttonContentStyle}>
					{this.buildPlus(disabled, color, disabledColor, plusElement)}
				</span>
			);
		}
		const { imagePreviewUrls, optimisticPreviews } = this.state;
		if ((!imagePreviewUrls || imagePreviewUrls.length < 1)
		&& (!optimisticPreviews || optimisticPreviews.length < 1)) {
			return (
				<span
					className={classNames.pseudobuttonContent || `${classNamespace}pseudobuttonContent`}
					style={pseudobuttonContentStyle}>
					{this.buildPlus(disabled, color, disabledColor, plusElement)}
				</span>
			);
		}
		return this.buildPreviews(imagePreviewUrls, optimisticPreviews, true);
	}

	@autobind
	buildClose() {
		const {
			multiple,
			classNamespace,
			disabled,
			classNames,
			styles,
			color,
			disabledColor,
			borderColor,
			disabledBorderColor,
			deleteElement,
		} = this.props;

		if (multiple !== false) {
			return null;
		}
		const { imagePreviewUrls } = this.state;
		if (!imagePreviewUrls || imagePreviewUrls.length < 1) {
			return null;
		}

		const deletePreviewStyle = {
			...{
				color: disabled ? disabledColor : color,
				borderColor: disabled ? disabledBorderColor : borderColor,
			},
			...(styles.deletePreview || {}),
		};

		return (<div
			className={classNames.deletePreview || `${classNamespace}deletePreview`}
			style={deletePreviewStyle}
			onClick={(e) => {
				e.preventDefault();
				this.deleteImage(0);
			}}>
			{deleteElement || (<svg xmlns="http://www.w3.org/2000/svg" width="7.969" height="8" viewBox="0 0 7.969 8">
				<path
					id="X_Icon"
					data-name="X Icon"
					style={{
						fill: disabled ? disabledColor : color,
						fillRrule: 'evenodd',
					}}
					/* eslint-disable max-len */
					d="M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z"
					/* eslint-enable max-len */
					transform="translate(-557 -602)"
					/>
			</svg>)}
		</div>);
	}

	@autobind
	showNotification() {
		const { multiple, disabled } = this.props;
		const { imagePreviewUrls } = this.state;
		if (!disabled && multiple === false && imagePreviewUrls && imagePreviewUrls.length > 0) {
			this.setState({
				displayNotification: true,
			});
		}
	}

	@autobind
	hideNotification() {
		const { multiple } = this.props;
		if (multiple === false) {
			this.setState({
				displayNotification: false,
			});
		}
	}

	render() {
		const { imagePreviewUrls, loadState, optimisticPreviews } = this.state;
		const {
			inputId,
			disabled,
			multiple,
			label,
			size,
			classNamespace,
			classNames,
			styles,
			color,
			disabledColor,
			borderColor,
			disabledBorderColor,
		} = this.props;

		const containerClassNames = classnames({
			[classNames.container || `${classNamespace}container`]: true,
			disabled,
		});

		const loadContainerStyle = {
			...(size ? {
				width: size,
				height: size,
			} : {}),
			...{
				color: disabled ? disabledColor : color,
			},
			...(styles.loadContainer || {}),
		};

		const pseudobuttonStyle = {
			...(size ? {
				width: size,
				height: size,
			} : {}),
			...{
				color: disabled ? disabledColor : color,
			},
			...(styles.pseudobuttonStyle || {}),
		};

		const labelStyle = {
			...{
				color: disabled ? disabledColor : color,
			},
			...(styles.label || {}),
		};

		const dropzoneStyle = {
			...{
				borderColor: disabled ? disabledBorderColor : borderColor,
			},
			...(styles.dropzone || {}),
		};

		return (
			<div className={containerClassNames} style={styles.container || {}}>
				<label
					className={classNames.label || `${classNamespace}label`}
					style={labelStyle}
					htmlFor={inputId || 'filesInput'}>
					{label || null}
				</label>
				<div
					className={classNames.filesInputContainer || `${classNamespace}filesInputContainer`}
					style={styles.filesInputContainer}>
					<div
						className={classNames.loadContainer || `${classNamespace}loadContainer`}
						style={loadContainerStyle}>
						{this.buildClose()}
						<Dropzone
							onDrop={this.handleFileDrop}
							disableClick
							accept="image/*"
							className={classNames.dropzone || `${classNamespace}dropzone`}
							style={dropzoneStyle}
							multiple={
								/* eslint-disable no-unneeded-ternary */
								multiple === false ? false : true
								/* eslint-enable no-unneeded-ternary */
							}>
							<Button
								state={loadState}
								type="button"
								classNamespace={`${classNamespace}button-`}
								className={classNames.pseudobutton || `${classNamespace}pseudobutton`}
								style={pseudobuttonStyle}
								onClick={(e) => {
									e.preventDefault();
									if (this.input) {
										this.input.click();
									}
								}}
								onMouseOver={this.showNotification}
								onMouseLeave={this.hideNotification}
								onDragOver={this.showNotification}
								onDragLeave={this.hideNotification}>
								{this.buildButtonContent()}
							</Button>
						</Dropzone>
					</div>
					<input
						name={inputId || 'filesInput'}
						id={inputId || 'filesInput'}
						className={classNames.fileInput || `${classNamespace}fileInput`}
						style={{
							...{
								display: 'none',
							},
							...(styles.fileInput || {}),
						}}
						ref={(ref) => {
							this.input = ref;
						}}
						type="file"
						accept="image/*"
						multiple={multiple === false ? false : 'multiple'}
						disabled={disabled || loadState === 'loading'}
						onChange={this.handleImageChange}
						/>
				</div>
				{multiple !== false
					? this.buildPreviews(
						imagePreviewUrls,
						this.props.optimisticPreviews && optimisticPreviews)
					: null}
			</div>
		);
	}
}
