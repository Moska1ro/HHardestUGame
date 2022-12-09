import { Item } from "../Item.js";
import { Player } from "../Player.js";
import { Controller } from "../Controller.js";
import { Create3 } from "./Create3.js";
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
let count = 0;

export class Create2 {
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
    this.backgroundsp = new Sprite.from("./images/Clouds7.png");
    this.backgroundsp.x = 0;
    this.backgroundsp.y = 0;
    this.backgroundsp.width = window.innerWidth;
    this.backgroundsp.height = window.innerHeight;
    this.gameScene.addChild(this.backgroundsp);
    let message = new Text("Lost:" + '\n' + this.death, {
      fill: 0xF5F5F5,
    });
    message.color = 'white';
    message.scale.set(3, 3);
    message.x = 20;
    message.y = 20;
    this.gameScene.addChild(message);
    // 元素初始化
    this.controller = new Controller(this); // 传入控制器
    this.key = [
      new Item(this, {
        src: "./images/star.png",
        x: 530,
        y: 40,
        width: 40,
        height: 40,
      }).obj,
      new Item(this, {
        src: "./images/star.png",
        x: 200,
        y: 135,
        width: 40,
        height: 40,
      }).obj,
    ];

    this.bricks = [
      //砖块
      new Item(this, {
        src: "./images/brick.png",
        x: 500,
        y: window.innerHeight - 120,
        width: 350,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: window.innerWidth - 130,
        y: window.innerHeight - 300,
        width: 80,
        height: 300,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 400,
        y: 500,
        width: 1300,
        height: 50,
      }).obj,
    ];
    this.accelerateBricks = [
      new Item(this, {
        src: "./images/accelerateBrick.png",
        x: 40,
        y: window.innerHeight - 80,
        width: 150,
        height: 50,
      }).obj,
      //测试用
      // new Item(this, {
      //   src: "./images/accelerateBrick.png",
      //   x: 500,
      //   y: 501,
      //   width: 100,
      //   height: 50,
      // }).obj,
    ];
    // this.decelerateBricks = [
    //   new Item(this, {
    //     src: "./images/decelerateBrick.png",
    //     x: 0,
    //     y: 0,
    //     width: 0,
    //     height: 0,
    //   }).obj,
    // ];
    this.switchers = [
      new Item(this, {
        src: "./images/switcher.png",
        x: 170,
        y: 180,
        width: 100,
        height: 50,
      }).obj,
    ];

    this.killers = [
      //星星周围
      new Item(this, {
        src: "./images/killer.png",
        x: 400,
        y: 0,
        width: 50,
        height: 500,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 650,
        y: 0,
        width: 50,
        height: 350,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 900,
        y: 150,
        width: 50,
        height: 350,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1150,
        y: 0,
        width: 50,
        height: 350,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1400,
        y: 150,
        width: 50,
        height: 350,
      }).obj,
      //index : 5
      new Item(this, {
        src: "./images/killer.png",
        x: 1650,
        y: 0,
        width: 50,
        height: 500,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 730,
        y: 450,
        width: 190,
        height: 50,
      }).obj,
      // 移动的砖块上方的killer index从7开始
      new Item(this, {
        src: "./images/killer.png",
        x: 530,
        y: 550,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 780,
        y: 630,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1030,
        y: 710,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1280,
        y: 790,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1530,
        y: 870,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 450,
        y: 550,
        width: 1200,
        height: 20,
      }).obj,
    ];
    // 生成Sprite对象作为玩家
    this.sp = new Player(this, {
      src: "player",
      x: window.innerWidth - 120,
      y: 80,
      //测试用
      // x: 500,
      // y: 400,
      vx: 0,
      vy: 0,
      speedx: 8,
      g: 8,
      speedy: -8,
    });

    this.displacement = [5, 5, 5, 5, 5, 5]; //元素的位移
    this.keysign = false; //第二颗星星状态
    this.killersign4 = false; //killer4
    this.killersign5 = false; //killer5
    this.killersign6 = false; //killer6
    this._killersign4 = false; //_killer4
    this._killersign6 = false; //_killer6
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
    this.key[1].visible = this.keysign;
    b.hit(this.sp.obj, this.key[0], false, false, false, () => {
      this.key[0].visible = false;
      this.keysign = true;
    });
    b.hit(this.sp.obj, this.key[1], false, false, false, () => {
      if (this.keysign) this.state = this.succeed; // 碰到钥匙过关
    });

    b.hit(this.sp.obj, this.accelerateBricks, true, false, false, () => {
      this.sp.obj.speedy = 12; // 碰到加速砖块会飞
    });

    // b.hit(this.sp.obj, this.decelerateBricks, true, false, false, () => {
    //   this.sp.obj.speedy = -this.sp.obj.g; // 碰到减速砖块不会飞
    // });
    //开门
    b.hit(this.sp.obj, this.switchers[0], true, false, false, () => {
      this.killers[5].killer = true;
    });
    if (this.killers[5].killer === true && this.killers[5].height >= 350) {
      this.killers[5].height -= 5;
    }

    //移动砖块
    this.bricks[0].x += this.displacement[0];
    b.hit(this.bricks[0], this.bricks[1], true, false, false, () => {
      this.displacement[0] = -5;
    });
    b.hit(this.bricks[0], this.accelerateBricks[0], true, false, false, () => {
      this.displacement[0] = 5;
    });

    //移动砖块上方killer的移动
    for (var i = 7; i <= 11; i++) {
      this.killers[i].y += this.displacement[i - 6];
      if (this.killers[i].y >= window.innerHeight - 50)
        this.displacement[i - 6] = -5;
      if (this.killers[i].y <= 550) this.displacement[i - 6] = 5;
    }
    //中间区域killer状态
    //第二颗星星不显示时
    if (this.key[1].visible === false) {
      //4
      if (this.sp.obj.x <= 1450 && this.sp.obj.y <= 150) {
        this.killersign4 = true;
      }
      if (this.killersign4 && this.killers[4].y >= 10) {
        this.killers[4].y -= 15;
      }
      //5
      if (this.sp.obj.x <= 1250 && this.sp.obj.y <= 150) {
        this.killersign5 = true;
      }
      if (this.killersign5 && this.killers[5].x >= -100) {
        this.killers[5].x -= 15;
      }
      //6
      if (
        this.sp.obj.x <= 900 &&
        this.sp.obj.x >= 450 &&
        this.sp.obj.y >= 230 &&
        this.sp.obj.y <= 500
      ) {
        this.killersign6 = true;
      }
      this.killers[6].visible = this.killersign6;
    } else {
      if (this.sp.obj.x >= 1350) {
        this._killersign4 = true;
      }
      if (this._killersign4 && this.killers[4].y <= 140) {
        this.killers[4].y += 15;
      }
      if (this.sp.obj.x >= 950 && this.sp.obj.y >= 400) {
        this._killersign6 = true;
      }
      if (this._killersign6) {
        this.killers[6].x += 20;
      }
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
    let nextGame = new Create3(this.death);
  };

  bindRestartAfterEnd = (e) => {
    if (e.key === "r") {
      document.body.removeChild(this.app.view);
      window.removeEventListener("keydown", this.bindRestartAfterEnd);
      let nextGame = new Create2(this.death + 1);
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
