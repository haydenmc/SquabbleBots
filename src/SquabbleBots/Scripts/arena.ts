class Arena {
    public static instance: Arena;
    public stage: createjs.Stage;

    constructor() {
        Arena.instance = this;
        this.stage = new createjs.Stage(document.getElementById("Arena"));
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", () => {
            this.update();
        });

        // create a dummy bot just to test
        var bot = new Bot();
        this.stage.addChild(bot);
        bot.x = 200;
        bot.y = 100;
        bot.speed = 3;
    }

    public update() {
        this.stage.update();
    }
}

window.addEventListener("load", () => {
    new Arena();
});