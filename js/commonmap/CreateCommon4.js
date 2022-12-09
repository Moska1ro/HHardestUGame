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

export class CreateCommon4 {
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
        this.gameScene = new Container(); // 游戏场景容器
        this.gameOverScene = new Container(); // 游戏结束界面容器
        this.gameOverScene.visible = false; // 一开始没有Game over时，结束界面不可见
        this.app.stage.addChild(this.gameScene);
        this.app.stage.addChild(this.gameOverScene);
        this.backgroundsp = new Sprite.from("./images/Clouds6.png");
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
        message.y = 140;
        this.gameScene.addChild(message);


        // 元素初始化
        this.controller = new Controller(this); // 传入控制器
        this.key = [
            //过关星星或者钥匙
            new Item(this, {
                src: "./images/star.png",
                x: 70,
                y: 40,
                width: 40,
                height: 40,
            }).obj,
        ];

        this.bricks = [
            //砖块
            new Item(this, {
                src: "./images/brick.png",
                x: 50,
                y: 850,
                width: 150,
                height: 600,
            }).obj,
            new Item(this, {
                src: "./images/brick.png",
                x: 450,
                y: 850,
                width: 150,
                height: 600,
            }).obj,
            new Item(this, {
                src: "./images/brick.png",
                x: 850,
                y: 850,
                width: 150,
                height: 600,
            }).obj,
            new Item(this, {
                src: "./images/brick.png",
                x: 1250,
                y: 850,
                width: 150,
                height: 600,
            }).obj,
            new Item(this, {
                src: "./images/brick.png",
                x: 1650,
                y: 850,
                width: 150,
                height: 600,
            }).obj,
        ];


        this.smallKillerSpeed = [0.5, 0.2, 10, 10, 10, 10];

        this.accelerateBricks = [
            new Item(this, {
                src: "./images/accelerateBrick.png",
                x: 55,
                y: 800,
                width: 145,
                height: 50,
            }).obj,
        ];

        this.switchers = [
            new Item(this, {
                src: "./images/switcher.png",
                x: 455,
                y: 800,
                width: 145,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/switcher.png",
                x: 855,
                y: 800,
                width: 145,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/switcher.png",
                x: 1255,
                y: 800,
                width: 145,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/switcher.png",
                x: 1655,
                y: 800,
                width: 145,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/switcher.png",
                x: 1830,
                y: 100,
                width: 50,
                height: 50,
            }).obj,
        ]
        this.killers = [
            new Item(this, {
                src: "./images/killer.png",
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: 100,
            }).obj,


            new Item(this, {
                src: "./images/black.png",
                x: 50,
                y: 100,
                width: 150,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/black.png",
                x: 450,
                y: 100,
                width: 150,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/black.png",
                x: 850,
                y: 100,
                width: 150,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/black.png",
                x: 1250,
                y: 100,
                width: 150,
                height: 50,
            }).obj,
            new Item(this, {
                src: "./images/black.png",
                x: 1650,
                y: 100,
                width: 150,
                height: 50,
            }).obj,
        ];

        // 引用Sprite对象
        this.sp = new Player(this, {
            src: "player",
            x: 70,
            y: 600,
            vx: 0,
            vy: 0,
            speedx: 8,
            g: 8,
            speedy: -8,
        });
        this.sp.obj.scale.set(1, 1);

        this.flag = [];
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
        this.killers[1].height += this.smallKillerSpeed[1];
        b.hit(this.sp.obj, this.key, false, false, false, () => {
            this.state = this.succeed; // 碰到钥匙过关
        });
        b.hit(this.sp.obj, this.accelerateBricks, true, false, false, () => {
            this.sp.obj.speedy = 8; // 碰到加速砖块会飞
        });
        b.hit(this.sp.obj, this.switchers[0], true, false, false, () => {
            this.flag[0] = true;
            this.killers[2].killer = true;
        });
        b.hit(this.sp.obj, this.switchers[1], true, false, false, () => {
            this.flag[1] = true;
            this.killers[3].killer = true;
        });
        b.hit(this.sp.obj, this.switchers[2], true, false, false, () => {
            this.flag[2] = true;
            this.killers[4].killer = true;
        });
        b.hit(this.sp.obj, this.switchers[3], true, false, false, () => {
            this.flag[3] = true;
            this.killers[5].killer = true;
        });

        b.hit(this.sp.obj, this.killers, true, false, false, () => {
            this.state = this.end;
        });
        for (let i = 2; i <= 5; i++) {
            if (this.killers[i].killer === true) {
                this.killers[i].height += this.smallKillerSpeed[i];
                if (this.killers[i].height >= 900) {
                    this.smallKillerSpeed[i] *= (-1);
                }
                if (this.killers[i].height <= 20) {
                    this.smallKillerSpeed[i] *= (-1);
                }
            }
        }
        if (this.killers[0].killer === true) {
            for (let i = 1; i <= 5; i++) {
                this.killers[i].y += this.smallKillerSpeed[0];
            }
            this.killers[0].height += this.smallKillerSpeed[0];
            if (this.killers[0].height >= 600) {
                this.smallKillerSpeed[0] *= (-1);
            }
        }
        if (this.flag[3] === true) {
            for (let i = 2; i <= 5; i++) {
                this.bricks[i - 1].y += 3;
            }
            for (let i = 0; i < 4; i++) {
                this.switchers[i].y += 3;
            }
            b.hit(this.sp.obj, this.switchers[4], true, false, false, () => {
                this.switchers[4].y += 9;
                this.killers[0].killer = true;
            });
        }
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
        $('body').append('<div style = "position:absolute;left: 450px;top: 350px;font-size: 80px;">恭喜你，成功拯救了这片天空！</div>');
    };

    bindRestartAfterEnd = (e) => {
        if (e.key === "r") {
            document.body.removeChild(this.app.view);
            window.removeEventListener("keydown", this.bindRestartAfterEnd);
            let nextGame = new CreateCommon4(this.death + 1);
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
