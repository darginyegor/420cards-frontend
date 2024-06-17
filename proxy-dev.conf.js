module.exports = {
  "/api/*": {
    target: 'http://192.168.0.4:8888',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '/api': ''
    }
  },
};