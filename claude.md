# Carl Project - AI Assistant Context

## Project Overview

Carl is an MJML email template builder designed to create N8N-ready email templates. The project enables you to design responsive HTML emails using MJML and integrate them seamlessly with N8N workflows using dynamic expressions.

## Key Capabilities

- Build responsive email templates using MJML
- Compile MJML to production-ready HTML
- Support N8N expression syntax (`{{ $json }}`) for dynamic content
- Test templates with example data before deployment

## Project Structure

- **`templates/`** - MJML source files
- **`data/`** - Example JSON data for testing
- **`output/`** - Compiled HTML files
- **`build.js`** - Compilation script

## Quick Reference

Build all templates:
```bash
npm run build
```

## Full Documentation

For complete instructions on using this project, see **[instructions.md](./instructions.md)**

## When Assisting with This Project

1. **Templates**: Create MJML files in `templates/` with N8N expressions
2. **Data Examples**: Add corresponding JSON examples in `data/`
3. **Testing**: Always build and verify output before deploying to N8N
4. **Syntax**: Use `{{ $json.fieldName }}` for N8N dynamic data

Refer to [instructions.md](./instructions.md) for detailed workflows, best practices, and troubleshooting.
