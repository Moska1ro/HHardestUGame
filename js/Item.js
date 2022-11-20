var Graphics = PIXI.Graphics;
var Sprite = PIXI.Sprite;
export class Item {
  constructor(root, info) {
    this.root = root;
    this.obj = new Sprite.from(info.src);
    this.obj.x = info.x;
    this.obj.y = info.y;
    this.obj.width = info.width;
    this.obj.height = info.height;
    this.root.gameScene.addChild(this.obj);
  }
}
