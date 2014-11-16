using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Threading.Tasks;

namespace SquabbleBots.Hubs
{
    [HubName("arena")]
    public class ArenaHub : Hub
    {
        public override Task OnConnected()
        {

            return base.OnConnected();
        }
    }
}