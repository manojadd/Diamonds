import {galleryConstant,thumbnailConstant} from "../constants.js";

export const setImgDimesion = (imgDim,id)=>{
  return {
      type: thumbnailConstant.setImgDim,
      payload: {
        imgDimension:imgDim,
        id
      }
    };
}

export const setHoverDimension = (hoverDim,id)=>{
  return {
      type: thumbnailConstant.setHovDim,
      payload: {
        hoverDimension: hoverDim,
        id
      }
    };
}

export const setTotalDimension = (totalDim,id)=>{
  return {
      type: thumbnailConstant.setTotalDim,
      payload: {
        totalDimension: totalDim,
        id
      }
    };
}

export const setImgLoaded = (imgLoaded,id)=>{
  return {
      type: thumbnailConstant.setImgLoaded,
      payload: {
        imgLoaded,
        id
      }
    };
}

export const setBaseDim = (baseDim,id)=>{
  return {
      type: thumbnailConstant.setBaseDim,
      payload: {
        baseDim,
        id
      }
    };
}

export const setBaseOffset = (baseOffset,id)=>{
  return {
      type: thumbnailConstant.setBaseOffset,
      payload: {
        baseOffset,
        id
      }
    };
}

export  const setLeftOffset = (los,id)=>{
  return {
    type: thumbnailConstant.setLeftOff,
    payload: {
      leftOffset: los,
      id
    }
  };
}

export const requestImages = ()=> {
  return {
    type: galleryConstant.requestImages,
  }
}

export const receiveImages = (json)=> {
  return {
    type: galleryConstant.receiveImages,
    payload:{
       json
     }
  }
}

export  const setThumbnailError = (error,id)=>{
  return {
    type: thumbnailConstant.setThumbnailError,
    payload: {
      name: error.split(":")[0],
      desc: error.split(":")[1],
      id
    }
  };
}

export  const setError = (error)=>{
  return {
    type: galleryConstant.setError,
    payload: {
      name: error.split(":")[0],
      desc: error.split(":")[1],
    }
  };
}

export  const setOverlayClicked = (id)=>{
  return {
    type: galleryConstant.overlayClicked,
    payload: {
      id
    }
  };
}

export const fetchImages = (url)=>{
  return function(dispatch){
    dispatch(requestImages());
    return fetch(url)
    .then(response => response.json())
    .then(response => {dispatch(receiveImages(response))})
    .catch((error)=>{
      console.log("erroroooo",error);
      dispatch(setError(error.toString()));
    });

  }
}
