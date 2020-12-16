import { Component } from 'react';

const instances = {};
class AbstractPortal extends Component {
  state = { stack: [] }
  id = 0

  constructor(props) {
    super(props);
    this.constructor.instance = this;
  }

  static get instance() {
    return instances[this.displayName || this.name];
  }

  static set instance(instance) {    
    instances[this.displayName || this.name] = instance;
  }

  static get size() {
    return this.instance.state.stack.length;
  }

  static show(children, props) {
    return this.instance.show({ children, ...props });
  }

  static update(key, props) {
    this.instance.update(key, props);
  }

  static dismiss(key) {
    this.instance.dismiss(key);
  }

  static dismissAll() {
    this.instance.dismissAll();
  }

  get current() {
    if (this.state.stack.length) {
      return this.state.stack[this.state.stack.length-1].key;
    }
  }

  generateKey = () => `modal-${this.id++}`

  getIndex = key => this.state.stack.findIndex(i => i.key === key)

  getProps = (props) => {
    const key = props.key || this.generateKey();
    return { isVisible: true, ...props, key };
  }

  show = (props) => {
    const mergedProps = this.getProps(props);
    this.setState(({ stack }) => {
      return { stack: stack.concat(mergedProps) };
    });
    return mergedProps.key;
  }

  update = (key, props) => {
    const mergedProps = this.getProps({ ...props, key });
    this.setState(({ stack }) => {
      const index = this.getIndex(key);
      stack[index] = { ...stack[index], ...mergedProps };
      return { stack };
    });
  }

  dismiss = (key = this.current) => {
    if (!key) return;
    const props = { ...this.state.stack[this.getIndex(key)], isVisible: false };
    this.update(key, props);
  }

  dismissAll = () => this.state.stack.forEach(({ key }) => this.dismiss(key));

  dismissHandler = (key) => {
    // dismiss hander: which will remove data from stack and call onDismissed callback
    const { onDismiss = () => {
      console.log('hello');
    } } = this.state.stack[this.getIndex(key)];
    this.setState(({ stack }) => {
      return { stack: stack.filter(i => i.key !== key) };
    }, onDismiss);
  }
};

export default AbstractPortal