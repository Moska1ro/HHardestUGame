import { Item } from "../Item.js";
import { Player } from "../Player.js";
import { Controller } from "../Controller.js";
var b = new Bump(PIXI);
var Application = PIXI.Application,
  Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle,
  Graphics = PIXI.Graphics;
const texture = Texture.from("./images/player.png");
Texture.addToCache(texture, "player");

export class Create3 {
  constructor(death) {
    this.death = death;
    // 可以添加一个开始界面，点击按钮开始游戏；
    this.setup(); // 开始游戏
  }
  setup = () => {
    window.innerHeight = 960;
    window.innerWidth = 1920;
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.app.renderer.backgroundColor = 0xffffff;
    document.body.appendChild(this.app.view);


    // // debug
    // if (this.death === 10) {
    //   this.state = this.succeed;
    // } else {
    //   this.state = this.play;
    // }


    this.state = this.play; // 开始游玩
    this.init(); // 初始化游戏地图及玩家角色
    this.spriteAnimationPlay();
    this.app.ticker.maxFPS = 60;// 锁帧数
    this.app.ticker.add((delta) => this.gameLoop(delta)); // 循环动画渲染
  };

  init = () => {
    // 场景初始化
    this.gameScene = new Container(); // 游戏场景容器
    this.gameOverScene = new Container(); // 游戏结束界面容器
    this.gameOverScene.visible = false; // 一开始没有Game over时，结束界面不可见
    this.app.stage.addChild(this.gameScene);
    this.app.stage.addChild(this.gameOverScene);
    this.backgroundsp = new Sprite.from("./images/Clouds4.png");
    this.backgroundsp.x = 0;
    this.backgroundsp.y = 0;
    this.backgroundsp.width = window.innerWidth;
    this.backgroundsp.height = window.innerHeight;
    this.gameScene.addChild(this.backgroundsp);
    // let message = new Text("death:" + this.death);
    // message.scale.set(2, 2);
    // message.x = 1700;
    // message.y = 0;
    let message = new Text("Lost:" + '\n' + this.death, {
      fill: 0xF5F5F5,
    });
    message.color = 'white';
    message.scale.set(2, 2);
    message.x = 1700;
    message.y = 0;
    this.gameScene.addChild(message);

    // 元素初始化
    this.controller = new Controller(this); // 传入控制器
    this.key = [
      new Item(this, {
        src: "./images/star.png",
        x: 100,
        y: 20,
        width: 40,
        height: 40,
      }).obj,
      new Item(this, {
        src: "./images/star.png",
        x: 400,
        y: 20,
        width: 40,
        height: 40,
      }).obj,
      new Item(this, {
        src: "./images/star.png",
        x: 700,
        y: 30,
        width: 40,
        height: 40,
      }).obj,
    ];

    this.bricks = [
      //first
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: window.innerHeight - 10,
        width: 250,
        height: 10,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 250,
        y: window.innerHeight - 260,
        width: 60,
        height: 260,
      }).obj,
      //sec
      new Item(this, {
        src: "./images/brick.png",
        x: 800,
        y: window.innerHeight - 10,
        width: 100,
        height: 10,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 500,
        y: 700,
        width: 550,
        height: 60,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: 450,
        width: 500,
        height: 60,
      }).obj,
      //third
      new Item(this, {
        src: "./images/brick.png",
        x: 1300,
        y: 510,
        width: 60,
        height: 450,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 760,
        y: 450,
        width: 600,
        height: 60,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 1360,
        y: window.innerHeight - 10,
        width: 560,
        height: 10,
      }).obj,
      //forth
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: 150,
        width: 440,
        height: 110,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 440,
        y: 200,
        width: 1210,
        height: 60,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 1590,
        y: 260,
        width: 60,
        height: 500,
      }).obj,
    ];
    this.accelerateBricks = [
      new Item(this, {
        src: "./images/accelerateBrick.png",
        x: 250,
        y: window.innerHeight - 60,
        width: 60,
        height: 50,
      }).obj,
      //测试用
      // new Item(this, {
      //   src: "./images/accelerateBrick.png",
      //   x: 1500,
      //   y: 200,
      //   // x: 950,
      //   // y: 700,
      //   // x: 1750,
      //   // y: 900,
      //   width: 100,
      //   height: 40,
      // }).obj,
    ];
    this.decelerateBricks = [
      new Item(this, {
        src: "./images/decelerateBrick.png",
        x: 500,
        y: 400,
        width: 60,
        height: 300,
      }).obj,
    ];
    this.switchers = [
      new Item(this, {
        src: "./images/switcher.png",
        x: 800,
        y: 701,
        width: 100,
        height: 40,
      }).obj,
    ];

    this.killers = [
      //first
      new Item(this, {
        src: "./images/killer.png",
        x: 0,
        y: 705,
        width: 90,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 160,
        y: 825,
        // y: 705,
        width: 90,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 10,
        y: 510,
        width: 300,
        height: 30,
      }).obj,
      // sec
      new Item(this, {
        src: "./images/killer.png",
        x: 580,
        y: window.innerHeight - 50,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 770,
        y: 760,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 960,
        y: window.innerHeight - 50,
        width: 50,
        height: 50,
      }).obj,
      //thrid
      new Item(this, {
        src: "./images/killer.png",
        x: 150,
        y: 400,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 0,
        y: 260,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 820,
        y: 260,
        width: 60,
        height: 190,
      }).obj,
      //forth
      new Item(this, {
        src: "./images/killer.png",
        x: 1360,
        y: 510,
        width: 100,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1490,
        y: 660,
        width: 100,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1360,
        y: 810,
        width: 100,
        height: 50,
      }).obj,
      //fifth
      new Item(this, {
        src: "./images/killer.png",
        x: 1820,
        y: 260,
        width: 110,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1650,
        y: 460,
        width: 100,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1820,
        y: 660,
        width: 100,
        height: 50,
      }).obj,
      //sixth
      new Item(this, {
        src: "./images/killer.png",
        x: 600,
        y: 0,
        width: 50,
        height: 100,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 800,
        y: 100,
        width: 50,
        height: 100,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1000,
        y: 0,
        width: 50,
        height: 100,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1200,
        y: 100,
        width: 50,
        height: 100,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1400,
        y: 0,
        width: 50,
        height: 100,
      }).obj,
    ];
    // 生成Sprite对象作为玩家
    this.sp = new Player(this, {
      src: "player",
      x: 0,
      y: 800,
      // x: 950,
      // y: 650,
      // x: 1700,
      // y: 860,
      vx: 0,
      vy: 0,
      speedx: 8,
      g: 7,
      speedy: -8,
    });
    this.displacement = [3];
    this.star1sign = true;
    this.star2sign = false;
    this.star3sign = false;
  };

  gameLoop = (delta) => {
    this.state(delta);
    b.hit(this.sp.obj, this.bricks, true);
  };

  play = (delta) => {
    this.sp.update(); // 针对玩家状态进行判定。
    if (this.sp.hitBorder(this.sp.obj) === "left") {
      this.sp.obj.x = 0;
    } else if (this.sp.hitBorder(this.sp.obj) === "right") {
      this.sp.obj.x = window.innerWidth - this.sp.obj.width;
    } else if (this.sp.hitBorder(this.sp.obj) === "top") {
      this.sp.obj.y = 0;
    } else if (this.sp.hitBorder(this.sp.obj) === "buttom") {
      this.state = this.end; // 解耦合应该写在Create.js中
    }
    this.key[0].visible = this.star1sign;
    this.key[1].visible = this.star2sign;
    this.key[2].visible = this.star3sign;
    b.hit(this.sp.obj, this.key[0], false, false, false, () => {
      this.star1sign = false;
      this.star2sign = true;
    });
    b.hit(this.sp.obj, this.key[1], false, false, false, () => {
      if (this.key[1].visible === true) {
        this.star2sign = false;
        this.star3sign = true;
      }
    });
    b.hit(this.sp.obj, this.key[2], false, false, false, () => {
      if (this.key[2].visible === true) this.state = this.succeed; // 碰到钥匙过关
    });

    b.hit(this.sp.obj, this.accelerateBricks, true, false, false, () => {
      this.sp.obj.speedy = 15; // 碰到加速砖块会飞
    });
    b.hit(this.sp.obj, this.decelerateBricks, true, false, false, () => {
      this.sp.obj.speedy = -this.sp.obj.g; // 碰到减速砖块不会飞
    });
    //killer1
    if (this.sp.obj.y <= 730) {
      this.killers[1].killer = true;
    }
    if (this.killers[1].killer && this.killers[1].y >= 710) {
      this.killers[1].y -= 12;
    }

    //移动砖块
    this.bricks[2].x += this.displacement[0];
    b.hit(
      this.bricks[2],
      [this.bricks[1], this.bricks[5]],
      true,
      false,
      false,
      () => {
        this.displacement[0] = 0 - this.displacement[0];
      }
    );
    //switch0
    b.hit(this.sp.obj, this.switchers[0], true, false, false, () => {
      this.killers[8].killer = true;
    });
    if (this.killers[8].killer && this.killers[8].x >= 560) {
      this.killers[8].x -= 3;
      if (this.killers[8].width <= 200) {
        this.killers[8].width += 3;
      }
    }
    if (this.killers[8].x <= 560 && this.killers[8].y <= 505) {
      this.killers[8].y += 5;
    }
    //killer6,7
    for (var i = 6; i <= 7; i++) {
      this.killers[i].x += 10;
    }
    if (this.killers[6].x >= 1540) {
      this.killers[6].x = 150;
    }
    if (this.killers[7].x >= 1390) {
      this.killers[7].x = 0;
    }
    //上方的五个killers
    if (this.sp.obj.y <= 200 && this.sp.obj.x <= 1450) {
      this.killers[19].killer = true;
    }
    if (this.killers[19].killer && this.killers[19].y <= 96) {
      this.killers[19].y += 6.8;
    }

    if (this.sp.obj.y <= 200 && this.sp.obj.x <= 1050) {
      this.killers[17].killer = true;
    }
    if (this.killers[17].killer && this.killers[17].y <= 96) {
      this.killers[17].y += 6.8;
    }

    if (this.sp.obj.y <= 200 && this.sp.obj.x <= 850) {
      this.killers[16].killer = true;
    }
    if (this.killers[16].killer && this.killers[16].y >= 4) {
      this.killers[16].y -= 6.8;
    }

    b.hit(this.sp.obj, this.killers, true, false, false, () => {
      this.state = this.end;
    }); // 碰到杀手死亡
  };

  end = (delta) => {
    this.app.ticker.stop();
    this.gameScene.visible = false;
    let message = new Text("被黑暗吞噬...\r\rPress R to replay");
    message.scale.set(3, 3);
    message.x = 200;
    message.y = 200;
    this.gameOverScene.addChild(this.backgroundsp);
    this.gameOverScene.addChild(message);
    this.gameOverScene.visible = true;
    window.addEventListener("keydown", this.bindRestartAfterEnd);
  };

  succeed = () => {
    this.app.ticker.stop();
    document.body.removeChild(this.app.view);
    $('body').append('<div style = "position:absolute;left: 450px;top: 200px;font-size: 80px;">恭喜你，成功拯救了这片天空！</div>');
    let str = '<div style = "position:absolute;left: 450px;top: 600px;font-size: 80px;">戳<span style="color:0xF4AFBE"><a href =' + "http://39.105.111.93:8080/demo8?txt=" + this.death + '>这里</a></span>，在天空留下你的足迹吧~</div>'
    $('body').append(str)
  };

  bindRestartAfterEnd = (e) => {
    if (e.key === "r") {
      document.body.removeChild(this.app.view);
      window.removeEventListener("keydown", this.bindRestartAfterEnd);
      let nextGame = new Create3(this.death + 1);
    }
  };

  bindRightAnimation = (e) => {
    if (e.key === "d") {
      this.sp.obj.playAnimation(this.sp.obj.states.walkRight);
    }
  };
  bindLeftAnimation = (e) => {
    if (e.key === "a") {
      this.sp.obj.playAnimation(this.sp.obj.states.walkLeft);
    }
  };
  unbindAnimation = (e) => {
    if (e.key === "d" || e.key === "a") {
      this.sp.obj.show(this.sp.obj.states.down);
    }
  };
  spriteAnimationPlay = (e) => {
    window.addEventListener("keydown", this.bindRightAnimation);
    window.addEventListener("keydown", this.bindLeftAnimation);
    window.addEventListener("keyup", this.unbindAnimation);
  };
}
