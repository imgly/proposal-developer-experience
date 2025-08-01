#!/bin/bash

URL=${1:-"https://img.ly/docs/cesdk/js/get-started/download-using-npm/integrate-as-module-y2123e/"}

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if jinja2-cli is installed
if ! python3 -c "import jinja2" &> /dev/null; then
    echo "jinja2 is not installed. Installing..."
    if command -v pip3 &> /dev/null; then
        pip3 install jinja2
    elif command -v pip &> /dev/null; then
        pip install jinja2
    else
        echo "Error: pip not found. Please install Python and pip first."
        exit 1
    fi
fi

# Set up MCP servers with Playwright
echo "Setting up Playwright MCP server..."

# Check if playwright is installed
if ! command -v npx &> /dev/null; then
    echo "Error: npx not found. Please install Node.js first."
    exit 1
fi

# Install playwright MCP if not already installed
if ! npm list -g @playwright/mcp &> /dev/null; then
    echo "Installing Playwright MCP server..."
    npm install -g @playwright/mcp
    npx playwright install chromium
fi

MCP_CONFIG="--mcp-config $SCRIPT_DIR/mcp.json"
echo "Playwright MCP server configured"

# Generate prompt from template using Python directly
PROMPT=$(python3 -c "
import jinja2
import sys

with open('$SCRIPT_DIR/prompt.tpl', 'r') as f:
    template = jinja2.Template(f.read())

print(template.render(url='$URL'))
")

# Stream to file and format for console
PERMISSIONS="--dangerously-skip-permissions"
# Alternative with specific permissions:
# PERMISSIONS="--permission-mode acceptEdits --allowedTools \"Write(*)\" \"Bash(*)\""

# Display the prompt first
echo "Starting Claude evaluation for: $URL"
echo "Browser automation enabled via Playwright MCP"
echo "Working directory: $PWD"

# Output file in current directory
OUTPUT_FILE="claude.jsonl"

echo "Output will be saved to: $PWD/$OUTPUT_FILE"
echo "---"

# Run claude and save output
claude "$PROMPT" $PERMISSIONS $MCP_CONFIG --output-format stream-json --verbose | tee "$OUTPUT_FILE" | jq .