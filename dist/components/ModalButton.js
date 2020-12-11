Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/ModalButton.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _Constants=require('../constants/Constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var babelPluginFlowReactPropTypes_proptype_ModalButtonProps=require('../type').babelPluginFlowReactPropTypes_proptype_ModalButtonProps||require('prop-types').any;var isAndroid=_reactNative.Platform.OS==='android';var styles=_reactNative.StyleSheet.create({button:{flex:1,width:'100%',justifyContent:'center',alignItems:'center',paddingTop:16,paddingBottom:16},border:{borderLeftColor:'#CCD0D5',borderLeftWidth:1/_reactNative.PixelRatio.get()},text:{fontWeight:isAndroid?'400':'500',fontFamily:isAndroid?'sans-serif-medium':'System',fontSize:isAndroid?19:16,color:'#044DE0'},disable:{color:'#C5C6C5'}});var ModalButton=function ModalButton(_ref){var text=_ref.text,onPress=_ref.onPress,style=_ref.style,textStyle=_ref.textStyle,_ref$activeOpacity=_ref.activeOpacity,activeOpacity=_ref$activeOpacity===undefined?0.6:_ref$activeOpacity,_ref$align=_ref.align,align=_ref$align===undefined?'center':_ref$align,_ref$disabled=_ref.disabled,disabled=_ref$disabled===undefined?false:_ref$disabled,_ref$bordered=_ref.bordered,bordered=_ref$bordered===undefined?false:_ref$bordered;var buttonAlign={alignSelf:_Constants.Positions[align]};var disable=disabled?styles.disable:null;var border=bordered?styles.border:null;return _react2.default.createElement(_reactNative.TouchableHighlight,{underlayColor:'#F1F2F2',onPress:onPress,disabled:disabled,activeOpacity:activeOpacity,style:[styles.button,buttonAlign,border,style],__source:{fileName:_jsxFileName,lineNumber:49}},_react2.default.isValidElement(text)?text:_react2.default.createElement(_reactNative.Text,{style:[styles.text,disable,textStyle],__source:{fileName:_jsxFileName,lineNumber:57}},text));};ModalButton.propTypes=babelPluginFlowReactPropTypes_proptype_ModalButtonProps===require('prop-types').any?{}:babelPluginFlowReactPropTypes_proptype_ModalButtonProps;exports.default=ModalButton;