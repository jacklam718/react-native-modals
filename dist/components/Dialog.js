Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');










var _Overlay=require('./Overlay');var _Overlay2=_interopRequireDefault(_Overlay);

var _FadeInAnimation=require('../animations/FadeInAnimation');var _FadeInAnimation2=_interopRequireDefault(_FadeInAnimation);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var BackHandler=_reactNative.BackHandler||_reactNative.BackAndroid;var babelPluginFlowReactPropTypes_proptype_DialogType=require('../Type').babelPluginFlowReactPropTypes_proptype_DialogType||require('react').PropTypes.any;var _Dimensions$get=


_reactNative.Dimensions.get('window'),screenWidth=_Dimensions$get.width,screenHeight=_Dimensions$get.height;


var DIALOG_OPENING='opening';
var DIALOG_OPENED='opened';
var DIALOG_CLOSING='closing';
var DIALOG_CLOSED='closed';


var DEFAULT_ANIMATION_DURATION=150;
var DEFAULT_WIDTH=screenWidth;
var DEFAULT_HEIGHT=300;
var DISMISS_ON_TOUCH_OUTSIDE=true;
var DISMISS_ON_HARDWARE_BACK_PRESS=true;
var HAVE_OVERLAY=true;



var HARDWARE_BACK_PRESS_EVENT='hardwareBackPress';

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
position:'absolute',
top:0,
left:0,
justifyContent:'center',
alignItems:'center'},

dialog:{
borderRadius:8,
backgroundColor:'#ffffff'},

hidden:{
top:-10000,
left:0,
height:0,
width:0}});var



Dialog=function(_Component){_inherits(Dialog,_Component);



















function Dialog(props){_classCallCheck(this,Dialog);var _this=_possibleConstructorReturn(this,(Dialog.__proto__||Object.getPrototypeOf(Dialog)).call(this,
props));

_this.state={
dialogState:DIALOG_CLOSED};


_this.onOverlayPress=_this.onOverlayPress.bind(_this);
_this.hardwareBackEventHandler=_this.hardwareBackEventHandler.bind(_this);return _this;
}_createClass(Dialog,[{key:'componentDidMount',value:function componentDidMount()

{var
show=this.props.show;

if(show){
this.show();
}

BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT,this.hardwareBackEventHandler);
}},{key:'hardwareBackEventHandler',value:function hardwareBackEventHandler()

{var
dismissOnHardwareBackPress=this.props.dismissOnHardwareBackPress;var
dialogState=this.state.dialogState;

if(dismissOnHardwareBackPress&&dialogState===DIALOG_OPENED){
this.dismiss();
return true;
}
return false;
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
if(this.props.show!==nextProps.show){
if(nextProps.show){
this.show();
}else{
this.dismiss();
}
}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
}},{key:'onOverlayPress',value:function onOverlayPress()

{var
dismissOnTouchOutside=this.props.dismissOnTouchOutside;

if(dismissOnTouchOutside){
this.dismiss();
}
}},{key:'setDialogState',value:function setDialogState(

toValue){var _this2=this;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};
var dialogState=toValue?DIALOG_OPENING:DIALOG_CLOSING;


if(this.props.dialogAnimation&&this.props.dialogAnimation.toValue){
this.props.dialogAnimation.toValue(toValue);
}

this.setState({dialogState:dialogState});

setTimeout(function(){
dialogState=dialogState===DIALOG_CLOSING?DIALOG_CLOSED:DIALOG_OPENED;
_this2.setState({dialogState:dialogState});
callback();
},this.props.animationDuration);
}},{key:'show',value:function show()

{var
onShown=this.props.onShown;
this.setDialogState(1,onShown);
}},{key:'dismiss',value:function dismiss()

{var
onDismissed=this.props.onDismissed;
this.setDialogState(0,onDismissed);
}},{key:'render',value:function render()





















{
var dialogState=this.state.dialogState;
var overlayPointerEvents=this.pointerEvents;
var dialogSize=this.dialogSize;
var hidden=dialogState===DIALOG_CLOSED&&styles.hidden;
var isShowOverlay=
[DIALOG_OPENING,DIALOG_OPENED].includes(dialogState)&&this.props.haveOverlay;

var dimensions={
width:_reactNative.Dimensions.get('window').width,
height:_reactNative.Dimensions.get('window').height};


return(
_react2.default.createElement(_reactNative.View,{style:[styles.container,hidden,dimensions]},
_react2.default.createElement(_Overlay2.default,{
pointerEvents:overlayPointerEvents,
showOverlay:isShowOverlay,
onPress:this.onOverlayPress,
backgroundColor:this.props.overlayBackgroundColor,
opacity:this.props.overlayOpacity,
animationDuration:this.props.animationDuration}),

_react2.default.createElement(_reactNative.Animated.View,{
style:[
styles.dialog,
dialogSize,
this.props.dialogStyle,
this.props.dialogAnimation.animations]},


this.props.children,
this.props.actions)));



}},{key:'pointerEvents',get:function get(){if(this.props.overlayPointerEvents){return this.props.overlayPointerEvents;}return this.state.dialogState===DIALOG_OPENED?'auto':'none';}},{key:'dialogSize',get:function get(){var _props=this.props,width=_props.width,height=_props.height;if(width&&width>0.0&&width<=1.0){width*=screenWidth;}if(height&&height>0.0&&height<=1.0){height*=screenHeight;}return{width:width,height:height};}}]);return Dialog;}(_react.Component);Dialog.defaultProps={animationDuration:DEFAULT_ANIMATION_DURATION,dialogAnimation:new _FadeInAnimation2.default({animationDuration:DEFAULT_ANIMATION_DURATION}),width:DEFAULT_WIDTH,height:DEFAULT_HEIGHT,dismissOnTouchOutside:DISMISS_ON_TOUCH_OUTSIDE,dismissOnHardwareBackPress:DISMISS_ON_HARDWARE_BACK_PRESS,haveOverlay:HAVE_OVERLAY,onShown:function onShown(){},onDismissed:function onDismissed(){},show:false};exports.default=


Dialog;