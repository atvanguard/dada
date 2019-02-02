import React from 'react';
import ReactDOM from 'react-dom';

const navRoot = document.getElementById("nav-root");

class Drawer extends React.Component {

  el = document.createElement('div');

  componentDidMount() {
    navRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    navRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Drawer;