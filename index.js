import app from './src/app.js';

// For Vercel serverless functions
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  // eslint-disable-next-line no-undef
  Bun.serve({
    port,
    fetch: app.fetch,
  });
  console.log(`🚀 Server running on http://localhost:${port}`);
}
