import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import ModalTitle from '../src/components/ModalTitle';

it('should render DialogTitle with title bar', () => {
  const wrapper = shallow((
    <ModalTitle
      title="DialogTitle - Should has title bar"
      hasTitleBar
    />
  ));
  expect(wrapper).toMatchSnapshot();
});

it('should render DialogTitle without title bar', () => {
  const wrapper = shallow((
    <ModalTitle
      title="DialogTitle - Should has no title bar"
      hasTitleBar={false}
    />
  ));
  expect(wrapper).toMatchSnapshot();
});
