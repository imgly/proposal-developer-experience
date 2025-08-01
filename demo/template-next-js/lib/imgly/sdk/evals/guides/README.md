# Developer Experience Evaluation Tool

This tool automates the evaluation of developer documentation guides using Claude.

## Usage

### Single URL Evaluation
```bash
./eval.sh [URL]
```

### Batch Evaluation
```bash
./eval_all.sh
```

Evaluates all URLs defined in `uuts.yaml`. Browser automation via Playwright is enabled by default.

## Features

- **Automatic Documentation Evaluation**: Claude follows the guide exactly as written and documents all issues
- **Time Tracking**: Measures Time to Interaction (TTI) and other metrics
- **Browser Automation**: Playwright integration for testing web-based guides
- **Structured Output**: Generates JSON reports and markdown documentation

## Prerequisites

- Python 3 with pip
- Claude CLI installed
- Node.js and npm (for Playwright support)

## Output Structure

The tool creates a directory structure based on the URL and generates:

```
/path/from/url/
├── claude.jsonl          # Raw Claude output
└── review/
    ├── original_guide.md  # Copy of original documentation
    ├── revised_guide.md   # Improved version
    ├── dx_report.json     # Structured metrics and issues
    ├── diligence.md       # Verification checklist
    └── issues.md          # Detailed friction log
```

## Playwright MCP Integration

The tool includes Playwright MCP integration by default, which:
1. Installs Playwright MCP server if needed
2. Uses the local mcp.json configuration
3. Enables browser automation capabilities

This allows Claude to:
- Navigate web pages
- Click buttons and fill forms
- Take screenshots
- Verify visual elements
- Test interactive demos

## Example

```bash
# Evaluate a single guide
./eval.sh "https://img.ly/docs/cesdk/js/get-started/download-using-npm/integrate-as-module-y2123e/"

# Evaluate all guides in uuts.yaml
./eval_all.sh
```

## Batch Evaluation

The `eval_all.sh` script:
- Reads URLs from `uuts.yaml`
- Runs eval.sh for each URL sequentially
- Creates timestamped results directory
- Generates a summary report with success/failure statistics
- Saves individual logs for each evaluation

### uuts.yaml Format

```yaml
- url: https://example.com/guide1
  name: "Guide 1 Name"
- url: https://example.com/guide2
  name: "Guide 2 Name"
```