import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import DialogTitle from '../src/components/DialogTitle';

it('should render DialogTitle with title bar', () => {
  const wrapper = shallow((
    <DialogTitle
      title="DialogTitle - Should has title bar"
      hasTitleBar
    />
  ));
  expect(wrapper).toMatchSnapshot();
});

it('should render DialogTitle without title bar', () => {
  const wrapper = shallow((
    <DialogTitle
      title="DialogTitle - Should has no title bar"
      hasTitleBar={false}
    />
  ));
  expect(wrapper).toMatchSnapshot();
});
