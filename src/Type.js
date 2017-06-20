// @flow

export type PopupDialogType = {
  dialogTitle: any;
  children: any;
}

export type DialogType = {
  width?: number;
  height?: number;
  haveOverlay: boolean;
  overlayPointerEvents?: string;
  overlayBackgroundColor?: string;
  overlayOpacity?: number;
  dialogAnimation?: Object;
  dialogStyle?: Object | number;
  animationDuration?: number;
  dismissOnTouchOutside?: boolean;
  dismissOnHardwareBackPress?: boolean;
  show?: boolean;
  onShown?: Function;
  onDismissed?: Function;
  actions?: Array<any>;
  children: any;
}

export type DialogButtonType = {
  text: string;
  onPress: Function;
  align?: string;
  buttonStyle?: Object | number;
  textStyle?: Object | number;
  textContainerStyle?: Object | number;
  disabled?: boolean;
  activeOpacity?: number;
}

export type DialogTitleType = {
  title: string | number;
  titleStyle?: Object | number;
  titleTextStyle?: Object | number;
  titleAlign?: string;
  haveTitleBar?: boolean;
}

export type OverlayType = {
  onPress: Function;
  backgroundColor?: string;
  opacity?: number;
  animationDuration?: number;
  showOverlay?: boolean;
  pointerEvents?: string;
}
