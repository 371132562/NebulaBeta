根目录下vercel.json和/api/proxy.js这两个文件为vercel部署Serverless服务所需文件，跨域用

在/api/proxy.js中书写转发逻辑，类似webpack中的devServer
```js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  if (req.url.startsWith('/backend')) {
    target = 'http://backend-api.com'
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      '^/backend/': '/'
    }
  })(req, res)
}
```

在vercel.json中配置什么请求需要交由proxy.js处理（json中不能写注释，仅示例用）
```json
{
  "rewrites": [
    {
      // 访问路径匹配规则
      "source": "/backend/(.*)",
      // 重写请求的处理文件路径
      "destination": "/api/proxy"
    }
  ]
}
```
