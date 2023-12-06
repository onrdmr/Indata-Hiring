const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The path you want to proxy
    createProxyMiddleware({
      target: 'http://www.pythonchallenge.com/pc/def', // The target URL of the API server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the '/api1' prefix when forwarding the request
      },
    })
  );
  
  

};