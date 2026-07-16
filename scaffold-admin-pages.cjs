const fs = require('fs');
const path = require('path');
const pages = ['booking', 'customer', 'technician', 'tracking', 'finance', 'article', 'gallery', 'testimonial', 'settings'];

pages.forEach(page => {
  const dir = path.join('frontend', 'app', 'admin', page);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), `export default function ${page.charAt(0).toUpperCase() + page.slice(1)}Page() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">${page.charAt(0).toUpperCase() + page.slice(1)} Management</h1>
      <p className="text-gray-500">This module is currently under development.</p>
    </div>
  );
}
`);
});
console.log('Admin pages scaffolded');
