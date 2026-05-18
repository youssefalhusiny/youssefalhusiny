const fs = require('fs');
let html = fs.readFileSync('gallery.html', 'utf8');

// Replace opening tag
html = html.replace(/<div class="museum-item">/g, '<a href="project.html" class="museum-item">');

// Replace closing tag
html = html.replace(/<\/span>\s*<\/div>/g, '</span>\n                </a>');

fs.writeFileSync('gallery.html', html);
console.log("Done");
