import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Dialog from '../src/components/Dialog';
import DialogTitle from '../src/components/DialogTitle';
import FadeAnimation from '../src/animations/FadeAnimation';
import ScaleAnimation from '../src/animations/ScaleAnimation';
import SlideAnimation from '../src/animations/SlideAnimation';

const DELAY_MS = 1000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

it('should render with Default & show/hide Animation correctly', async () => {
  const wrapper = mount((
    <Dialog
      dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
    />
  ));

  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
});

it('should render with FadeAnimation & show/hide correctly', async () => {
  const fadeAnimation = new FadeAnimation({
    initialValue: 0,
    animationDuration: 200,
    useNativeDriver: true,
  });
  const wrapper = mount((
    <Dialog
      dialogTitle={<DialogTitle title="Popup Dialog - FadeAnimation Animation" />}
      dialogAnimation={fadeAnimation}
    />
  ));

  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
});

it('should render with ScaleAnimation & show/hide correctly', async () => {
  const scaleAnimation = new ScaleAnimation({
    initialValue: 0,
    useNativeDriver: true,
  });
  const wrapper = mount((
    <Dialog
      dialogTitle={<DialogTitle title="Popup Dialog - ScaleAnimation Animation" />}
      dialogAnimation={scaleAnimation}
    />
  ));

  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
});

it('should render with SlideAnimation & show/hide correctly', async () => {
  const slideAnimation = new SlideAnimation({
    initialValue: 0,
    slideFrom: 'bottom',
    useNativeDriver: true,
  });
  const wrapper = mount((
    <Dialog
      dialogTitle={<DialogTitle title="Popup Dialog - SlideAnimation Animation" />}
      dialogAnimation={slideAnimation}
    />
  ));

  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.dialogState).toMatchSnapshot();
});

it('should render with PopupDialog with Overlay', async () => {
  const wrapper = mount((
    <Dialog
      show
      hasOverlay
    />
  ));
  await sleep(DELAY_MS);
  expect(wrapper).toMatchSnapshot();
});

it('should render with PopupDialog without Overlay', async () => {
  const wrapper = mount((
    <Dialog
      show
      hasOverlay={false}
    />
  ));
  await sleep(DELAY_MS);
  expect(wrapper).toMatchSnapshot();
});
