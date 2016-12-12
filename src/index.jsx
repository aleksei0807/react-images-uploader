/* @flow */
import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import Button from 'react-progress-button';
import 'babel-core/register';
import 'babel-polyfill';

class ImagesUploader extends Component {
	/* eslint-disable react/sort-comp */
	state: {
		imagePreviewUrls: Array<string>;
		loadState: string;
		optimisticPreviews: Array<string>;
		displayNotification: boolean;
	};
	input: null|HTMLInputElement;

	constructor(props: Object) {
		super(props);
		let imagePreviewUrls = [];
		if (this.props.multiple !== false) {
			imagePreviewUrls = this.props.images;
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
		const { classNamespace = 'iu-' } = this.props;

		if ((!urls || urls.length < 1) && (!optimisticUrls || optimisticUrls.length < 1)) {
			return (<div className={`${classNamespace}emptyPreview`} />);
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
					};

					if (this.props.size) {
						imgPreviewStyle = {
							...imgPreviewStyle,
							...{
								width: this.props.size,
								height: this.props.size,
							},
						};
					}

					return (
						<div
							className={`${classNamespace}imgPreview`}
							key={key}
							style={imgPreviewStyle}>
							{!inButton ? <div
								className={`${classNamespace}deletePreview`}
								onClick={(e) => {
									e.preventDefault();
									this.deleteImage(key);
								}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="7.969" height="8" viewBox="0 0 7.969 8">
									<path
										id="X_Icon"
										data-name="X Icon"
										style={{
											fill: '#142434',
											fillRule: 'evenodd',
										}}
										/* eslint-disable max-len */
										d="M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z"
										/* eslint-enable max-len */
										transform="translate(-557 -602)"
										/>
								</svg>
							</div> : <div
								className={`${classNamespace}notification`}
								style={{
									display: this.state.displayNotification ? 'block' : 'none',
								}}>
								<span>
									{this.props.notification || 'Загрузить другое изображение'}
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
					};

					if (this.props.size) {
						imgPreviewStyle = {
							...imgPreviewStyle,
							...{
								width: this.props.size,
								height: this.props.size,
							},
						};
					}

					return (
						<div
							className={`${classNamespace}imgPreview`}
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
					credentials: 'include',
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
							fileName: 'ImagesLoader',
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
						fileName: 'ImagesLoader',
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
					fileName: 'ImagesLoader',
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

	buildPlus() {
		/* eslint-disable max-len */
		return (
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					width: 35,
					fill: '#142434',
					color: '#142434',
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
		/* eslint-enable max-len */
	}

	@autobind
	buildButtonContent() {
		const { multiple, classNamespace = 'iu-' } = this.props;
		if (multiple !== false) {
			return (
				<span className={`${classNamespace}pseudobuttonContent`}>
					{this.buildPlus()}
				</span>
			);
		}
		const { imagePreviewUrls, optimisticPreviews } = this.state;
		if ((!imagePreviewUrls || imagePreviewUrls.length < 1)
		&& (!optimisticPreviews || optimisticPreviews.length < 1)) {
			return (
				<span className={`${classNamespace}pseudobuttonContent`}>
					{this.buildPlus()}
				</span>
			);
		}
		return this.buildPreviews(imagePreviewUrls, optimisticPreviews, true);
	}

	@autobind
	buildClose() {
		const { multiple, classNamespace = 'iu-' } = this.props;
		if (multiple !== false) {
			return null;
		}
		const { imagePreviewUrls } = this.state;
		if (!imagePreviewUrls || imagePreviewUrls.length < 1) {
			return null;
		}
		return (<div
			className={`${classNamespace}deletePreview`}
			onClick={(e) => {
				e.preventDefault();
				this.deleteImage(0);
			}}>
			<svg xmlns="http://www.w3.org/2000/svg" width="7.969" height="8" viewBox="0 0 7.969 8">
				<defs>
					<style>
						{`.cls-1 {
						fill: #142434;
						fill-rule: evenodd;
						}`}
					</style>
				</defs>
				<path
					id="X_Icon"
					data-name="X Icon"
					className="cls-1"
					/* eslint-disable max-len */
					d="M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z"
					/* eslint-enable max-len */
					transform="translate(-557 -602)"
					/>
			</svg>
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
		const { inputId, disabled, multiple, label, size, classNamespace = 'iu-' } = this.props;

		const containerClassNames = classnames({
			[`${classNamespace}container`]: true,
			disabled,
		});

		return (
			<div className={containerClassNames}>
				<label
					className={`${classNamespace}label`}
					htmlFor={inputId || 'filesInput'}>
					{label || null}
				</label>
				<div className={`${classNamespace}filesInputContainer`}>
					<div
						className={`${classNamespace}loadContainer`}
						style={size ? {
							width: size,
							height: size,
						} : {}}>
						{this.buildClose()}
						<Dropzone
							onDrop={this.handleFileDrop}
							disableClick
							multiple={
								/* eslint-disable no-unneeded-ternary */
								multiple === false ? false : true
								/* eslint-enable no-unneeded-ternary */
							}>
							<Button
								state={loadState}
								type="button"
								className={`${classNamespace}pseudobutton`}
								style={size ? {
									width: size,
									height: size,
									color: '#142434',
								} : {}}
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
						className={`${classNamespace}fileInput`}
						style={{
							display: 'none',
						}}
						ref={(ref) => {
							this.input = ref;
						}}
						type="file"
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

ImagesUploader.propTypes = {
	classNamespace: PropTypes.string,
	inputId: PropTypes.string,
	label: PropTypes.string,
	images: PropTypes.array,
	disabled: PropTypes.bool,
	onLoadStart: PropTypes.func,
	onLoadEnd: PropTypes.func,
	deleteImage: PropTypes.func,
	url: PropTypes.string.isRequired,
	optimisticPreviews: PropTypes.bool,
	multiple: PropTypes.bool,
	image: PropTypes.string,
	notification: PropTypes.string,
	max: PropTypes.number,
};

export default ImagesUploader;
