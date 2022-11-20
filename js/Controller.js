export class Controller {
    constructor(root) {
        this.root = root;
        this.pressedKeys = new Set();
        this.start();
    }
    start() {
        let outer = this;
        window.addEventListener("keydown", (e) => {
            outer.pressedKeys.add(e.key);
        });
        window.addEventListener("keyup", (e) => {
            outer.pressedKeys.delete(e.key);
        });
    }
}