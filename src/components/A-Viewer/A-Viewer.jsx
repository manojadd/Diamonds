import {Component} from 'react';
import ReactDOM from 'react-dom';
import './viewer.css';

export default class AViewer extends Component {
  render() {
    return ReactDOM.createPortal(this.props.children, document.getElementById('aFrame'));
  }
}
