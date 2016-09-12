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
		this.dialog.open(onOpened);
	}
	
	closeDialog(onClosed) {
		this.dialog.closed(onClosed);
	}
	
	render() {
		let title;
		
		if (this.props.title) {
			title = <DialogTitle {...this.props} />;
		}
		
		return (
			<Dialog
				ref={(dialog) => {
					this.dialog = dialog;
				}}
				{...this.props.children}
			>
				{title}
			</Dialog>
		);
	}
}

export default PopupDialog;
