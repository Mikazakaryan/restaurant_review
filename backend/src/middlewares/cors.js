const cors = require('cors');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
};

module.exports = cors(corsOptions);
