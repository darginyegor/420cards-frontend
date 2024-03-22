module.exports = {
  "/api/*": {
    target: 'http://192.168.0.02:8888',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '/api': ''
    }
  },
};