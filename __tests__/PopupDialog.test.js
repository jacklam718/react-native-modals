import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import PopupDialog, {
  DialogTitle,
  FadeAnimation,
  ScaleAnimation,
  SlideAnimation,
} from '../src';

it('should render with Default Animation correctly', () => {
  const wrapper = shallow((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
    />
  ));

  expect(wrapper.instance()).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ show: true });
  expect(wrapper.instance()).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ show: false });
  expect(wrapper.instance()).toMatchSnapshot();
});

it('should render with FadeAnimation correctly', () => {
  const fadeAnimation = new FadeAnimation({
    toValue: 0,
    animationDuration: 200,
    useNativeDriver: true,
  });
  const wrapper = shallow((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - FadeAnimation Animation" />}
      dialogAnimation={fadeAnimation}
    />
  ));

  expect(wrapper.instance()).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ show: true });
  expect(wrapper.instance()).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ show: false });
  expect(wrapper.instance()).toMatchSnapshot();
});

it('should render with ScaleAnimation correctly', () => {
  const scaleAnimation = new ScaleAnimation({
    toValue: 0,
    useNativeDriver: true,
  });
  const wrapper = shallow((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - ScaleAnimation Animation" />}
      dialogAnimation={scaleAnimation}
    />
  ));

  expect(wrapper.instance()).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ show: true });
  expect(wrapper.instance()).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ show: false });
  expect(wrapper.instance()).toMatchSnapshot();
});

it('should render with SlideAnimation correctly', () => {
  const slideAnimation = new SlideAnimation({
    toValue: 0,
    slideFrom: 'bottom',
    useNativeDriver: true,
  });
  const wrapper = shallow((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - SlideAnimation Animation" />}
      dialogAnimation={slideAnimation}
    />
  ));

  expect(wrapper.instance()).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ show: true });
  expect(wrapper.instance()).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ show: false });
  expect(wrapper.instance()).toMatchSnapshot();
});
