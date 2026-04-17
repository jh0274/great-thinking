#!/usr/bin/env bash
# Fires after Write or Edit tool calls.
# Prints a reminder if a structural file was changed.

file=$(echo "$CLAUDE_TOOL_INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('file_path', d.get('path', '')))
except:
    print('')
" 2>/dev/null)

structural_dirs=("ontology" "engine" "ui" "docs/architecture")

for dir in "${structural_dirs[@]}"; do
    if [[ "$file" == *"$dir"* ]]; then
        echo "[arch] Structural file changed: $file"
        echo "[arch] If this changes user journey, business logic, or system shape — run /visual-architecture update"
        break
    fi
done

# Also remind if index.html or any .json in root dirs was touched
if [[ "$file" == *"index.html"* ]] || [[ "$file" =~ /ontology/.*\.json$ ]]; then
    echo "[arch] Core file modified — run /context-hygiene before next /compact"
fi
