import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Modal from '../src/components/BaseModal';
import ModalTitle from '../src/components/ModalTitle';
import FadeAnimation from '../src/animations/FadeAnimation';
import ScaleAnimation from '../src/animations/ScaleAnimation';
import SlideAnimation from '../src/animations/SlideAnimation';

const DELAY_MS = 1000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

it('should render with Default & show/hide Animation correctly', async () => {
  const wrapper = mount((
    <Modal
      modalTitle={<ModalTitle title="Popup Dialog - Default Animation" />}
    />
  ));

  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
});

it('should render with FadeAnimation & show/hide correctly', async () => {
  const fadeAnimation = new FadeAnimation({
    initialValue: 0,
    animationDuration: 200,
    useNativeDriver: true,
  });
  const wrapper = mount((
    <Modal
      modalTitle={<ModalTitle title="Popup Dialog - FadeAnimation Animation" />}
      modalAnimation={fadeAnimation}
    />
  ));

  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
});

it('should render with ScaleAnimation & show/hide correctly', async () => {
  const scaleAnimation = new ScaleAnimation({
    initialValue: 0,
    useNativeDriver: true,
  });
  const wrapper = mount((
    <Modal
      modalTitle={<ModalTitle title="Popup Dialog - ScaleAnimation Animation" />}
      modalAnimation={scaleAnimation}
    />
  ));

  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
});

it('should render with SlideAnimation & show/hide correctly', async () => {
  const slideAnimation = new SlideAnimation({
    initialValue: 0,
    slideFrom: 'bottom',
    useNativeDriver: true,
  });
  const wrapper = mount((
    <Modal
      modalTitle={<ModalTitle title="Popup Dialog - SlideAnimation Animation" />}
      modalAnimation={slideAnimation}
    />
  ));

  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // show dialog
  wrapper.setProps({ visible: true });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  // dismiss dialog
  wrapper.setProps({ visible: false });
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
  await sleep(DELAY_MS);
  expect(wrapper.instance().state.modalState).toMatchSnapshot();
});

it('should render with PopupDialog with Overlay', async () => {
  const wrapper = mount((
    <Modal
      show
      hasOverlay
    />
  ));
  await sleep(DELAY_MS);
  expect(wrapper).toMatchSnapshot();
});

it('should render with PopupDialog without Overlay', async () => {
  const wrapper = mount((
    <Modal
      show
      hasOverlay={false}
    />
  ));
  await sleep(DELAY_MS);
  expect(wrapper).toMatchSnapshot();
});
