import * as React from 'react';

declare module 'react-native-popup-dialog' {
    
    export type AlignTypes = 'left' | 'right' | 'center';
    export type OverlayPointerEventTypes = 'auto' | 'none';
    export type SlideFromTypes = 'top' | 'bottom' | 'left' | 'right';

    export interface DialogButtonProperties {
        text: string;
        align?: AlignTypes;
        onPress?: Function;		
        buttonStyle?: any;
        textStyle?: any;
        textContainerStyle?: any;
        disabled?: boolean;
        activeOpacity?: number;
    }

    export interface DialogTitleProperties {
        title: string;	
        titleStyle?: any;	
        titleTextStyle?: any;
        titleAlign?: AlignTypes;
        haveTitleBar?: boolean;
    }

    export interface OverlayProperties {
        onPress: Function;
        backgroundColor?: string;
        opacity?: number;
        animationDuration?: number;
        showOverlay?: boolean;
        pointerEvents?: string;
    }

    export interface PopupDialogProperties {
        dialogTitle?: any;
        width?: number;
        height?: number;
        dialogAnimation?: any;
        dialogStyle?: any;
        animationDuration?: number;
        overlayPointerEvents?: OverlayPointerEventTypes;
        overlayBackgroundColor?: string;
        overlayOpacity?: number;
        dismissOnTouchOutside?: boolean;
        dismissOnHardwareBackPress?: boolean;
        haveOverlay?: boolean;
        show?: boolean;
        onShown?: Function;
        onDismissed?: Function;
        actions?: any[];
    }

    abstract class Animation {
        constructor(toValue?: number);
        toValue(toValue: number): void;
        createAnimations(): object;
    }

    export class FadeAnimation extends Animation {
        constructor(params: { toValue?: number, animationDuration?: number })
    }
    export class ScaleAnimation extends Animation { }
    export class SlideAnimation extends Animation {
        constructor(params: { toValue?: number, slideFrom?: SlideFromTypes })
    }
    export class DialogButton extends React.Component<DialogButtonProperties, any> { }
    export class DialogTitle extends React.Component<DialogTitleProperties, any> { }
    export class Overlay extends React.Component<Overlay, any> { }
    export default class PopupDialog extends React.Component<PopupDialogProperties, any> { }
}