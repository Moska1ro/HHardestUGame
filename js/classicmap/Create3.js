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
let displacement = [5, 5, 5, 5, 7, 7, 7];

export class Create3 {
  constructor(death) {
    this.death = death;// 可以添加一个开始界面，点击按钮开始游戏；
    this.setup(); // 开始游戏
  }
  setup = () => {
    // window.innerHeight = 960;
    // window.innerWidth = 1920;
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
    this.backgroundsp = new Sprite.from("./images/Clouds3.png");
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
        x: window.innerWidth - 175,
        y: window.innerHeight - 140,
        width: 40,
        height: 40,
      }).obj,
    ];

    this.bricks = [
      //砖块
      new Item(this, {
        src: "./images/brick.png",
        x: 250,
        y: window.innerHeight - 50,
        width: 1270,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 1520,
        y: 100,
        width: 80,
        height: window.innerHeight - 100,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: window.innerHeight - 50 - 180 - 50,
        width: 1250,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 250,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50,
        width: 1270,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 0,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 120 - 60,
        width: 700,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 700,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 120 - 22,
        width: 100,
        height: 12,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 800,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 120 - 60,
        width: 400,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/brick.png",
        x: 250,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 120 - 50 - 130 - 50,
        width: 1270,
        height: 50,
      }).obj,
    ];
    this.accelerateBricks = [
      new Item(this, {
        src: "./images/accelerateBrick.png",
        x: 470,
        y: window.innerHeight - 50,
        width: 100,
        height: 50,
      }).obj,
    ];
    // this.decelerateBricks = [
    //   new Item(this, {
    //     src: "../images/decelerateBrick.png",
    //     x: 1150,
    //     y: window.innerHeight - 500 - 450,
    //     width: 80,
    //     height: 20,
    //   }).obj,
    // ];
    this.switchers = [
      new Item(this, {
        src: "./images/switcher.png",
        x: 700,
        y: window.innerHeight - 50,
        width: 100,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/switcher.png",
        x: 700,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 120 - 59,
        width: 100,
        height: 37,
      }).obj,
    ];

    this.killers = [
      new Item(this, {
        src: "./images/killer.png",
        x: 1150,
        y: window.innerHeight - 50 - 180,
        width: 50,
        // height: 180,
        height: 0,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 350,
        y: window.innerHeight - 50 - 180 - 50 - 45,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 550,
        y: window.innerHeight - 50 - 180 - 50 - 90,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 750,
        y: window.innerHeight - 50 - 180 - 50 - 135,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 950,
        y: window.innerHeight - 50 - 180 - 50 - 180,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1350,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 40,
        width: 30,
        height: 30,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1490,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 130,
        width: 30,
        height: 30,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 1350,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 130,
        width: 170,
        height: 130,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: 250,
        y: window.innerHeight - 50 - 180 - 50 - 180 - 50 - 120 - 50 - 130,
        width: 70,
        height: 120,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: window.innerWidth - 320,
        y: 300,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: window.innerWidth - 220,
        y: 500,
        width: 50,
        height: 50,
      }).obj,
      new Item(this, {
        src: "./images/killer.png",
        x: window.innerWidth - 120,
        y: 700,
        width: 50,
        height: 50,
      }).obj,
    ];
    // 生成Sprite对象作为玩家
    this.sp = new Player(this, {
      src: "player",
      x: 900,
      y: window.innerHeight - 200,
      // star for debug
      // x: window.innerWidth - 175,
      // y: window.innerHeight - 140,
      vx: 0,
      vy: 0,
      speedx: 8,
      g: 8,
      speedy: -8,
    });
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

    b.hit(this.sp.obj, this.key, false, false, false, () => {
      this.state = this.succeed; // 碰到钥匙过关
    });

    b.hit(this.sp.obj, this.accelerateBricks, true, false, false, () => {
      this.sp.obj.speedy = 15; // 碰到加速砖块会飞
    });

    // b.hit(this.sp.obj, this.decelerateBricks, true, false, false, () => {
    //   this.sp.obj.speedy = -this.sp.obj.g; // 碰到减速砖块不会飞
    // });

    b.hit(this.sp.obj, this.switchers[0], true, false, false, () => {
      this.killers[0].killer = true; // 碰到开关触发杀手开始追踪
    });
    if (this.killers[0].killer === true && this.killers[0].height < 180) {
      this.killers[0].height += 0.9;
    }
    b.hit(this.sp.obj, this.switchers[1], true, false, false, () => {
      this.killers[8].killer = true;
    });
    if (this.killers[8].killer === true && this.killers[8].x <= 1440) {
      this.killers[8].x += 10;
    }
    if (
      this.killers[0].height >= 180 &&
      this.sp.obj.y >= window.innerHeight - 50 - 180 - 50
    ) {
      this.killers[0].x -= 40;
      this.killers[0].width += 80;
    }
    if (
      this.sp.obj.x <= 350 &&
      this.sp.obj.y <= window.innerHeight - 50 - 180 - 50 &&
      this.bricks[2].width >= 1000
    ) {
      this.bricks[2].x += 50;
      this.bricks[2].width -= 50;
    }
    for (var i = 1; i <= 4; i++) {
      this.killers[i].y += displacement[i - 1];
      b.hit(this.killers[i], this.bricks[3], true, false, false, () => {
        displacement[i - 1] = 5;
      });
      b.hit(this.killers[i], this.bricks[2], true, false, false, () => {
        displacement[i - 1] = -5;
      });
    }
    if (this.killers[6].x < 40) {
      this.killers[6].x = 1490;
    }
    if (this.killers[5].x < -30) {
      this.killers[5].x = 1420;
    }
    for (var i = 5; i <= 6; i++) {
      this.killers[i].x -= 5;
    }
    for (var i = 9; i <= 11; i++) {
      this.killers[i].x += displacement[i - 5];
      b.hit(this.killers[i], this.bricks[1], true, false, false, () => {
        displacement[i - 5] = 3;
      });
      if (this.killers[i].x >= window.innerWidth - 50) {
        displacement[i - 5] = -3;
      }
    }
    b.hit(this.sp.obj, this.killers, true, false, false, () => {
      this.state = this.end;
    }); // 碰到杀手死亡
  };

  end = (delta) => {
    this.app.ticker.stop();
    this.gameScene.visible = false;
    let message = new Text("被黑暗吞噬...\r\rPress R to replay", {
      fill: 0xF5F5F5,
    });
    message.color = 'white';
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
