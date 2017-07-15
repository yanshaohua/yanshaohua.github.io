/**
 * Created by 严少华 on 2017/7/14.
 */
(function (Fly) {
  'use strict';

  function Land(option) {
    this.ctx = option.ctx;

      this.img = option.img,
      this.imgW = this.img.width,
      this.imgH = this.img.height,
      this.x = option.x || 0,
      this.y = option.y,
      this.speed = -0.2;

     this.ctx = option.ctx;
  }

  Land.prototype.draw = function (delta) {
    var ctx = this.ctx;

    this.x += this.speed * delta;
    if(this.x <= -this.imgW){
      this.x += this.imgW * 4;
    }
    ctx.drawImage(this.img,this.x,this.y);
  }

  Fly.land = Land;

})(Fly);