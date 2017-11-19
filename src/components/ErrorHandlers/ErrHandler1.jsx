import React,{ Component } from 'react';
import './error.css';

class ErrorHandler1 extends Component{
  render(){
    return (<div className='errorContainer'>
      <p className='name'>{this.props.err.name}</p>
      <p className='desc'>{this.props.err.desc}</p>
    </div>)
  }
}

export default ErrorHandler1;
