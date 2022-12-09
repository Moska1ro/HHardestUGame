import { Item } from "../Item.js";
import { Player } from "../Player.js";
import { Controller } from "../Controller.js";
import { CreateCommon2 } from "./CreateCommon2.js";
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

export class CreateCommon {
  constructor(death) {
    // 可以添加一个开始界面，点击按钮开始游戏；
    this.death = death;
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
        x: 1700,
        y: window.innerHeight - 79,
        width: 40,
        height: 40,
      }).obj,
    ];

    this.bricks = [
      //砖块
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: window.innerHeight - 80,
        width: 400,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 500,
        y: window.innerHeight - 80,
        width: 200,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 1000,
        y: window.innerHeight - 80,
        width: 400,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 1500,
        y: window.innerHeight - 80,
        width: 200,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: 600,
        width: 1100,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 1100,
        y: 660,
        width: 200,
        height: 20,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 400,
        y: 200,
        width: 1550,
        height: 80,
      }).obj,
    ];




    this.accelerateBricks = [
      new Item(this, {
        src: "./images/accelerateBrick.png",
        x: 400,
        y: window.innerHeight - 79,
        width: 100,
        height: 79,
      }).obj,
    ];

    this.switchers = [
      new Item(this, {
        src: "./images/switcher.png",
        x: 1100,
        y: 600,
        width: 200,
        height: 60,
      }).obj,
      new Item(this, {
        src: "./images/switcher.png",
        x: 200,
        y: 120,
        width: 200,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/switcher.png",
        x: 1800,
        y: 0,
        width: 50,
        height: 50,
      }).obj,
    ];


    this.killers = [
      new Item(this, {
        src: "./images/killer.png",
        x: 1700,
        y: window.innerHeight - 79,
        width: 220,
        height: 79,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1300,
        y: 600,
        width: 200,
        height: 80,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 0,
        y: 300,
        width: 80,
        height: 300,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1800,
        y: 0,
        width: 80,
        height: 180,
      }).obj,
    ];

    // 生成Sprite对象作为玩家
    this.sp = new Player(this, {
      src: "player",
      x: 0,
      y: 700,
      vx: 0,
      vy: 0,
      speedx: 8,
      g: 8,
      speedy: -8,
    });
    this.directionSpeed = [50, 0, 10, 3];// 可移动killer的速度，下标和killer对应
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
      this.state = this.end; // 解耦合应该写在CreateCommon.js中
    }

    b.hit(this.sp.obj, this.key, false, false, false, () => {
      this.state = this.succeed; // 碰到钥匙过关
    });

    b.hit(this.sp.obj, this.accelerateBricks, true, false, false, () => {
      this.sp.obj.speedy = 15; // 碰到加速砖块会飞
    });
    b.hit(this.sp.obj, this.killers, true, false, false, () => {
      this.state = this.end;
    });
    b.hit(this.sp.obj, this.switchers[0], true, false, false, () => {
      this.killers[2].killer = true;
    });
    b.hit(this.sp.obj, this.switchers[1], true, false, false, () => {
      this.killers[3].x -= this.directionSpeed[3];
    });
    if (this.killers[2].killer === true) {
      this.killers[2].x += this.directionSpeed[2];
    }
    if (this.killers[2].x >= 2200) {
      this.directionSpeed[2] = - this.directionSpeed[2];
    }
    if (this.killers[2].x <= -500) {
      this.directionSpeed[2] = - this.directionSpeed[2];
    }
    b.hit(this.sp.obj, this.switchers[2], true, false, false, () => {
      this.killers[0].x += this.directionSpeed[0];
    });
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
    let nextGame = new CreateCommon2(this.death);
  };

  bindRestartAfterEnd = (e) => {
    if (e.key === "r") {
      document.body.removeChild(this.app.view);
      window.removeEventListener("keydown", this.bindRestartAfterEnd);
      let nextGame = new CreateCommon(this.death + 1);
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
