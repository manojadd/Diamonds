import React, {Component} from "react";
import Thumbnail from "./components/Thumbnail/Thumbnail.jsx";
import AViewer from "./components/A-Viewer/A-Viewer.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import 'aframe';
import './App.css';
import {
  setImgDimesion,
  setHoverDimension,
  setLeftOffset,
  requestImages,
  receiveImages,
  fetchImages,
  setTotalDimension,
  setImgLoaded,
  setBaseDim,
  setBaseOffset,
  setOverlayClicked,
  setThumbnailError,
  setError,
} from "./Actions/galleryActions";

import MyError from './components/ErrorHandlers/ErrHandler';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setImgDimesion,
    setHoverDimension,
    setLeftOffset,
    requestImages,
    receiveImages,
    fetchImages,
    setTotalDimension,
    setImgLoaded,
    setBaseDim,
    setBaseOffset,
    setOverlayClicked,
    setThumbnailError,
    setError,
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {thumbnails: state.gallery.thumbnails, mainError: state.gallery.mainError, aImg: state.gallery.aImg}
};

class App extends Component {
  constructor(props) {
    super(props);
    this.props.fetchImages('https://demo0813639.mockable.io/getPanos');
    this._onCloseClick = this._onCloseClick.bind(this);
    this.obj = (({
      setImgDimesion,
      setHoverDimension,
      setLeftOffset,
      requestImages,
      receiveImages,
      fetchImages,
      setTotalDimension,
      setImgLoaded,
      setBaseDim,
      setBaseOffset,
      setOverlayClicked,
      setThumbnailError
    }) => ({
      setImgDimesion,
      setHoverDimension,
      setLeftOffset,
      requestImages,
      receiveImages,
      fetchImages,
      setTotalDimension,
      setImgLoaded,
      setBaseDim,
      setBaseOffset,
      setOverlayClicked,
      setThumbnailError
    }))(this.props);
  }
  _onCloseClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.setOverlayClicked(null);
  }

  render() {
    let thumbs = this.props.thumbnails.map((item, index) => {
      let thumb = (<Thumbnail {...this.obj} {...item} key={index}/>);
      return thumb;
    })
    let err = this.props.mainError.status
      ? (<div style={{
          width: '100%',
      }}>
        <MyError err={this.props.mainError}/>
      </div>)
      : null;

    let aViewer = (this.props.aImg !== null)
      ? (<AViewer>
        <div className='viewer'>
          <a-scene>
            <a-sky src={require(`./images/${this.props.thumbnails[this.props.aImg].src.split('/').pop()}`)}/>
          </a-scene>

          <img className={'iconImg'} src={require('./images/close.png')} onClick={this._onCloseClick} alt = 'aFrame'/>

        </div>
      </AViewer>)
      : null;
    return <div className={'bodyAlias'}>
      {thumbs}
      {err}
      {aViewer}
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
