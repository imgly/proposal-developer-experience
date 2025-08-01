#!/bin/bash

# Accept YAML file as parameter, default to uuts.yaml
YAML_FILE=${1:-"uuts.yaml"}

echo "Starting evaluation of all URLs in $YAML_FILE"
echo "=========================================="

# Check if yq is installed
if ! command -v yq &> /dev/null; then
    echo "Error: yq is not installed."
    echo ""
    echo "Please install yq using one of the following methods:"
    echo ""
    echo "On macOS:"
    echo "  brew install yq"
    echo ""
    echo "On Linux:"
    echo "  wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/bin/yq"
    echo "  chmod +x /usr/bin/yq"
    echo ""
    echo "Or visit: https://github.com/mikefarah/yq#install"
    exit 1
fi

# Check if YAML file exists
if [[ ! -f "$YAML_FILE" ]]; then
    echo "Error: YAML file '$YAML_FILE' not found!"
    echo ""
    echo "Usage: $0 [yaml_file]"
    echo "  yaml_file: Path to YAML file containing URLs (default: uuts.yaml)"
    echo ""
    echo "Available YAML files in current directory:"
    ls -1 *.yaml 2>/dev/null || echo "  No .yaml files found"
    exit 1
fi

# Get the total number of items
TOTAL=$(yq 'length' "$YAML_FILE")

if [[ -z "$TOTAL" ]] || [[ "$TOTAL" -eq 0 ]]; then
    echo "No URLs found in $YAML_FILE"
    exit 1
fi

echo "Found $TOTAL URLs to evaluate"
echo ""

# Store the original directory
ORIGINAL_DIR=$(pwd)

# Create results directory with timestamp
RESULTS_DIR="results_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$RESULTS_DIR"
echo "Results will be saved in: $RESULTS_DIR"
echo ""

# Process each item in the YAML array
for ((i=0; i<$TOTAL; i++)); do
    # Extract URL and name using yq
    URL=$(yq ".[$i].url" "$YAML_FILE")
    NAME=$(yq ".[$i].name" "$YAML_FILE")
    
    # Remove quotes if present (yq might add them)
    URL=$(echo "$URL" | sed 's/^"//;s/"$//')
    NAME=$(echo "$NAME" | sed 's/^"//;s/"$//')
    
    # Skip if URL is null or empty
    if [[ "$URL" == "null" ]] || [[ -z "$URL" ]]; then
        echo "Warning: Skipping item $((i+1)) - no URL found"
        continue
    fi
    
    COUNT=$((i+1))
    echo ""
    echo "[$COUNT/$TOTAL] Evaluating: $NAME"
    echo "URL: $URL"
    
    # Create output directory based on URL within results directory
    # Clean URL for directory name (remove protocol and replace special chars)
    DIR_NAME=$(echo "$URL" | sed 's|https\?://||' | sed 's|[/:?&=]|_|g')
    OUTPUT_DIR="$RESULTS_DIR/$DIR_NAME"
    mkdir -p "$OUTPUT_DIR"
    
    echo "Output directory: $OUTPUT_DIR"
    echo "=========================================="
    
    # Change to output directory and run eval.sh from there
    cd "$OUTPUT_DIR"
    
    # Run eval.sh with the URL from the output directory
    bash "$ORIGINAL_DIR/eval.sh" "$URL"
    
    # Check exit status
    EXIT_CODE=$?
    
    # Return to original directory
    cd "$ORIGINAL_DIR"
    
    if [[ $EXIT_CODE -eq 0 ]]; then
        echo "✓ Evaluation completed successfully"
    else
        echo "✗ Evaluation failed with exit code: $EXIT_CODE"
    fi
    
    echo ""
    echo "=========================================="
done

echo ""
echo "All evaluations complete! Processed $TOTAL items."
echo ""

# Summary report
echo "Summary Report"
echo "=============="
echo "YAML file: $YAML_FILE"
echo "Results directory: $RESULTS_DIR"
echo ""

SUCCESS_COUNT=0
FAIL_COUNT=0

for ((i=0; i<$TOTAL; i++)); do
    NAME=$(yq ".[$i].name" "$YAML_FILE" | sed 's/^"//;s/"$//')
    URL=$(yq ".[$i].url" "$YAML_FILE" | sed 's/^"//;s/"$//')
    
    # Create same directory name as above
    DIR_NAME=$(echo "$URL" | sed 's|https\?://||' | sed 's|[/:?&=]|_|g')
    OUTPUT_DIR="$RESULTS_DIR/$DIR_NAME"
    
    # Check if results exist
    if [[ -d "$OUTPUT_DIR/review" ]] && [[ -d "$OUTPUT_DIR/code" ]]; then
        echo "✓ $NAME"
        ((SUCCESS_COUNT++))
    else
        echo "✗ $NAME"
        ((FAIL_COUNT++))
    fi
done

echo ""
echo "Total: $TOTAL | Success: $SUCCESS_COUNT | Failed: $FAIL_COUNT"

# Create summary file
SUMMARY_FILE="$RESULTS_DIR/summary.txt"
{
    echo "Evaluation Summary"
    echo "=================="
    echo "Date: $(date)"
    echo "YAML file: $YAML_FILE"
    echo "Total evaluations: $TOTAL"
    echo "Successful: $SUCCESS_COUNT"
    echo "Failed: $FAIL_COUNT"
    echo ""
    echo "Detailed Results:"
    echo "-----------------"
} > "$SUMMARY_FILE"

for ((i=0; i<$TOTAL; i++)); do
    NAME=$(yq ".[$i].name" "$YAML_FILE" | sed 's/^"//;s/"$//')
    URL=$(yq ".[$i].url" "$YAML_FILE" | sed 's/^"//;s/"$//')
    DIR_NAME=$(echo "$URL" | sed 's|https\?://||' | sed 's|[/:?&=]|_|g')
    OUTPUT_DIR="$RESULTS_DIR/$DIR_NAME"
    
    if [[ -d "$OUTPUT_DIR/review" ]] && [[ -d "$OUTPUT_DIR/code" ]]; then
        echo "✓ $NAME - $URL" >> "$SUMMARY_FILE"
    else
        echo "✗ $NAME - $URL" >> "$SUMMARY_FILE"
    fi
done

echo ""
echo "Summary saved to: $SUMMARY_FILE"