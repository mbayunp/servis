const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'src');

const files = {
  // Constants
  'shared/constants/httpStatus.ts': `export const HttpStatus = {\n  OK: 200,\n  CREATED: 201,\n  BAD_REQUEST: 400,\n  UNAUTHORIZED: 401,\n  FORBIDDEN: 403,\n  NOT_FOUND: 404,\n  INTERNAL_SERVER_ERROR: 500,\n} as const;\n`,
  'shared/constants/roles.ts': `export const Roles = {\n  ADMIN: 'ADMIN',\n  TECHNICIAN: 'TECHNICIAN',\n  CUSTOMER: 'CUSTOMER',\n} as const;\n`,
  'shared/constants/serviceStatus.ts': `export const ServiceStatus = {\n  PENDING: 'PENDING',\n  IN_PROGRESS: 'IN_PROGRESS',\n  COMPLETED: 'COMPLETED',\n  CANCELLED: 'CANCELLED',\n} as const;\n`,
  'shared/constants/bookingStatus.ts': `export const BookingStatus = {\n  WAITING_CONFIRMATION: 'WAITING_CONFIRMATION',\n  CONFIRMED: 'CONFIRMED',\n  IN_REPAIR: 'IN_REPAIR',\n  DONE: 'DONE',\n  CANCELLED: 'CANCELLED',\n} as const;\n`,
  'shared/constants/userStatus.ts': `export const UserStatus = {\n  ACTIVE: 'ACTIVE',\n  INACTIVE: 'INACTIVE',\n  SUSPENDED: 'SUSPENDED',\n} as const;\n`,
  
  // Helpers
  'shared/helpers/password.helper.ts': `import bcrypt from 'bcrypt';\n\nexport const hashPassword = async (password: string): Promise<string> => {\n  const salt = await bcrypt.genSalt(10);\n  return bcrypt.hash(password, salt);\n};\n\nexport const comparePassword = async (password: string, hash: string): Promise<boolean> => {\n  return bcrypt.compare(password, hash);\n};\n`,
  'shared/helpers/jwt.helper.ts': `import jwt from 'jsonwebtoken';\n\nexport const generateToken = (payload: object, secret: string, expiresIn: string | number) => {\n  return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });\n};\n\nexport const verifyToken = (token: string, secret: string) => {\n  return jwt.verify(token, secret);\n};\n`,
  'shared/helpers/file.helper.ts': `// File helper functions\nexport const getFileExtension = (filename: string) => {\n  return filename.split('.').pop();\n};\n`,
  
  // Database
  'shared/database/transaction.helper.ts': `import { Transaction } from 'sequelize';\nimport sequelize from '../../config/database.js';\n\nexport const runInTransaction = async <T>(callback: (t: Transaction) => Promise<T>): Promise<T> => {\n  const transaction = await sequelize.transaction();\n  try {\n    const result = await callback(transaction);\n    await transaction.commit();\n    return result;\n  } catch (error) {\n    await transaction.rollback();\n    throw error;\n  }\n};\n`,
  'shared/database/connection.helper.ts': `import sequelize from '../../config/database.js';\n\nexport const testConnection = async () => {\n  try {\n    await sequelize.authenticate();\n    console.log('Database connection has been established successfully.');\n  } catch (error) {\n    console.error('Unable to connect to the database:', error);\n  }\n};\n`,
  
  // Utils
  'utils/response.ts': `export interface ApiResponse<T = any> {\n  success: boolean;\n  message: string;\n  data?: T;\n  meta?: any;\n}\n\nexport const successResponse = <T>(message: string, data?: T, meta?: any): ApiResponse<T> => ({\n  success: true,\n  message,\n  data,\n  meta,\n});\n\nexport const errorResponse = (message: string, meta?: any): ApiResponse<any> => ({\n  success: false,\n  message,\n  meta,\n});\n`,
  'utils/pagination.ts': `export const getPaginationOptions = (page: number = 1, limit: number = 10) => {\n  const offset = (page - 1) * limit;\n  return { limit, offset };\n};\n`,
  'utils/date.ts': `import dayjs from 'dayjs';\n\nexport const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss') => {\n  return dayjs(date).format(format);\n};\n`,
  'utils/generateCode.ts': `import { v4 as uuidv4 } from 'uuid';\n\nexport const generateTrackingCode = () => {\n  return \`TRK-\${uuidv4().split('-')[0].toUpperCase()}\`;\n};\n`,
  'utils/formatter.ts': `export const formatRupiah = (amount: number) => {\n  return new Intl.NumberFormat('id-ID', {\n    style: 'currency',\n    currency: 'IDR',\n  }).format(amount);\n};\n`,
  
  // Types
  'types/api.ts': `export interface ApiRequestQuery {\n  page?: number;\n  limit?: number;\n  search?: string;\n  sortBy?: string;\n  sortOrder?: 'ASC' | 'DESC';\n}\n`,
  'types/auth.ts': `export interface JwtPayload {\n  id: string;\n  role: string;\n}\n`,
  'types/pagination.ts': `export interface PaginationMeta {\n  total: number;\n  page: number;\n  limit: number;\n  totalPages: number;\n}\n`,
  'types/common.ts': `export type Nullable<T> = T | null;\n`,
};

const dirs = [
  'utils', 'types',
];

dirs.forEach(dir => {
  const dirPath = path.join(src, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(src, filePath);
  const dirName = path.dirname(fullPath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  fs.writeFileSync(fullPath, content);
}
console.log('Boilerplate generated successfully.');
