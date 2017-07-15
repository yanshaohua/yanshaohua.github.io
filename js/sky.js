/**
 * Created by 严少华 on 2017/7/14.
 */
(function (Fly) {
  'use strict';
 function Sky(option) {
     this.ctx = option.ctx;
     this.skyimg = option.img;
     this.skyimgW = this.skyimg.width;
     this.skyimgH = this.skyimg.height;
     this.skySpeed = -0.3;
     this.skyY = 0;
     this.skyX = option.x || 0;
 }

  Sky.prototype={
    constructor:Sky,
    draw:function ( delta ) {
      var ctx = this.ctx;
      ctx.drawImage(this.skyimg,this.skyX,this.skyY);

      this.skyX += this.skySpeed * delta;

      if(this.skyX <= -this.skyimgW){
        this.skyX += this.skyimgW * 2;
      }
    }
  }

  Fly.sky = Sky;

})(Fly);