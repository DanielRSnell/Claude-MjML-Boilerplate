const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');

const templatesDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'output');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// N8N Expression Mappings
const n8nReplacements = {
  'N8N_RESULTS_COUNT': '{{ $json.results.length }}',
  'N8N_CURRENT_DATE': "{{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}",
  'N8N_SIGNAL_BADGE': "{{ $json['Signal Type'][0]?.value === 'Issue' ? '<span class=\"badge-issue\">Issue</span>' : '<span class=\"badge-safety\">Safety</span>' }}",
  'N8N_SIGNAL_ID': '{{ $json.id }}',
  'N8N_SIGNAL_MESSAGE': '{{ $json.Message }}',
  'N8N_SENDER_NAME': '{{ $json.Sender[0]?.value || "Unknown" }}',
  'N8N_SENDER_PHONE': '{{ $json.From }}',
  'N8N_LOCATION': '{{ $json.City }}, {{ $json.State }}',
  'N8N_TIMESTAMP': "{{ new Date($json['Created on']).toLocaleString('en-US') }}",
  'N8N_MEDIA_SECTION': '{{ $json.Media && $json.Media.length > 0 ? `<img src="${$json.Media[0].url}" alt="${$json.Media[0].visible_name}" style="max-width: 100%; border-radius: 4px; margin-top: 10px;"><br><span style="font-size: 12px; color: #666;">📎 ${$json.Media[0].visible_name}</span>` : "" }}'
};

// Process N8N templates (files ending with -n8n.mjml)
fs.readdir(templatesDir, (err, files) => {
  if (err) {
    console.error('Error reading templates directory:', err);
    return;
  }

  const n8nFiles = files.filter(file => file.endsWith('-n8n.mjml'));

  if (n8nFiles.length === 0) {
    console.log('No N8N MJML templates found (files ending with -n8n.mjml)');
    return;
  }

  n8nFiles.forEach(file => {
    const mjmlPath = path.join(templatesDir, file);
    let mjmlContent = fs.readFileSync(mjmlPath, 'utf8');

    // Convert MJML to HTML
    const { html, errors } = mjml2html(mjmlContent);

    if (errors.length > 0) {
      console.error(`Errors in ${file}:`, errors);
    }

    // Replace placeholders with N8N expressions
    let finalHtml = html;
    Object.keys(n8nReplacements).forEach(placeholder => {
      const regex = new RegExp(placeholder, 'g');
      finalHtml = finalHtml.replace(regex, n8nReplacements[placeholder]);
    });

    // Write N8N-ready HTML output
    const outputFileName = file.replace('-n8n.mjml', '-n8n.html');
    const outputPath = path.join(outputDir, outputFileName);
    fs.writeFileSync(outputPath, finalHtml);

    console.log(`✓ Compiled ${file} → ${outputFileName} (N8N-ready)`);
  });

  console.log(`\nCompiled ${n8nFiles.length} N8N template(s) successfully!`);
  console.log('\nNote: Use the Loop Over Items node in N8N to iterate through $json.results');
  console.log('Each item in the loop will have access to the individual signal data.');
});
