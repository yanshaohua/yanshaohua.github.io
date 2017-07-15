/**
 * Created by 严少华 on 2017/7/14.
 */
(function (window) {
    var FlyObj = {};

  FlyObj.loadImg=function (imglist,callback) {
    var count = 0,
      imgList = {};
    imglist.forEach(function (srcVal) {
      var img = new Image();
      img.src = "./imgs/"+ srcVal + ".png";
      imgList[srcVal] = img;
      img.onload=function () {
        count++;
        if(count >= imglist.length){
          callback(imgList);
        }
      }
    })
  },

  FlyObj.toRadian = function(angle){
    return angle / 180 * Math.PI;
  },

    //工厂模式
  FlyObj.factory = function (type,option) {
     switch (type){
       case 'bird':
         return new FlyObj.bird(option);
       case 'sky' :
         return new FlyObj.sky(option);
       case 'pipe' :
         return new FlyObj.pipe(option);
       case "land" :
         return new FlyObj.land(option);
     }
  }

  FlyObj.createCV=function ( id ) {
    var contain = document.getElementById(id) || document;

      var cv = document.createElement("canvas");
    cv.width = 800;
    cv.height = 600;

    var ctx = cv.getContext("2d");

    contain.appendChild( cv );

    return ctx;
  }

  window.Fly = FlyObj;
})(window);