import { config } from '../config.js';

// 404 for unmatched routes.
export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Endpoint nuk u gjet.' });
}

// Central error handler. Knows about ApiError (has .status) and falls back to 500.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // Surface common MySQL errors as friendly 4xx where it helps.
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Ky rekord ekziston tashmë.' });
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'Skedari është shumë i madh.' });
  }

  if (status >= 500) {
    console.error('[error]', err);
  }

  res.status(status).json({
    error: status >= 500 && config.env === 'production' ? 'Gabim i brendshëm i serverit.' : err.message,
  });
}
