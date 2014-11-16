using Jint;
using System;

namespace SquabbleBots.Models
{
    public class Bot
    {
        public Guid BotId { get; set; }
        public string Name { get; set; } = "Robot";
        public int MovementAngle { get; set; } = 0;
        public int AimAngle { get; set; } = 0;
        public double X { get; set; } = 0;
        public double Y { get; set; } = 0;
        public int Speed { get; set; } = 0;
        public string UpdateScriptJs { get; set; } = "";

        public void Tick()
        {
            // Execute javascript
            var botRemote = new BotRemoteJs(this);
            var jsEngine = new Engine().SetValue("robot", botRemote)
                .Execute(UpdateScriptJs);

            // Process movement
            X += Math.Cos((MovementAngle * Math.PI) / 180) * Speed;
            Y += Math.Sin((MovementAngle * Math.PI) / 180) * Speed;
        }

        public BotViewModel ToViewModel()
        {
            return new BotViewModel()
            {
                botId = BotId,
                movementAngle = MovementAngle,
                aimAngle = AimAngle,
                speed = Speed,
                x = X,
                y = Y
            };
        }
    }

    public class BotRemoteJs
    {
        private readonly Bot Robot;
        public BotRemoteJs(Bot robot)
        {
            Robot = robot;
        }

        public int speed {
            get
            {
                return Robot.Speed;
            }
            set
            {
                Robot.Speed = value;
            }
        }

        public int movementAngle
        {
            get
            {
                return Robot.MovementAngle;
            }
            set
            {
                Robot.MovementAngle = value % 360;
            }
        }

        public int aimAngle
        {
            get
            {
                return Robot.AimAngle;
            }
            set
            {
                Robot.AimAngle = value % 360;
            }
        }
    }

    public class BotViewModel
    {
        public Guid botId { get; set; }
        public int movementAngle { get; set; }
        public int aimAngle { get; set; }
        public int speed { get; set; }
        public double x { get; set; }
        public double y { get; set; }
    }
}