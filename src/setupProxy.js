const {createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app) {
 app.use(createProxyMiddleware('/host', { 
     target: 'http://localhost:4000',
     pathRewrite: {
       '^/host': '',
     },
     changeOrigin: true,
     secure: false
   }));
}