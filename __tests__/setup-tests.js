const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// Jest doesn't support require.cache, so the correct way to do the mocking is using
// eslint-disable-next-line
jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true });
