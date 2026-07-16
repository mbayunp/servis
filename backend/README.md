# Backend Servis Cianjur

This is the backend for the Servis Cianjur application. Built with Node.js, Express, TypeScript, and MySQL.

## Teknologi

- Node.js & Express.js
- TypeScript
- MySQL & Sequelize ORM
- JWT & bcrypt
- CORS, Helmet, Morgan, Compression, Cookie-Parser

## Struktur Folder

\`\`\`
backend/
├── src/
│   ├── config/        # Konfigurasi aplikasi (Database, env, dll)
│   ├── controllers/   # Request handler logic
│   ├── middlewares/   # Express middlewares (auth, error, dll)
│   ├── migrations/    # Sequelize migrations
│   ├── models/        # Sequelize models
│   ├── repositories/  # Database queries (Data Access Layer)
│   ├── routes/        # Definisi rute Express
│   ├── seeders/       # Data awal untuk database
│   ├── services/      # Business logic
│   ├── types/         # TypeScript type definition
│   ├── uploads/       # Folder untuk menyimpan file upload
│   ├── utils/         # Utility function dan helper
│   ├── validators/    # Validasi input request
│   ├── app.ts         # Inisialisasi Express app
│   └── server.ts      # Server entry point
├── docs/              # Dokumentasi tambahan
├── .env.example       # Template env file
├── package.json       # Dependencies dan script npm
└── tsconfig.json      # Konfigurasi TypeScript
\`\`\`

## Cara Install

1. Pindah ke direktori \`backend\`:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## Cara Menjalankan

1. Copy file \`.env.example\` menjadi \`.env\` dan sesuaikan konfigurasinya:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
2. Pastikan database MySQL sudah berjalan dan sesuai dengan konfigurasi di \`.env\`.
3. Jalankan server pada mode development:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Akses API melalui \`http://localhost:5000/api\`

## Script NPM

- \`npm run dev\`: Menjalankan server development dengan nodemon
- \`npm run build\`: Melakukan compile TypeScript menjadi JavaScript ke folder \`dist\`
- \`npm start\`: Menjalankan server production
- \`npm run db:migrate\`: Menjalankan migrasi database
- \`npm run db:seed\`: Menjalankan seeder database
