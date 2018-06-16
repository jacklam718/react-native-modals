import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PopupDialog, {
  DialogTitle,
  FadeAnimation,
  ScaleAnimation,
  SlideAnimation,
} from '../src';

const DELAY_MS = 1000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

it('should render with Default & show/hide Animation correctly', async () => {
  const wrapper = mount((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
    />
  ));

  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // show dialog
  wrapper.instance().show();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // dismiss dialog
  wrapper.instance().dismiss();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
});

it('should render with FadeAnimation & show/hide correctly', async () => {
  const fadeAnimation = new FadeAnimation({
    toValue: 0,
    animationDuration: 200,
    useNativeDriver: true,
  });
  const wrapper = mount((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - FadeAnimation Animation" />}
      dialogAnimation={fadeAnimation}
    />
  ));

  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // show dialog
  wrapper.instance().show();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // dismiss dialog
  wrapper.instance().dismiss();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
});

it('should render with ScaleAnimation & show/hide correctly', async () => {
  const scaleAnimation = new ScaleAnimation({
    toValue: 0,
    useNativeDriver: true,
  });
  const wrapper = mount((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - ScaleAnimation Animation" />}
      dialogAnimation={scaleAnimation}
    />
  ));

  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // show dialog
  wrapper.instance().show();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // dismiss dialog
  wrapper.instance().dismiss();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
});

it('should render with SlideAnimation & show/hide correctly', async () => {
  const slideAnimation = new SlideAnimation({
    toValue: 0,
    slideFrom: 'bottom',
    useNativeDriver: true,
  });
  const wrapper = mount((
    <PopupDialog
      dialogTitle={<DialogTitle title="Popup Dialog - SlideAnimation Animation" />}
      dialogAnimation={slideAnimation}
    />
  ));

  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // show dialog
  wrapper.instance().show();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  // dismiss dialog
  wrapper.instance().dismiss();
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().dialog.state).toMatchSnapshot();
});
