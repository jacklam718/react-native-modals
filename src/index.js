import {
  DragEvent,
  SwipeDirection,
  ModalProps,
  ModalFooterProps,
  ModalFooterActionList,
  ModalButtonProps,
  ModalTitleProps,
  ModalContentProps,
  BackdropProps,
} from './type';
import Modal from './Modal';
import DraggableView from './components/DraggableView';
import BaseModal from './components/BaseModal';
import BottomModal from './components/BottomModal';
import Backdrop from './components/Backdrop';
import ModalTitle from './components/ModalTitle';
import ModalFooter from './components/ModalFooter';
import ModalButton from './components/ModalButton';
import ModalContent from './components/ModalContent';
import Animation from './animations/Animation';
import FadeAnimation from './animations/FadeAnimation';
import ScaleAnimation from './animations/ScaleAnimation';
import SlideAnimation from './animations/SlideAnimation';

Modal.BottomModal = BottomModal;

export {
  DraggableView,
  BaseModal,
  BottomModal,
  Backdrop,
  ModalButton,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Animation,
  FadeAnimation,
  ScaleAnimation,
  SlideAnimation,
  DragEvent,
  SwipeDirection,
  ModalProps,
  ModalFooterProps,
  ModalFooterActionList,
  ModalButtonProps,
  ModalTitleProps,
  ModalContentProps,
  BackdropProps,
};

export default Modal;
