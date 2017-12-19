var local = {
  "port": process.env.OPENSHIFT_NODEJS_PORT || 4000,
  "ip": process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  "mongooseUrl": "mongodb://localhost:27017/clevero",
  "saltRounds": 10,
  "jwtSecret": "myjwtHash"
};

module.exports = local;
