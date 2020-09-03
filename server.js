// 服务端支持路由遮盖
const express = require('express')
const next = require('next')
const { parse } = require('url')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const config = require('./share/config/index');
const { createProxyMiddleware } = require('http-proxy-middleware');

console.log(process.env.NODE_ENV, '-----')

//默认port
let port = process.env.PORT || config.development.port;

app.prepare().then(() => {
  const server = express()
 
  const targetUrl = config[process.env.NODE_ENV].apiUrl;
 

  server.use('/drmAdmin', createProxyMiddleware({target: targetUrl, changeOrigin: true}));

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
        return app.render(req, res, '/about', query)
    } else {
        return handle(req, res, parsedUrl)
    }
    // return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://web.futureshop.dev-zt.bnq.com.cn:'+port)
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})