using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.DependencyInjection.Fallback;
using Microsoft.Framework.Runtime.Infrastructure;
using SquabbleBots.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace SquabbleBots.Hubs
{
    [HubName("arena")]
    public class ArenaHub : Hub
    {
        private ISimulator _simulator;
        public ArenaHub(ISimulator simulator)
        {
            _simulator = simulator;
        }
        public override Task OnConnected()
        {
            return base.OnConnected();
        }
    }

    public interface ISimulator
    {
        void Update(Bot bot);
    }

    public class ArenaSimulator : ISimulator
    {
        // We're going to broadcast to all clients a maximum of 30 times per second
        private readonly TimeSpan TickInterval =
            TimeSpan.FromMilliseconds(16.67); // 60 fps
        private readonly TimeSpan BroadcastInterval =
            TimeSpan.FromMilliseconds(33.33); // 30 fps
        private Timer _tickLoop;
        private Timer _broadcastLoop;
        private IConnectionManager _connectionManager;
        private List<Bot> _bots;
        public ArenaSimulator(IConnectionManager connectionManager)
        {
            _connectionManager = connectionManager;
            // Start the update loop
            _tickLoop = new Timer(
               Tick,
               null,
               TickInterval,
               TickInterval);
            // Start the broadcast loop
            _broadcastLoop = new Timer(
                Broadcast,
                null,
                BroadcastInterval,
                BroadcastInterval);

            // Initialize bots list
            _bots = new List<Bot>();

            // Add a test bot
            _bots.Add(new Bot()
            {
                BotId = Guid.NewGuid(),
                X = 120,
                Y = 200,
                Speed = 3
            });
        }

        public void Update(Bot bot)
        {

        }

        private void Tick(object state)
        {
            // Tick all of the bots
            foreach (var bot in _bots)
            {
                bot.Tick();
            }
        }

        private void Broadcast(object state)
        {
            var hubContext = _connectionManager.GetHubContext<ArenaHub>();
            hubContext.Clients.All.updateBots(_bots.Select(b => b.ToViewModel()));
        }
    }
}