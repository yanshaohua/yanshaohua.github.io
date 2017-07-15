/**
 * Created by 严少华 on 2017/7/14.
 */
(function (Fly) {
  'use strict';
  function Pipe(option) {
    this.imgTop = option.imgTop;
    this.imgBottom = option.imgBottom;

    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;
    this.x = option.x || 0;
    this.bottomY = 0;
    this.topY = 0;
    this.speed = -0.2;
    this.pipeSpace = 150;

    this.ctx = option.ctx;

    this.initPipeHeight();
  }

  Pipe.prototype={
    constructor: Pipe,

    draw:function (delta) {
      var ctx = this.ctx;
       this.x += this.speed * delta;
      if(this.x <= -this.imgW){
        this.x += this.imgW*3*6;
        this.initPipeHeight();
      }

      ctx.rect(this.x,this.topY,this.imgW,this.imgH);
      ctx.rect(this.x,this.bottomY,this.imgW,this.imgH);

      ctx.drawImage(this.imgTop, this.x, this.topY);
      ctx.drawImage(this.imgBottom, this.x, this.bottomY);
    },
    initPipeHeight:function () {
      var pipeTopHeight = Math.random() * 200 + 50;

      this.topY = pipeTopHeight - this.imgH;

      this.bottomY = pipeTopHeight + this.pipeSpace;
    }
  }


  Fly.pipe = Pipe;
})(Fly);