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
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import BottomModal from './BottomModal';
import DraggableView from './components/DraggableView';
import Backdrop from './components/Backdrop';
import ModalTitle from './components/ModalTitle';
import ModalFooter from './components/ModalFooter';
import ModalButton from './components/ModalButton';
import ModalContent from './components/ModalContent';
import Animation from './animations/Animation';
import FadeAnimation from './animations/FadeAnimation';
import ScaleAnimation from './animations/ScaleAnimation';
import SlideAnimation from './animations/SlideAnimation';

export {
  ModalPortal,
  Modal,
  BottomModal,
  Backdrop,
  DraggableView,
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
