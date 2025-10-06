# Carl - MJML Email Template Builder

## Project Structure

```
/
├── data/          # Example JSON data for testing templates
├── templates/     # MJML email templates
├── output/        # Compiled HTML output
└── build.js       # Build script
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Your Template

Create a new `.mjml` file in the `templates/` folder. Use the example data in `data/` to understand the data structure you'll be working with.

### 3. Build Templates

Compile all MJML templates to HTML:

```bash
npm run build
```

This will process all `.mjml` files in `templates/` and output corresponding `.html` files in `output/`.

## Working with N8N

### Creating N8N-Ready Templates

When building templates for N8N, use the `$json` expression syntax to access dynamic data:

- **Access data**: `{{ $json.fieldName }}`
- **Loop through arrays**: `{{ $json.results.map((item) => `...`).join('') }}`
- **Conditional content**: `{{ condition ? 'value1' : 'value2' }}`
- **JavaScript expressions**: `{{ new Date().toLocaleDateString() }}`

### Example: Report Template

The `report.mjml` template shows how to:

1. Display dynamic counts: `{{ $json.results.length }}`
2. Loop through results: `{{ $json.results.map((signal) => ...) }}`
3. Access nested data: `{{ signal['Signal Type'][0]?.value }}`
4. Conditional rendering: `{{ signal.Media && signal.Media.length > 0 ? ... : '' }}`

### Using in N8N

1. Build your template: `npm run build`
2. Open the compiled HTML file in `output/`
3. Copy the HTML content
4. In N8N, use the "Send Email" node
5. Paste the HTML into the email body
6. The `{{ $json }}` expressions will automatically populate with your workflow data

## Data Format

Your N8N workflow should pass data in the same format as the examples in `data/`. The template expects:

- For `report.mjml`: An object with a `results` array containing signal items

## Best Practices

1. **Test Locally First**: Always create example data in `data/` that matches your N8N workflow output
2. **Build & Preview**: Compile and preview the HTML with example data before deploying to N8N
3. **Responsive Design**: MJML automatically creates mobile-responsive emails
4. **Use Components**: Leverage MJML components (`mj-section`, `mj-column`, `mj-text`, etc.) for consistent layout

## Template Customization

### Colors
Modify the color scheme by updating:
- Badge colors in `<mj-style>` section
- Background colors in `mj-section` attributes
- Border colors for signal type indicators

### Layout
- `mj-section`: Horizontal rows
- `mj-column`: Vertical columns within sections
- `mj-text`: Text content blocks
- `mj-image`: Images with automatic optimization
- `mj-button`: Call-to-action buttons

## Troubleshooting

### Templates Not Compiling
- Check MJML syntax errors in console output
- Ensure all MJML tags are properly closed
- Validate template structure with MJML documentation

### N8N Expressions Not Working
- Ensure you're using `{{ }}` for N8N expressions
- Verify data structure matches what template expects
- Test with example data from `data/` folder first

## Resources

- [MJML Documentation](https://mjml.io/documentation/)
- [N8N Expression Documentation](https://docs.n8n.io/code-examples/expressions/)
