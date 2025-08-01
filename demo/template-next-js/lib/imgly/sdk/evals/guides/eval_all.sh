#!/bin/bash

echo "Starting evaluation of all URLs in uuts.yaml"
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

# Check if uuts.yaml exists
if [[ ! -f "uuts.yaml" ]]; then
    echo "Error: uuts.yaml file not found!"
    exit 1
fi

# Get the total number of items
TOTAL=$(yq 'length' uuts.yaml)

if [[ -z "$TOTAL" ]] || [[ "$TOTAL" -eq 0 ]]; then
    echo "No URLs found in uuts.yaml"
    exit 1
fi

echo "Found $TOTAL URLs to evaluate"
echo ""

# Store the original directory
ORIGINAL_DIR=$(pwd)

# Process each item in the YAML array
for ((i=0; i<$TOTAL; i++)); do
    # Extract URL and name using yq
    URL=$(yq ".[$i].url" uuts.yaml)
    NAME=$(yq ".[$i].name" uuts.yaml)
    
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
    
    # Create output directory based on URL
    OUTPUT_DIR="$URL"
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
echo "Summary:"
echo "--------"
for ((i=0; i<$TOTAL; i++)); do
    NAME=$(yq ".[$i].name" uuts.yaml | sed 's/^"//;s/"$//')
    URL=$(yq ".[$i].url" uuts.yaml | sed 's/^"//;s/"$//')
    
    # Check if results exist
    if [[ -d "$URL/review" ]] && [[ -d "$URL/code" ]]; then
        echo "✓ $NAME - Results available at: $URL"
    else
        echo "✗ $NAME - No results found"
    fi
done