// Tiny helpers shared across routes.

// Wraps an async route handler so thrown errors hit the error middleware.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Throwable HTTP error with a status code.
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const badRequest = (msg) => new ApiError(400, msg);
export const unauthorized = (msg = 'Nuk je i autentikuar.') => new ApiError(401, msg);
export const forbidden = (msg = 'Nuk ke leje për këtë veprim.') => new ApiError(403, msg);
export const notFound = (msg = 'Nuk u gjet.') => new ApiError(404, msg);
export const conflict = (msg) => new ApiError(409, msg);
