#!/bin/bash
# autopush.sh
# This script watches the directory for changes and automatically pushes them to GitHub.

echo "🚀 Starting auto-push watcher..."
echo "Press [CTRL+C] to stop."

while true; do
  # Check if there are any changes (modified, deleted, or untracked files)
  if [[ -n $(git status -s) ]]; then
    echo "📝 Changes detected! Committing and pushing..."
    git add .
    git commit -m "Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Try to push to remote
    if git push origin main; then
      echo "✅ Successfully pushed to GitHub."
    else
      echo "❌ Push failed. (Make sure you have authenticated Git in your terminal)"
    fi
  fi
  # Wait 10 seconds before checking again
  sleep 10
done
