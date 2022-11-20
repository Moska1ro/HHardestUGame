let Texture = PIXI.Texture;
var b = new Bump(PIXI);
var su = new SpriteUtilities(PIXI);
let w, a, d;
export class Player {
  constructor(root, info) {
    this.root = root;

    let textures = su.filmstrip(info.src, 32, 48);
    this.obj = su.sprite(textures, info.x, info.y);
    this.obj.vx = info.vx;
    this.obj.vy = info.vy;
    this.obj.hp = info.hp;
    this.obj.speedx = info.speedx;
    this.obj.g = info.g; // gravity
    this.obj.speedy = info.speedy; // 向上跳起的速度
    this.obj.fps = 12;
    this.obj.states = {
      down: 0,
      left: 4,
      right: 8,
      up: 12,
      walkDown: [0, 3],
      walkLeft: [4, 7],
      walkRight: [8, 11],
      walkUp: [12, 15],
    };
    this.obj.scale.set(1.5, 1.3);
    this.controller = root.controller; // 依赖于根控制器逻辑
    this.root.gameScene.addChild(this.obj);
  }
  // 玩家动作控制

  updateControl = () => {
    w = this.controller.pressedKeys.has("w");
    a = this.controller.pressedKeys.has("a");
    d = this.controller.pressedKeys.has("d");
    this.obj.vy = this.obj.g;
    if (w) {
      this.obj.vy = -this.obj.speedy;
    }
    if (d) {
      if (!a) {
        this.obj.vx = this.obj.speedx;
      }
    }
    if (a) {
      if (!d) {
        this.obj.vx = -this.obj.speedx;
      }
    }
  };
  // 玩家动作逻辑
  updateMove = () => {
    this.obj.x += this.obj.vx;
    this.obj.y += this.obj.vy;
    this.obj.vx = 0;
    this.obj.vy = 0;
  };
  // 每一帧进行的判定
  update = () => {
    this.updateControl();
    this.updateMove();
  };
  hitBorder = (sp1) => {
    let pos = undefined;
    if (sp1.x < 0) {
      pos = "left";
    } else if (sp1.x + sp1.width > window.innerWidth) {
      pos = "right";
    } else if (sp1.y < 0) {
      pos = "top";
    } else if (sp1.y + sp1.height > window.innerHeight) {
      pos = "buttom";
    }
    return pos;
  };
}
