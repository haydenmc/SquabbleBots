class Bot extends createjs.Container {
    private static SCALE_FACTOR: number = 1;
    private base: createjs.Bitmap;
    private turret: createjs.Bitmap;

    public botId: string;
    public movementAngle: number = 0;
    public aimAngle: number = 0;
    public speed: number = 0;
    
    constructor() {
        super();

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

    public _tick(): void {
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
    }
}