import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Proxy API calls về backend Frappe
app.use('/api', createProxyMiddleware({
  target: 'https://admin.sis.wellspring.edu.vn',
  changeOrigin: true,
  secure: true,
  cookieDomainRewrite: {
    'admin.sis.wellspring.edu.vn': 'parentportal.wellspring.edu.vn',
    '.admin.sis.wellspring.edu.vn': '.wellspring.edu.vn',
    '.wellspring.edu.vn': '.wellspring.edu.vn'
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'https://admin.sis.wellspring.edu.vn',
    'Referer': 'https://admin.sis.wellspring.edu.vn/',
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('🚀 Proxying API request:', req.method, req.url)
    proxyReq.setHeader('Origin', 'https://admin.sis.wellspring.edu.vn')
    proxyReq.setHeader('Referer', 'https://admin.sis.wellspring.edu.vn/')
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('✅ API response:', proxyRes.statusCode, req.url)
    
    // Xử lý cookies
    if (proxyRes.headers['set-cookie']) {
      const rewrittenCookies = proxyRes.headers['set-cookie'].map(cookie => {
        return cookie
          .replace(/Domain=admin\.sis\.wellspring\.edu\.vn/gi, 'Domain=parentportal.wellspring.edu.vn')
          .replace(/Domain=\.admin\.sis\.wellspring\.edu\.vn/gi, 'Domain=.wellspring.edu.vn')
          .replace(/Domain=\.wellspring\.edu\.vn/gi, 'Domain=.wellspring.edu.vn')
          .replace(/SameSite=None/gi, 'SameSite=Lax')
          .replace(/Path=\/[^;]*/gi, 'Path=/')
      })
      proxyRes.headers['set-cookie'] = rewrittenCookies
    }
    
    // Thêm CORS headers
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true'
    proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || 'https://parentportal.wellspring.edu.vn'
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message)
    res.status(500).json({ error: 'Proxy error', message: err.message })
  }
}))

// Proxy files, app, private routes
app.use(['/files', '/app', '/private'], createProxyMiddleware({
  target: 'https://admin.sis.wellspring.edu.vn',
  changeOrigin: true,
  secure: true,
}))

// Serve static files từ dist
app.use(express.static(path.join(__dirname, 'dist')))

// Fallback cho SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Production server running on port ${PORT}`)
  console.log(`📱 App available at: http://localhost:${PORT}`)
}) 