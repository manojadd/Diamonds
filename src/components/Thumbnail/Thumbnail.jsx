import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import "./style.css";

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {width: 300, height: 250, src: "http://localhost:3000/360-panoramas-truro-park-3-1200x600.jpg", skew: "15", direction: 'x'};
};

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.onImgLoad = this.onImgLoad.bind(this);
    let extend = Math.tan(Math.abs(this.props.skew) * Math.PI / 180) * (
      this.props.direction === 'y'
      ? this.props.width
      : this.props.height);
    let divHeight = this.props.direction === 'y'
      ? this.props.height + extend
      : this.props.height;
    let divWidth = this.props.direction === 'x'
      ? this.props.width + extend
      : this.props.width;
    let divRatio = divWidth / divHeight;
    this.state = {
      totalDimension:{
      divRatio,
      divHeight,
      divWidth,
      extend},
      imgLoaded:false,
    };
  }

  getSkewedDimension() {
    let unskew = this.props.direction === 'y'
      ? ' skewY(' + (
      -1 * this.props.skew) + 'deg) '
      : ' skewX(' + (
      -1 * this.props.skew) + 'deg) ';
    let tanValue = Math.tan(Math.abs(this.props.skew) * Math.PI / 180);

    if (this.props.direction === 'y') {
      let translateValueY,
        translateValueX;
      if (this.state.totalDimension.divRatio > 1 && this.state.imgDimension.imgRatio > this.state.totalDimension.divRatio) {
        translateValueY = tanValue * (this.state.totalDimension.divHeight * this.state.imgDimension.imgRatio);
        translateValueX = ((this.state.totalDimension.divHeight * this.state.imgDimension.imgRatio) - this.state.totalDimension.divWidth) / 2;
        return {
          height: this.state.totalDimension.divHeight,
          transform: "translateY(-" + (
          translateValueY / 2) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)",

        };
      } else if (this.state.totalDimension.divRatio > 1 && this.state.imgDimension.imgRatio < this.state.totalDimension.divRatio) {
        translateValueY = tanValue * (this.state.totalDimension.divWidth)/2;
        translateValueY = translateValueY + ((this.state.totalDimension.divWidth/this.state.imgDimension.imgRatio)-this.state.totalDimension.divHeight)/2;

        return {
          width: this.state.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew
        };
      } else if (this.state.totalDimension.divRatio < 1 && this.state.imgDimension.imgRatio < this.state.totalDimension.divRatio) {
        translateValueY = tanValue * (this.state.totalDimension.divWidth)/2;
        translateValueY = translateValueY + ((this.state.totalDimension.divWidth/this.state.imgDimension.imgRatio)-this.state.totalDimension.divHeight)/2;
        return {
          width: this.state.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew
        };
      } else if (this.state.totalDimension.divRatio < 1 && this.state.imgDimension.imgRatio > this.state.totalDimension.divRatio) {
        translateValueY = tanValue * (this.state.totalDimension.divHeight * this.state.imgDimension.imgRatio);
        translateValueX = ((this.state.totalDimension.divHeight * this.state.imgDimension.imgRatio) - this.state.totalDimension.divWidth) / 2;
        return {
          height: this.state.totalDimension.divHeight,
          transform: "translateY(-" + (
          translateValueY / 2) + "px) " + unskew + "translateX(-" + (
          translateValueX) + "px)"
        };
      }
    }
    else if(this.props.direction === 'x'){
      let translateValueY,
        translateValueX;
      if (this.state.totalDimension.divRatio > 1 && this.state.imgDimension.imgRatio > this.state.totalDimension.divRatio) {
        translateValueX = tanValue * this.state.totalDimension.divHeight/2;
        translateValueX = translateValueX + ((this.state.totalDimension.divHeight * this.state.imgDimension.imgRatio) - this.state.totalDimension.divWidth) / 2;

        return {
          height: this.state.totalDimension.divHeight,
          transform: "translateY(-" + (
          0 / 2) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)",

        };
      } else if (this.state.totalDimension.divRatio > 1 && this.state.imgDimension.imgRatio < this.state.totalDimension.divRatio) {
        translateValueX = tanValue * this.state.totalDimension.divHeight/2;
        translateValueY = ((this.state.totalDimension.divWidth/this.state.imgDimension.imgRatio)-this.state.totalDimension.divHeight)/2;

        return {
          width: this.state.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)",
        };
      } else if (this.state.totalDimension.divRatio < 1 && this.state.imgDimension.imgRatio < this.state.totalDimension.divRatio) {
        translateValueY = tanValue * (this.state.totalDimension.divWidth)/2;
        translateValueY = translateValueY + ((this.state.totalDimension.divWidth/this.state.imgDimension.imgRatio)-this.state.totalDimension.divHeight)/2;
        return {
          width: this.state.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew
        };
      } else if (this.state.totalDimension.divRatio < 1 && this.state.imgDimension.imgRatio > this.state.totalDimension.divRatio) {
        translateValueX = tanValue * this.state.totalDimension.divHeight/2;
        translateValueX = translateValueX + ((this.state.totalDimension.divHeight * this.state.imgDimension.imgRatio) - this.state.totalDimension.divWidth) / 2;

        return {
          height: this.state.totalDimension.divHeight,
          transform: "translateY(-" + (
          0 / 2) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)",

        };
      }
    }
  }

  onImgLoad({target: img}) {

    let imgHeight = img.offsetHeight;
    let imgWidth = img.offsetWidth;
    let imgRatio = imgWidth / imgHeight;

    this.setState({imgDimension:{imgHeight, imgWidth, imgRatio},imgLoaded:true});
  }

  render() {
    console.log(this.state);
    let skew = {
      transform: this.props.direction === 'y'
        ? 'skewY(' + (
        this.props.skew) + 'deg)'
        : 'skewX(' + (
        this.props.skew) + 'deg)'
    }

    let skewedDimension = this.state.imgLoaded? this.getSkewedDimension():{};
    console.log('this is skewedDimension',skewedDimension);

    return (<div className='parent' style={skew}>
      <img src={this.props.src} onLoad={this.onImgLoad} alt={'this.props.src'} style={skewedDimension}/>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail);
