var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bot = (function (_super) {
    __extends(Bot, _super);
    function Bot() {
        _super.call(this);
        this.movementAngle = 0;
        this.aimAngle = 0;
        this.speed = 0;
        // Set up the drawingz
        this.base = new createjs.Bitmap("img/tank_base.png");
        this.base.regX = 32;
        this.base.regY = 32;
        this.base.scaleX = Bot.SCALE_FACTOR;
        this.base.scaleY = Bot.SCALE_FACTOR;
        this.addChild(this.base);
        this.turret = new createjs.Bitmap("img/tank_turret.png");
        this.turret.regX = 32;
        this.turret.regY = 32;
        this.turret.scaleX = Bot.SCALE_FACTOR;
        this.turret.scaleY = Bot.SCALE_FACTOR;
        this.addChild(this.turret);
    }
    Bot.prototype._tick = function () {
        // Just an experiment
        this.movementAngle += 1;
        // Check to make sure direction / rotation doesn't exceed 180
        if (this.movementAngle >= 360) {
            this.movementAngle = 0;
        }
        if (this.aimAngle >= 360) {
            this.aimAngle = 0;
        }
        this.base.rotation = (this.movementAngle + 90) % 360;
        this.turret.rotation = (this.aimAngle + 90) % 360;
        // Move
        this.x += Math.cos((this.movementAngle * Math.PI) / 180) * this.speed;
        this.y += Math.sin((this.movementAngle * Math.PI) / 180) * this.speed;
    };
    Bot.SCALE_FACTOR = 1;
    return Bot;
})(createjs.Container);
var Arena = (function () {
    function Arena() {
        var _this = this;
        Arena.instance = this;
        this.stage = new createjs.Stage(document.getElementById("Arena"));
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", function () {
            _this.update();
        });
        // create a dummy bot just to test
        var bot = new Bot();
        this.stage.addChild(bot);
        bot.x = 200;
        bot.y = 100;
        bot.speed = 3;
    }
    Arena.prototype.update = function () {
        this.stage.update();
    };
    return Arena;
})();
window.addEventListener("load", function () {
    new Arena();
});
