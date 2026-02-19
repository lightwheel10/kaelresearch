const WebSocket = require('ws');
const fs = require('fs');
const ws = new WebSocket('ws://127.0.0.1:18800/devtools/page/A06E783F351DCF0D4BFF8A2DFDCC2690');
ws.on('error', (e) => { console.error('err:', e.message); process.exit(1); });
ws.on('open', () => {
  ws.send(JSON.stringify({id: 1, method: 'Page.captureScreenshot', params: { format: 'jpeg', quality: 85 }}));
});
ws.on('message', (d) => {
  const msg = JSON.parse(d);
  if (msg.id === 1 && msg.result) {
    fs.writeFileSync('D:/openclaw/workspace/tmp/blog_v2.jpg', Buffer.from(msg.result.data, 'base64'));
    console.log('saved');
    ws.close();
    process.exit(0);
  }
});
setTimeout(() => process.exit(1), 8000);
