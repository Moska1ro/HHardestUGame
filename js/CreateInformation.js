import { Item } from "./Item.js";
import { Player } from "./Player.js";
import { Controller } from "./Controller.js";
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
const texture = Texture.from('./images/player.png');
Texture.addToCache(texture, 'player');
var su = new SpriteUtilities(PIXI);

export class CreateInformation {
    constructor() {
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
        this.app.renderer.backgroundColor = 0xFFFFFF;
        document.body.appendChild(this.app.view);
        this.state = this.play; // 开始游玩
        this.init(); // 初始化游戏地图及玩家角色
        this.spriteAnimationPlay();// 精灵动画
        this.app.ticker.add((delta) => this.gameLoop(delta)); // 循环动画渲染
    };

    init = () => {
        // 场景初始化
        this.gameScene = new Container(); // 游戏场景容器
        this.app.stage.addChild(this.gameScene);
        this.backgroundsp = new Sprite.from('./images/Clouds1.png');
        this.backgroundsp.x = 0;
        this.backgroundsp.y = 0;
        this.backgroundsp.width = window.innerWidth;
        this.backgroundsp.height = window.innerHeight;
        this.gameScene.addChild(this.backgroundsp);

        // 元素初始化
        this.controller = new Controller(this); // 传入控制器
        this.key = [
            new Item(this, {
                src: './images/star.png',
                x: window.innerWidth - 100,
                y: 0,
                width: 40,
                height: 40,
            }).obj,
        ];

        this.bricks = [
            //砖块
            new Item(this, {
                src: './images/brick.png',
                x: 0,
                y: window.innerHeight - 80,
                width: 400,
                height: 80,
            }).obj,
            new Item(this, {
                src: './images/brick.png',
                x: 700,
                y: window.innerHeight - 80,
                width: window.innerWidth - 700,
                height: 80,
            }).obj,
        ];
        this.developers = [
            new Item(this, {
                src: './images/developerInfo/ccEupho.jpg',
                x: 700,
                y: window.innerHeight - 80 - 200,
                width: 200,
                height: 200,
            }).obj,
            new Item(this, {
                src: './images/developerInfo/没嘴见人朽木君.jpg',
                x: 950,
                y: window.innerHeight - 80 - 200,
                width: 200,
                height: 200,
            }).obj,
            new Item(this, {
                src: './images/developerInfo/Boléro.jpg',
                x: 1200,
                y: window.innerHeight - 80 - 200,
                width: 200,
                height: 200,
            }).obj,
            new Item(this, {
                src: './images/developerInfo/五亿个小铃铛.jpg',
                x: 1450,
                y: window.innerHeight - 80 - 200,
                width: 200,
                height: 200,
            }).obj,
            new Item(this, {
                src: './images/developerInfo/王不会.jpg',
                x: 1700,
                y: window.innerHeight - 80 - 200,
                width: 200,
                height: 200,
            }).obj,
            new Item(this, {
                src: './images/developerInfo/Larghetto.png',
                x: 800,
                y: window.innerHeight - 80 - 600,
                width: 858.5,
                height: 256.7,
            }).obj,
        ];
        this.accelerateBricks = [
            new Item(this, {
                src: './images/accelerateBrick.png',
                x: 400,
                y: window.innerHeight - 79,
                width: 300,
                height: 79,
            }).obj,
        ];
        // 生成Sprite对象作为玩家
        this.sp = new Player(this, {
            src: 'player',
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            speedx: 8,
            g: 8,
            speedy: -8,
        });
        this.sp.obj.scale.set(3, 3);
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
            this.sp.obj.speedy = 15;// 碰到加速砖块会飞
        });

        b.hit(this.sp.obj, this.developers[0], true, true, false, () => {
            let message = su.text("ccEupho xu2954661568@gmail.com", '49px Futura', 'black', 50, 100);
            this.gameScene.addChild(message);
        });
        b.hit(this.sp.obj, this.developers[1], true, true, false, () => {
            let message = su.text("没嘴见人朽木君 271998864@qq.com", '49px Futura', 'black', 50, 180);
            this.gameScene.addChild(message);
        });
        b.hit(this.sp.obj, this.developers[2], true, true, false, () => {
            let message = su.text("Boléro 2423398379@qq.com", '49px Futura', 'black', 50, 260);
            this.gameScene.addChild(message);
        });
        b.hit(this.sp.obj, this.developers[3], true, true, false, () => {
            let message = su.text("五亿个小铃铛 3361225981@qq.com", '49px Futura', 'black', 50, 340);
            this.gameScene.addChild(message);
        });
        b.hit(this.sp.obj, this.developers[4], true, true, false, () => {
            let message = su.text("王不会 2407475450@qq.com", '49px Futura', 'black', 50, 420);
            this.gameScene.addChild(message);
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
        location.replace('./index.html');
    };

    bindRestartAfterEnd = (e) => {
        if (e.key === 'r') {
            document.body.removeChild(this.app.view);
            window.removeEventListener("keydown", this.bindRestartAfterEnd);
            let nextGame = new CreateInformation();
        }
    }
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