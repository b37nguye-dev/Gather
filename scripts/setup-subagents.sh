#!/usr/bin/env bash
#
# setup-subagents.sh — Wire .cursor/subagents/ into Cursor by creating
# .cursor/agents as a symlink. Optionally remove subagents from standard
# Cursor/Claude locations.
#
# Usage:
#   ./scripts/setup-subagents.sh           # Project-only (default)
#   ./scripts/setup-subagents.sh --all     # Also remove user-level agents
#   ./scripts/setup-subagents.sh --help
#

set -e

PROJECT_ONLY=true

usage() {
  cat <<EOF
Usage: $0 [OPTIONS]

Options:
  --project-only   Only create/update project .cursor/agents symlink (default)
  --all            Also remove subagents from ~/.cursor/agents and ~/.claude/agents
  --help           Show this help

EOF
}

for arg in "$@"; do
  case "$arg" in
    --all)
      PROJECT_ONLY=false
      ;;
    --project-only)
      PROJECT_ONLY=true
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $arg"
      usage
      exit 1
      ;;
  esac
done

# Resolve project root (directory containing .cursor)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CURSOR_DIR="$PROJECT_ROOT/.cursor"
AGENTS_LINK="$CURSOR_DIR/agents"
SUBAGENTS_DIR="$CURSOR_DIR/subagents"

if [[ ! -d "$SUBAGENTS_DIR" ]]; then
  echo "Error: $SUBAGENTS_DIR not found. Run from project root."
  exit 1
fi

echo "Project root: $PROJECT_ROOT"
echo ""

# Optional: remove user-level subagents
if [[ "$PROJECT_ONLY" == "false" ]]; then
  for dir in "$HOME/.cursor/agents" "$HOME/.claude/agents"; do
    if [[ -d "$dir" ]]; then
      count=$(find "$dir" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
      echo "Removing $count agent(s) from $dir"
      rm -rf "$dir"
    fi
  done
  echo ""
fi

# Remove or replace project .cursor/agents
if [[ -L "$AGENTS_LINK" ]]; then
  target=$(readlink "$AGENTS_LINK")
  if [[ "$target" == "subagents" ]] || [[ "$target" == "subagents/" ]]; then
    echo "Symlink .cursor/agents -> subagents already exists. Nothing to do."
    exit 0
  fi
  echo "Removing existing symlink .cursor/agents -> $target"
  rm "$AGENTS_LINK"
elif [[ -d "$AGENTS_LINK" ]]; then
  count=$(find "$AGENTS_LINK" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  echo "Removing $count agent(s) from project .cursor/agents/"
  rm -rf "$AGENTS_LINK"
fi

# Create symlink
ln -s subagents "$AGENTS_LINK"
echo "Created .cursor/agents -> subagents"
echo ""

# Verify
count=$(find "$SUBAGENTS_DIR" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
echo "Verification: $count subagent(s) in .cursor/subagents/"
echo "Cursor will load them from .cursor/agents/ (symlink)."
echo ""
echo "Done."
