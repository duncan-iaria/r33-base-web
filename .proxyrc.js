const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = function (app) {
  app.use((req, res, next) => {
    const ext = path.extname(req.url);
    console.log({ ext, req: req.url });
    if (ext === '.gz') {
      console.log(true, { ext });
      res.setHeader('Content-Encoding', 'gzip');

      // } else if (ext.contains('wasm')) {
      //   res.setHeader('Content-Type', 'application/wasm');
    } else {
      // console.log('false');
    }
    next();
  });
};
