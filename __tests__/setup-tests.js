const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
// require('react-native-mock-render/mock');

Enzyme.configure({ adapter: new Adapter() });

// Ignore React Web errors when using React Native
console.error = message => message;

// Jest doesn't support require.cache, so the correct way to do the mocking is using
jest.mock('react-native', () => require('react-native-mock-render'), {virtual: true})
