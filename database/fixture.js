const crypto = require('crypto');
const sqlFixtures = require('sql-fixtures');
const levelData = require('./fixtureLevelData.json');

const dbConfig = {
  client: 'pg',
  connection: {
    host: process.env.RDS_HOSTNAME || 'localhost',
    user: 'jumpclub',
    password: process.env.RDS_PASSWORD || 'password',
    database: process.env.RDS_DB_NAME || 'jumpclub',
    port: process.env.RDS_PORT || 15432,
  },
};

function randomFromArray(a) {
  const index = Math.floor(Math.random() * a.length);
  return a[index];
}

function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

function getHash(obj) {
  return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');
}

const levels = [];

for (let i = 0; i < levelData.tileLayer.height; i += 1) {
  const currentLevel = JSON.parse(JSON.stringify(levelData));
  currentLevel.tileLayer.data[i] = ['me', 'me', 'me', 'me', 'me', 'me'];

  levels.push({
    hash: getHash(currentLevel),
    data: currentLevel,
    plays: i * 20,
    clears: i,
    createdAt: daysAgo(i + 1),
  });
}

const dataSpec = {
  levels,
};

sqlFixtures.create(dbConfig, dataSpec, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    Object.keys(result).forEach((key) => {
      console.log('added', result[key].length, key);
    });
  }
  sqlFixtures.destroy();
});
