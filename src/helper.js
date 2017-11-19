export const transformHelp = function (transform='',translateX,translateY,skewX,skewY,scaleX,scaleY){
  translateX && (transform += ' translateX('+translateX+'px) ');
  translateY && (transform += ' translateY('+translateY+'px) ');
  skewX && (transform += ' skewX('+skewX+'px) ');
  skewY && (transform += ' skewY('+skewY+'px) ');
  scaleX && (transform += ' scaleX('+scaleX+'px) ');
  scaleY && (transform += ' scaleY('+scaleY+'px) ');
  return transform;

}
