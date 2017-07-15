/**
 * Created by 严少华 on 2017/7/14.
 */
(function (Fly) {
  'use strict';
  function Bird(option) {
      this.birdsimg = option.img;
      this.imgW = this.birdsimg.width / 3;
      this.imgH = this.birdsimg.height;
      this.fameIndex = 0;
      this.a = 0.0005;
      this.y = 100;
      this.x = 100;
      this.maxAngle = 45;
      this.maxSpeed = 0.3;
      this.curAngle = 0;
      this.speed = 0;
     this.ctx = option.ctx;
    this.landPosY = option.landPosY;

    this.listeners = [];
  }

  Bird.prototype={
     constructor:Bird,

    draw:function (delta) {
      var ctx = this.ctx;

      this.curAngle = this.maxAngle / this.maxSpeed * this.speed;
      if (this.curAngle > this.maxAngle) {
        this.curAngle = this.maxAngle;
      } else if (this.curAngle < -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      }

      if (this.y <= 5 || this.y >= this.landPosY || ctx.isPointInPath(this.x, this.y)) {
        // 发布 发生碰撞 的消息
        this.trigger();
      }

      ctx.translate(this.x,this.y);

      ctx.rotate(Fly.toRadian(this.curAngle));

      ctx.drawImage(this.birdsimg, this.imgW * this.fameIndex++ , 0,this.imgW,this.imgH,-1 / 2 * this.imgW,-1 / 2 * this.imgH,this.imgW,this.imgH);

      this.fameIndex %= 3;

      this.speed = this.speed + this.a * delta;
      this.y += this.speed * delta + 1/2*this.a *Math.pow(delta,2);
    },

    addlistener:function ( fn ) {
        this.listeners.push(fn);
    },
    trigger:function () {
        this.listeners.forEach(function ( fn ) {
            fn();
        })
    }

  }
  Fly.bird = Bird;
})(Fly);