module.exports = {
  "/api/*": {
    target: 'http://192.168.0.5:8888',
    secure: false,
    logLevel: 'debug'
  },
};