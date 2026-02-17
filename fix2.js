const fs = require('fs');
['src/app/sample/page.tsx','src/app/brief/ai-code-assistants/page.tsx'].forEach(f => {
  let c = fs.readFileSync(f,'utf8');
  c = c.replaceAll('w-full font-bold py-3 px-4 rounded-md disabled', 'w-full font-bold py-3 px-4 rounded-full disabled');
  fs.writeFileSync(f, c);
});
console.log('done');
