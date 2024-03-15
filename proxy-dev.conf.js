module.exports = {
  "/api/*": {
    target: 'http://192.168.0.22:8888',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '/api': ''
    }
  },
};