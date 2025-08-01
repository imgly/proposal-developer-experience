#!/bin/bash

echo "Starting evaluation of all URLs in uuts.yaml"
echo "=========================================="

# Initialize counter
COUNT=0

# Use a different approach to parse YAML list items
URL=""
NAME=""
IN_ITEM=false

while IFS= read -r line; do
    # Check if we're starting a new list item
    if [[ "$line" =~ ^-[[:space:]] ]]; then
        # Process previous item if exists
        if [[ -n "$URL" ]]; then
            ((COUNT++))
            echo ""
            echo "[$COUNT] Evaluating: $NAME"
            echo "URL: $URL"
            echo "=========================================="
            
            # Run eval.sh directly
            bash eval.sh "$URL"
            
            echo ""
            echo "=========================================="
        fi
        
        # Reset for new item
        URL=""
        NAME=""
        IN_ITEM=true
    fi
    
    # Extract URL if line contains "url:"
    if [[ "$line" =~ url:[[:space:]]*(.+) ]]; then
        URL="${BASH_REMATCH[1]}"
        # Remove trailing whitespace and quotes
        URL=$(echo "$URL" | sed 's/[[:space:]]*$//' | sed 's/^["'\'']//' | sed 's/["'\'']$//')
    fi
    
    # Extract name if line contains "name:"
    if [[ "$line" =~ name:[[:space:]]*(.+) ]]; then
        NAME="${BASH_REMATCH[1]}"
        NAME=$(echo "$NAME" | sed 's/^["'\'']//' | sed 's/["'\'']$//' | sed 's/[[:space:]]*$//')
    fi
done < uuts.yaml

# Process the last item
if [[ -n "$URL" ]]; then
    ((COUNT++))
    echo ""
    echo "[$COUNT] Evaluating: $NAME"
    echo "URL: $URL"
    echo "=========================================="
    
    # Run eval.sh directly
    bash eval.sh "$URL"
    
    echo ""
    echo "=========================================="
fi

echo ""
echo "All evaluations complete! Processed $COUNT items."