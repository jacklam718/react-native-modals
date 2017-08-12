import 'react-native';
import React from 'react';
import PopupDialog, { DialogTitle } from '../src';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PopupDialog
      show
      dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
