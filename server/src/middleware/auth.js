import { verifyToken } from '../utils/jwt.js';
import { queryOne } from '../db.js';
import { unauthorized, forbidden } from '../utils/http.js';

// Attaches req.user ({ id, role, name, email, ... }) from a Bearer token.
// `required=false` lets a route work for both anonymous and logged-in users.
export function authenticate({ required = true } = {}) {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;

      if (!token) {
        if (required) return next(unauthorized());
        req.user = null;
        return next();
      }

      const payload = verifyToken(token);
      const user = await queryOne(
        'SELECT id, role, name, email, phone, area FROM users WHERE id = ?',
        [payload.sub],
      );
      if (!user) return next(unauthorized('Sesioni nuk është valid.'));

      req.user = user;
      next();
    } catch (err) {
      if (required) return next(unauthorized('Token i pavlefshëm ose i skaduar.'));
      req.user = null;
      next();
    }
  };
}

// Restricts a route to one or more roles. Use after authenticate().
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role)) return next(forbidden());
    next();
  };
}
