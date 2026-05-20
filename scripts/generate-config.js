const fs = require('fs');

const config = {
  apiUrl: process.env.API_URL || 'http://localhost:9000/vitality-api/v1',
};

fs.writeFileSync(
  'src/assets/config.json',
  JSON.stringify(config, null, 2)
);

console.log('Generated src/assets/config.json');
console.log('  apiUrl:', config.apiUrl);
