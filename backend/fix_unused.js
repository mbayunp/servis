import fs from 'fs';
import path from 'path';

const controllersDir = path.join(process.cwd(), 'src/controllers');
const files = fs.readdirSync(controllersDir);

files.forEach(file => {
  if (file.endsWith('.controller.ts')) {
    const filePath = path.join(controllersDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace 'getAll = async (req: Request' with '_req: Request'
    content = content.replace(/getAll = async \(req: Request/g, 'getAll = async (_req: Request');
    // Replace tracking 'getTracking = async (req: Request'
    content = content.replace(/getTracking = async \(req: Request/g, 'getTracking = async (_req: Request');
    
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log('Unused req in controllers fixed.');
