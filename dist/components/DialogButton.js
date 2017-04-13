Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');

var _Constants=require('../constants/Constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var babelPluginFlowReactPropTypes_proptype_DialogButtonType=require('../Type').babelPluginFlowReactPropTypes_proptype_DialogButtonType||require('react').PropTypes.any;



var isAndroid=_reactNative.Platform.OS==='android';

var DISABLED=false;
var ALIGN='center';

var styles=_reactNative.StyleSheet.create({
button:{},

text:{
fontWeight:isAndroid?'400':'500',
fontFamily:isAndroid?'sans-serif-medium':'System',
fontSize:isAndroid?19:18},

disabledText:{
color:'#C5C6C5'},

textContainer:{
minWidth:48,
paddingHorizontal:24,
paddingVertical:24,
borderRadius:8,
justifyContent:'center',
alignItems:'center'}});




function DialogButton(_ref){var text=_ref.text,activeOpacity=_ref.activeOpacity,disabled=_ref.disabled,align=_ref.align,onPress=_ref.onPress,buttonStyle=_ref.buttonStyle,textStyle=_ref.textStyle,textContainerStyle=_ref.textContainerStyle;
var buttonAlign={alignSelf:_Constants.Positions[align]};
var disabledText=disabled?styles.disabledText:null;

return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
onPress:onPress,
disabled:disabled,
activeOpacity:activeOpacity,
style:[styles.button,buttonAlign,buttonStyle]},

_react2.default.createElement(_reactNative.View,{style:[styles.textContainer,textContainerStyle]},
_react2.default.createElement(_reactNative.Text,{style:[styles.text,disabledText,textStyle]},
text))));




}

DialogButton.defaultProps={
disabled:DISABLED,
align:ALIGN};exports.default=


DialogButton;