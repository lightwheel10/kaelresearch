const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://127.0.0.1:18800/devtools/page/A06E783F351DCF0D4BFF8A2DFDCC2690');

ws.on('error', (e) => { console.error('ws error:', e.message); process.exit(1); });

ws.on('open', () => {
  console.log('connected');
  // Force reload first
  ws.send(JSON.stringify({id: 0, method: 'Page.reload', params: {ignoreCache: true}}));
  
  setTimeout(() => {
    console.log('taking screenshot...');
    ws.send(JSON.stringify({
      id: 1,
      method: 'Page.captureScreenshot',
      params: { format: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 1440, height: 4000, scale: 1 } }
    }));
  }, 5000);
});

ws.on('message', (d) => {
  const msg = JSON.parse(d);
  if (msg.id === 1) {
    if (msg.result && msg.result.data) {
      fs.writeFileSync('D:/openclaw/workspace/tmp/blog_full_v2.jpg', Buffer.from(msg.result.data, 'base64'));
      console.log('saved full screenshot');
    } else {
      console.log('screenshot failed:', JSON.stringify(msg));
    }
    ws.close();
  }
});

setTimeout(() => { console.log('timeout'); process.exit(0); }, 12000);
