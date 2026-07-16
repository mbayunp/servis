import env from './env.js';
import path from 'path';

export default {
  uploadPath: path.resolve(process.cwd(), env.UPLOAD_PATH),
};
