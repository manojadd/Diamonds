import {galleryConstant, thumbnailConstant} from "../constants.js";
import update from 'immutability-helper';

const part = {
  width: 200,
  height: 200,
  skew: -15,
  direction: 'x',
  hoverScale: 1.2,
  topOffset: -125,
  // leftOffset: 50,
  divisions: 3,
  time: 1,
  repeat: 1,
  colors: [
    '#FE938C', '#DB5ABA', '#87B38D', '#1B2021', '#1D3461'
  ],
  standScale: {
    x: 0.6,
    y: 0.6
  },
  thumbError:{}
};

const initialState = {
  thumbnails: [],
  mainError:{},
  aImg:null
};

export const galleryReducer = function(state = initialState, action) {
  let obj = {};
  switch (action.type) {
    case galleryConstant.requestImages:
      return state;
    case galleryConstant.receiveImages:
      let thumbnails = action.payload.json.map((item, index) => {
        let {
          pano: src,
          name,
          ...rest
        } = {
          ...item,
          ...part
        };
        return Object.assign({}, {
          src,
          name,
          id: index
        }, JSON.parse(JSON.stringify(rest)));
      })
      return Object.assign({}, state, {thumbnails});
    case thumbnailConstant.setImgDim:
      obj = update(state, {
        thumbnails: {
          [action.payload.id]: {
            imgDimension:{$set:action.payload.imgDimension}
          }
        }
      });
    return obj;
    case thumbnailConstant.setTotalDim :
    obj = update(state, {
      thumbnails: {
        [action.payload.id]: {
          totalDimension:{$set:action.payload.totalDimension}
        }
      }
    });
  return obj;
    case thumbnailConstant.setImgLoaded :
       obj = update(state, {
          thumbnails: {
            [action.payload.id]: {
              imgLoaded:{$set:action.payload.imgLoaded}
            }
          }
        });
    return obj;
    case thumbnailConstant.setHovDim :
    return update(state, {
        thumbnails: {
          [action.payload.id]: {
            hoverDimension:{$set:JSON.parse(JSON.stringify(action.payload.hoverDimension))}
          }
        }
      });
    case thumbnailConstant.setBaseDim :
       obj = update(state, {
          thumbnails: {
            [action.payload.id]: {
              "baseDim":{$set:action.payload.baseDim}
            }
          }
        });
    return obj;
    case thumbnailConstant.setBaseOffset :
      obj = update(state, {
          thumbnails: {
            [action.payload.id]: {
              "baseOffset":{$set:action.payload.baseOffset}
            }
          }
        });
    return obj;
    case thumbnailConstant.setLeftOff :
     obj = update(state, {
          thumbnails: {
            [action.payload.id]: {
              "leftOffset":{$set:action.payload.leftOffset}
            }
          }
        });
    return obj;
    case thumbnailConstant.setThumbnailError:
      obj = update(state,{
        thumbnails:{
          [action.payload.id]:{
            thumbError:{
              status:{$set:true},
              name:{$set:action.payload.name},
              desc:{$set:action.payload.desc}
            }
          }
        }
      });
      return obj;
    case galleryConstant.setError:
      obj = update(state,{
        mainError:{
          status:{$set:true},
          name:{$set:action.payload.name},
          desc:{$set:action.payload.desc}
        }
      });
      return obj;
      case galleryConstant.overlayClicked:
        obj = update(state,{
          aImg:{$set:action.payload.id}
        });
        return obj;
    default :
      return state;
  }
}
