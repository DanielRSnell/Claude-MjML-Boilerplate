const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');

const templatesDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'output');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all MJML files from templates directory
fs.readdir(templatesDir, (err, files) => {
  if (err) {
    console.error('Error reading templates directory:', err);
    return;
  }

  const mjmlFiles = files.filter(file => file.endsWith('.mjml'));

  if (mjmlFiles.length === 0) {
    console.log('No MJML templates found in templates directory');
    return;
  }

  mjmlFiles.forEach(file => {
    const mjmlPath = path.join(templatesDir, file);
    const mjmlContent = fs.readFileSync(mjmlPath, 'utf8');

    // Convert MJML to HTML
    const { html, errors } = mjml2html(mjmlContent);

    if (errors.length > 0) {
      console.error(`Errors in ${file}:`, errors);
    }

    // Write HTML output
    const outputFileName = file.replace('.mjml', '.html');
    const outputPath = path.join(outputDir, outputFileName);
    fs.writeFileSync(outputPath, html);

    console.log(`✓ Compiled ${file} → ${outputFileName}`);
  });

  console.log(`\nCompiled ${mjmlFiles.length} template(s) successfully!`);
});
