import {
  ModalProps,
  ModalFooterProps,
  ModalFooterActionList,
  ModalButtonProps,
  ModalTitleProps,
  ModalContentProps,
  OverlayProps,
} from './type';
import Modal from './Modal';
import BaseModal from './components/BaseModal';
import BottomModal from './components/BottomModal';
import Overlay from './components/Overlay';
import ModalTitle from './components/ModalTitle';
import ModalFooter from './components/ModalFooter';
import ModalButton from './components/ModalButton';
import ModalContent from './components/ModalContent';
import Animation from './animations/Animation';
import FadeAnimation from './animations/FadeAnimation';
import ScaleAnimation from './animations/ScaleAnimation';
import SlideAnimation from './animations/SlideAnimation';

export {
  BaseModal,
  BottomModal,
  Overlay,
  ModalButton,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Animation,
  FadeAnimation,
  ScaleAnimation,
  SlideAnimation,
  ModalProps,
  ModalFooterProps,
  ModalFooterActionList,
  ModalButtonProps,
  ModalTitleProps,
  ModalContentProps,
  OverlayProps,
};

export default Modal;
