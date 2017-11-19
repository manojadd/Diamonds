import React, {Component} from "react";
import Thumbnail from "./components/Thumbnail/Thumbnail.jsx";
import AViewer from "./components/A-Viewer/A-Viewer.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import 'aframe';
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
  setOverlayClicked
} from "./Actions/galleryActions";

import MyError from './components/ErrorHandlers/ErrHandler1';

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
    setOverlayClicked
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {thumbnails: state.gallery.thumbnails, mainError: state.gallery.mainError, aImg: state.gallery.aImg}
};

class App extends Component {
  constructor(props) {
    super(props);
    this.props.fetchImages('https://demo0813639.mockable.io/getPanos');
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
      setOverlayClicked
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
      setOverlayClicked
    }))(this.props);
  }

  render() {
    console.log('Props in app: ', this.props);
    let thumbs = this.props.thumbnails.map((item, index) => {
      let thumb = (<Thumbnail {...this.obj} {...item} key={index}/>);
      return thumb;
    })
    let err = this.props.mainError.status
      ? (<div style={{
          width: '100%',
          height: '100%'
        }}>
        <MyError err={this.props.mainError}/>
      </div>)
      : null;
    let aViewer = (this.props.aImg)
      ? (<AViewer><a-scene><a-sky src={this.props.thumbnails[this.props.aImg].src} /></a-scene></AViewer>)
      : null;
    return <div >
      {thumbs}
      {err}
      {aViewer}
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
