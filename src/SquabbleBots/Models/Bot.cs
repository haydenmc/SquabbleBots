using System;

namespace SquabbleBots.Models
{
    public class Bot
    {
        public Guid BotId { get; set; }
        public string Name { get; set; }
        public int MovementAngle { get; set; }
        public int AimAngle { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int Speed { get; set; }

        public void Tick()
        {
            MovementAngle = (MovementAngle + 3) % 360;
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