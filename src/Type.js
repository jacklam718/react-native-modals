// @flow

export type DialogType = {
  width: number;
  height: number;
  haveOverlay: bool;
  overlayPointerEvents: string;
  overlayBackgroundColor: string;
  overlayOpacity: number;
  dialogAnimation: Object;
  dialogStyle: Object | number;
  animationDuration: number;
  closeOnTouchOutside: bool;
  open: bool;
  onOpened: Function;
  onClosed: Function;
  actions: Array;
  children: any;
}

export type DialogButtonType = {
  text: string;
  align: string;
  onPress: Function;
  buttonStyle: Object | number;
  textStyle: Object | number;
  textContainerStyle: Object | number;
  disabled: Boolean;
  activeOpacity: number;
}

export type DialogTitleType = {
  title: string | number;
  titleStyle: Object | number;
  titleTextStyle: Object | number;
  titleAlign: string;
  haveTitleBar: Boolean;
}

export type OverlayType = {
  onPress: Function;
  backgroundColor: string;
  opacity: number;
  animationDuration: number;
  showOverlay: bool;
  pointerEvents: string;
}
