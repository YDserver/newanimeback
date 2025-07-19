import app from './src/app.js';

// Export for Vercel (if needed)
export default app;

// For Render deployment
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
  // Production server for Render
  const { createServer } = await import('http');
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const request = new Request(url, {
        method: req.method,
        headers: req.headers,
      });

      const response = await app.fetch(request);
      const body = await response.text();

      // Copy headers
      for (const [key, value] of response.headers.entries()) {
        res.setHeader(key, value);
      }

      res.writeHead(response.status);
      res.end(body);
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}
