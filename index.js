import app from './src/app.js';
import Bun from 'bun';

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});
