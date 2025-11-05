const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: '', //Your server address here
    port: ,//port number  here
    username: 'Admin',
    version: '1.17.1'
  });

  bot.on('spawn', () => {
    console.log('Bot "Admin" has spawned and connected successfully!');
    console.log('Starting anti-AFK movements...');
    
    // Random movement every 30-90 seconds
    setInterval(() => {
      const movements = ['forward', 'back', 'left', 'right'];
      const randomMove = movements[Math.floor(Math.random() * movements.length)];
      const duration = Math.random() * 2000 + 1000; // 1-3 seconds
      
      bot.setControlState(randomMove, true);
      
      setTimeout(() => {
        bot.setControlState(randomMove, false);
      }, duration);
      
      // Random jump sometimes
      if (Math.random() > 0.5) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
      
    }, Math.random() * 60000 + 30000); // Every 30-90 seconds
    
    // Random look direction every 5-10 seconds
    setInterval(() => {
      bot.look(
        Math.random() * Math.PI * 2, // yaw (0-360 degrees)
        (Math.random() - 0.5) * Math.PI / 2 // pitch (-45 to +45 degrees)
      );
    }, Math.random() * 5000 + 5000); // Every 5-10 seconds
    
    // Random sneak sometimes
    setInterval(() => {
      if (Math.random() > 0.7) {
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), Math.random() * 2000 + 500);
      }
    }, Math.random() * 40000 + 20000); // Every 20-60 seconds
  });

  bot.on('error', err => {
    console.log('Bot error:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected, auto-reconnecting...');
    setTimeout(startBot, 5000);
  });
}

startBot();
