import env from './env.js';

export default {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
};
