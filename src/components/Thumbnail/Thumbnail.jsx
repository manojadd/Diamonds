import {Component} from "react";
import React from "react";
import "./style.css";
import {transformHelp} from '../../helper.js';
import {CSSTransitionGroup} from 'react-transition-group';
import {StyleSheet, css} from 'aphrodite';

function NoWrapper(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.onImgLoad = this.onImgLoad.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this.getStand = this.getStand.bind(this);
    this.getColor = this.getColor.bind(this);
    this._onClick = this._onClick.bind(this);
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
    let baseDim = {
      x: divWidth * this.props.standScale.x,
      y: divHeight * this.props.standScale.y
    }
    let baseOffset = {
      x: divWidth * (1 - this.props.standScale.x) / 2,
      y: divHeight * (1 - this.props.standScale.y) / 2
    }
    this.state = {};
    this.props.setTotalDimension({
      divRatio,
      divHeight,
      divWidth,
      extend
    }, this.props.id);
    this.props.setImgLoaded(false, this.props.id);
    this.props.setBaseDim(baseDim, this.props.id);
    this.props.setBaseOffset(baseOffset, this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hoverDimension && this.props.leftOffset) {
      let divs = this.getDivDimensions(this.props.hoverDimension.width, this.props.hoverDimension.height, this.props.baseDim.x, this.props.baseDim.y, this.props.divisions);
      let offsetDimensions = this.getOffsetDimensions(this.props.leftOffset - this.props.baseOffset.x, this.props.topOffset - this.props.baseOffset.y, this.props.divisions);
      this.setState({standDivs: divs, offsetDimensions});
      this.props.setImgLoaded(true, this.props.id);
    }
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
      if (this.props.imgDimension.imgRatio > this.props.totalDimension.divRatio) {
        translateValueY = tanValue * (this.props.totalDimension.divHeight * this.props.imgDimension.imgRatio);
        translateValueX = ((this.props.totalDimension.divHeight * this.props.imgDimension.imgRatio) - this.props.totalDimension.divWidth) / 2;
        return {
          height: this.props.totalDimension.divHeight,
          transform: "translateY(-" + (
          translateValueY / 2) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)"
        };
      } else if (this.props.imgDimension.imgRatio < this.props.totalDimension.divRatio) {
        translateValueY = tanValue * (this.props.totalDimension.divWidth) / 2;
        translateValueY = translateValueY + ((this.props.totalDimension.divWidth / this.props.imgDimension.imgRatio) - this.props.totalDimension.divHeight) / 2;

        return {
          width: this.props.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew
        };
      }
    } else if (this.props.direction === 'x') {
      let translateValueY,
        translateValueX;
      if (this.props.imgDimension.imgRatio > this.props.totalDimension.divRatio) {
        translateValueX = tanValue * this.props.totalDimension.divHeight / 2;
        translateValueX = translateValueX + ((this.props.totalDimension.divHeight * this.props.imgDimension.imgRatio) - this.props.totalDimension.divWidth) / 2;

        return {
          height: this.props.totalDimension.divHeight,
          transform: "translateY(-" + (
          0 / 2) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)"
        };
      } else if (this.props.totalDimension.divRatio > 1 && this.props.imgDimension.imgRatio < this.props.totalDimension.divRatio) {
        translateValueX = tanValue * this.state.totalDimension.divHeight / 2;
        translateValueY = ((this.props.totalDimension.divWidth / this.props.imgDimension.imgRatio) - this.props.totalDimension.divHeight) / 2;

        return {
          width: this.props.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew + "translateX(-" + (
          translateValueX) + "px)"
        };
      } else if (this.props.totalDimension.divRatio < 1 && this.props.imgDimension.imgRatio < this.props.totalDimension.divRatio) {
        translateValueY = tanValue * (this.props.totalDimension.divWidth) / 2;
        translateValueY = translateValueY + ((this.props.totalDimension.divWidth / this.props.imgDimension.imgRatio) - this.props.totalDimension.divHeight) / 2;
        return {
          width: this.props.totalDimension.divWidth,
          transform: "translateY(-" + (
          translateValueY) + "px)" + unskew
        };
      }
    }
  }

  getDivDimensions(hoverWidth, hoverHeight, totalWidth, totalHeight, n) {

    let diff = {};
    let divs = [];

    diff.x = (hoverWidth - totalWidth) / (n + 1);
    diff.y = (hoverHeight - totalHeight) / (n + 1);

    for (let i = 0; i <= n + 1; i++) {
      let obj = {};
      obj.x = totalWidth + (diff.x * i);
      obj.y = totalHeight + (diff.y * i);
      divs.push(obj);
    }
    return divs;

  }
  getOffsetDimensions(leftOffset, topOffset, divisions) {
    let offsetDiff = {};
    let offsetDimensions = [];
    let n = divisions;
    offsetDiff.x = leftOffset / (n + 1);
    offsetDiff.y = topOffset / (n + 1);
    for (let i = 0; i <= n + 1; i++) {
      let obj = {};
      obj.x = (offsetDiff.x * i);
      obj.y = (offsetDiff.y * i);
      offsetDimensions.push(obj);
    }
    return offsetDimensions;
  }

  onImgLoad({
    target: img
  }, cb) {

    let imgHeight = img.offsetHeight;
    let imgWidth = img.offsetWidth;
    let imgRatio = imgWidth / imgHeight;
    let dim = this.getHoverDimension(this.props.totalDimension, this.props.hoverScale, {imgHeight, imgWidth, imgRatio});
    let leftOffset = (this.props.totalDimension.divWidth - dim.width) / 2;
    this.props.setImgDimesion({
      imgHeight,
      imgWidth,
      imgRatio
    }, this.props.id);
    this.props.setHoverDimension(dim, this.props.id);
    this.props.setLeftOffset(leftOffset, this.props.id);
    cb && cb();
  }

  getHoverDimension(totalDimension, hoverScale, imgDimension) {
    let dim = {};
    dim.height = totalDimension.divHeight * hoverScale;
    dim.width = dim.height * imgDimension.imgRatio;
    return dim;
  }
  getStand() {
    let px = 'px';
    return this.state.standDivs.map((item, index) => {
      let styles = StyleSheet.create({
        [`level${index}`]: {
          animationName: {
            '0%': {
              opacity: '0'
            },
            '100%': {
              opacity: '1'
            }
          },
          animationDuration: `${this.props.time}s`,
          animationDelay: `${ (this.props.time / (this.props.divisions + 2)) * ((index + 1) % ((this.props.divisions + 2) / this.props.repeat))}s`,
          animationIterationCount: 'infinite'
        }
      });
      let style = {};
      style.width = item.x + px;
      style.height = item.y + px;
      style.position = 'absolute';
      style.transform = this.props.direction === 'x'
        ? 'translateX(-' + (
        this.props.totalDimension.extend / 2) + 'px)'
        : 'translateY(-' + (
        this.props.totalDimension.extend / 2) + 'px)';
      style.transform = transformHelp(style.transform, this.state.offsetDimensions[index].x, this.state.offsetDimensions[index].y);

      style.outline = 'none';
      style.borderColor = this.getColor(index);
      style.boxShadow = '0 0 30px ' + this.getColor(index) + ',inset 0 0 30px ' + this.getColor(index);
      style.zIndex = index;
      style.border = '2px solid ' + this.getColor(index);
      return (<div key={index} className={css(styles[`level${index}`])} style={style}></div>)
    });

  }
  getColor(index) {
    let length = this.props.colors.length;
    return this.props.colors[index % length];
  }
  _onMouseEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    (!this.state.hovered) && this.setState({hovered: true});
  }
  _onMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.state.hovered && this.setState({hovered: false});
  }

  _onClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.setOverlayClicked(this.props.id);
  }

  render() {
    console.log('this is props in thumbnail: ',this.props);
    let skew = {
      transform: this.props.direction === 'y'
        ? 'skewY(' + (
        this.props.skew) + 'deg)'
        : 'skewX(' + (
        this.props.skew) + 'deg)'
    }
    let groupStyle = {};
    if (this.props.baseOffset) {
      groupStyle = {
        position: 'absolute',
        zIndex: '3',
        transform: transformHelp('', this.props.baseOffset.x, this.props.baseOffset.y)
      }
    }
    let skewedDimension = this.props.imgLoaded
      ? this.getSkewedDimension()
      : {};
    let stand = (this.state.hovered&&this.state.standDivs&&this.state.offsetDimensions)
      ? this.getStand()
      : null;
    let hoverStyle = {};

    if (this.props.imgLoaded) {
      hoverStyle.width = `${this.props.hoverDimension.width}px`;
      hoverStyle.height = `${this.props.hoverDimension.height}px`;
      hoverStyle.position = 'absolute';

      hoverStyle.transform = this.props.direction === 'x'
        ? `translateX(-${ (this.props.totalDimension.extend / 2)}px)`
        : `translateY(-${ (this.props.totalDimension.extend / 2)}px)`;
      hoverStyle.transform = transformHelp(hoverStyle.transform, this.props.leftOffset, this.props.topOffset)
      hoverStyle.zIndex = this.props.divisions + 2;
    }
    let thumbnailStyleOnHover = {
      filter: 'blur(10px)'
    }
    let mainStyle = {};
    if (this.props.totalDimension)
      mainStyle = {
        position: 'relative',
        marginLeft: `${ ((this.props.totalDimension.divWidth - this.props.width) / 2) + 20}px`,
        marginRight: `${ ((this.props.totalDimension.divWidth - this.props.width) / 2) + 20}px`,
        marginTop: `${ (
          this.props.topOffset < 0
          ? Math.abs(this.props.topOffset)
          : 0) + 20}px`,
        marginBottom: `${ ((this.props.totalDimension.divHeight - this.props.height) / 2) + 20}px`
      };
    return (<div className='main' style={mainStyle}>
      <CSSTransitionGroup component={NoWrapper} transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {
          this.state.hovered
            ? (<img src={this.props.src} alt={'this.props.src'} style={hoverStyle}/>)
            : null
        }
      </CSSTransitionGroup>

      <CSSTransitionGroup component={'div'} style={groupStyle} transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={1}>
        {stand}
      </CSSTransitionGroup>
      <div className='overlayDiv' style={Object.assign({}, skew, {
          cursor: 'pointer',
          width: `${this.props.width}px`,
          height: `${this.props.height}px`
      })} onMouseEnter={this._onMouseEnter} onMouseOut={this._onMouseOut} onClick={this._onClick}></div>
      <div className='parent' style={Object.assign({}, skew, {
          width: `${this.props.width}px`,
          height: `${this.props.height}px`
      })}>

        <img src={this.props.src} onLoad={this.onImgLoad} alt={this.props.src} style={Object.assign({}, skewedDimension, this.state.hovered && thumbnailStyleOnHover)}/>

      </div>

    </div>);
  }
}

export default Thumbnail;
