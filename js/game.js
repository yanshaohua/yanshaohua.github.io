/**
 * Created by 严少华 on 2017/7/14.
 */
(function (Fly) {
    function Game(option) {
      this.imgSrcList = ['birds','land','pipe1','pipe2','sky'];
      this.roles = [];
      console.log(this.roles);
      this.isStart = true;
      this.lastFrameTime  = new Date(),
      this.curFrameTime  = 0,
      this.delta = 0;
      this.hreo = null;

      this.ctx = Fly.createCV(option.id);
    }
    Game.prototype={
      constructor: Game,

      bindEvent:function () {
        var that = this;
        that.ctx.canvas.addEventListener("click",function () {
          that.hreo.speed = -0.3;
        })
      },
      createRoles:function (imglist) {
        var that = this;
        var roles = this.roles;
        this.hreo = Fly.factory('bird',{
          img:imglist.birds,
          ctx:this.ctx,
          landPosY:imglist.sky.height - imglist.land.height
        });

        this.hreo.addlistener(function () {
            that.stop();
        })

        for(var i = 0; i < 2 ; i++){
          var sky = Fly.factory('sky',{
            img:imglist.sky,
            x:imglist.sky.width * i,
            ctx:this.ctx
          })
          roles.push(sky);
        }

        for(var i = 0; i < 6 ; i++){
          var pipe = Fly.factory('pipe',{
            imgTop:imglist.pipe2,
            imgBottom:imglist.pipe1,
            x:imglist.pipe2.width * 3 * i + 300,
            ctx:this.ctx
          })
          roles.push(pipe);
        }

        for(var i = 0; i < 4 ; i++){
          var land = Fly.factory('land',{
            img:imglist.land,
            x : imglist.land.width * i,
            y : imglist.sky.height - imglist.land.height,
            ctx:this.ctx
          })
          roles.push(land);
        }
      },
      draw:function (imglist) {
        var that = this;
        var ctx = this.ctx;
        (function rander() {

          that.curFrameTime = new Date();
          that.delta = that.curFrameTime - that.lastFrameTime;
          that.lastFrameTime = that.curFrameTime;


          ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
          ctx.beginPath();

          ctx.save();

          that.roles.forEach(function (role) {
            role.draw(that.delta);
          })

          that.hreo.draw( that.delta );

          ctx.restore();
          if(that.isStart){
            requestAnimationFrame(rander);
          }
        })();
      },
      start:function () {
        var that = this;
        Fly.loadImg(that.imgSrcList,function (imglist) {
          that.createRoles(imglist);

          that.draw(imglist);

          that.bindEvent();
        });
      },
      stop:function () {
          this.isStart=false;
      }
    }

  //单例模式
  var instance = null;
  Fly.game = function (option) {
      if(instance === null){
        instance = new Game(option);
      }
    return instance;
  }
    //Fly.game = Game;
})(Fly);