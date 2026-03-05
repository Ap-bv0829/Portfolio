import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const sections = ['about', 'skills', 'projects', 'achievements', 'contact'];

// Extract the layout parts
const headMatch = html.match(/([\s\S]*?)<main class="container">/);
const footerMatch = html.match(/<\/main>([\s\S]*)/);

if (!headMatch || !footerMatch) {
  console.error("Could not find layout boundaries");
  process.exit(1);
}

let headTpl = headMatch[1] + '<main class="container">\n';
let footerTpl = '\n    </main>' + footerMatch[1];

// Update nav links in the templates
const linksToUpdate = [
  { from: 'href="#about"', to: 'href="about.html"' },
  { from: 'href="#skills"', to: 'href="skills.html"' },
  { from: 'href="#projects"', to: 'href="projects.html"' },
  { from: 'href="#achievements"', to: 'href="certs.html"' },
  { from: 'href="#contact"', to: 'href="contact.html"' },
  { from: 'href="#" class="logo"', to: 'href="index.html" class="logo"' },
  { from: 'href="#hero"', to: 'href="index.html"' }
];

linksToUpdate.forEach(link => {
  headTpl = headTpl.replace(new RegExp(link.from, 'g'), link.to);
  footerTpl = footerTpl.replace(new RegExp(link.from, 'g'), link.to);
});

// Function to extract a section
function extractSection(id) {
  const regex = new RegExp(`<!-- .*? Section -->\\s*<section id="${id}">[\\s\\S]*?</section>`);
  const match = html.match(regex);
  return match ? match[0] : '';
}

// Write the new pages
const pages = [
  { id: 'about', file: 'about.html' },
  { id: 'skills', file: 'skills.html' },
  { id: 'projects', file: 'projects.html' },
  { id: 'achievements', file: 'certs.html' },
  { id: 'contact', file: 'contact.html' }
];

pages.forEach(page => {
  const content = extractSection(page.id);
  if (content) {
    fs.writeFileSync(page.file, headTpl + '      ' + content + footerTpl);
    console.log(`Created ${page.file}`);
  }
});

// Now rewrite index.html with only the hero section, but keep the blog and affiliations on index or certs? 
// The plan said keep hero on index.
const heroContent = extractSection('hero');
fs.writeFileSync('index.html', headTpl + '      ' + heroContent + footerTpl);
console.log('Updated index.html');
