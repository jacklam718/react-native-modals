// flow

import React, {PropTypes, Component} from 'react';
import Dialog from './components/Dialog';
import DialogTitle from './components/DialogTitle';
import ScaleAnimation from './animations/ScaleAnimation';

const propTypes = {
	...Dialog.propTypes,
	...DialogTitle.propTypes,
};

const defaultProps = {
	animation: 'scale',
	animationDuration: 200,
	closeOnTouchOutside: true,
	dialogAnimation: new ScaleAnimation(),
};

class PopupDialog extends Component {
	static propTypes = propTypes;
	static defaultProps = defaultProps;
	
	openDialog(onOpened) {
		if (onOpened && typeof onOpened == 'function') {
			this.dialog.open(onOpened);
		}
	}
	
	closeDialog(onClosed) {
		if (onClosed && typeof onClosed == 'function') {
			this.dialog.closed(onClosed);
		}
	}
	
	render() {
		const title = this.props.title ? <DialogTitle {...this.props} /> : null;
		
		return (
			<Dialog
				ref={dialog => this.dialog = dialog}
				{...this.props}
			>
				{title}
			</Dialog>
		);
	}
}

export default PopupDialog;
