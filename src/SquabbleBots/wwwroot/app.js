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
        this.hub = $.connection.arena;
        this.connected = false;
        this.bots = {};
        Arena.instance = this;
        this.stage = new createjs.Stage(document.getElementById("Arena"));
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", function () {
            _this.update();
        });
        // Initialize SignalR
        this.hub.client.updateBots = function (botList) { return _this.updateBots(botList); };
        $.connection.hub.start().done(function () {
            _this.connected = true;
        });
    }
    Arena.prototype.updateBots = function (botList) {
        for (var i = 0; i < botList.length; i++) {
            // Attempt to grab bot from the list
            var b = botList[i];
            // If not in the list, create a new bot instance
            if (this.bots[b.botId]) {
                var bot = this.bots[b.botId];
            }
            else {
                var bot = new Bot();
                bot.botId = b.botId;
                this.stage.addChild(bot);
                this.bots[bot.botId] = bot;
                console.log("Added new bot: " + b.botId);
            }
            // Update properties from server
            bot.x = b.x;
            bot.y = b.y;
            bot.speed = b.speed;
            bot.movementAngle = b.movementAngle;
            bot.aimAngle = b.aimAngle;
        }
    };
    Arena.prototype.update = function () {
        this.stage.update();
    };
    return Arena;
})();
window.addEventListener("load", function () {
    new Arena();
});
