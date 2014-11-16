interface SignalR {
    arena: any;
}

class Arena {
    public static instance: Arena;
    public stage: createjs.Stage;
    private hub = $.connection.arena;
    private connected: boolean = false;
    private bots: { [botId: string]: Bot } = {};

    constructor() {
        Arena.instance = this;
        this.stage = new createjs.Stage(document.getElementById("Arena"));
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", () => {
            this.update();
        });

        // Initialize SignalR
        this.hub.client.updateBots = (botList: Array<Bot>) => this.updateBots(botList);

        $.connection.hub.start().done(() => {
            this.connected = true;
        });
    }

    private updateBots(botList: Array<Bot>) {
        for (var i = 0; i < botList.length; i++) {
            // Attempt to grab bot from the list
            var b = botList[i];

            // If not in the list, create a new bot instance
            if (this.bots[b.botId]) {
                var bot = this.bots[b.botId];
            } else {
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
    }

    public update() {
        this.stage.update();
    }
}

window.addEventListener("load", () => {
    new Arena();
});