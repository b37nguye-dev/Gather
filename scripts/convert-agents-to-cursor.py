#!/usr/bin/env python3
"""
Convert VoltAgent Claude Code agent files to Cursor subagent format.
Strips tools/model from frontmatter and removes Claude Code-specific protocol sections.
"""

import re
from pathlib import Path

SRC = Path.home() / ".claude" / "agents"
DEST = Path(__file__).resolve().parent.parent / ".cursor" / "subagents"


def convert_file(content: str) -> str:
    """Convert a single agent file from Claude Code to Cursor format."""
    # 1. Strip tools: and model: from frontmatter
    content = re.sub(r"\ntools:.*\n", "\n", content)
    content = re.sub(r"\nmodel:.*\n", "\n", content)

    # 2. Remove ## Communication Protocol section (heading through next ## or end)
    content = re.sub(
        r"\n## Communication Protocol\n.*?(?=\n## |\Z)",
        "\n",
        content,
        flags=re.DOTALL,
    )

    # 3. Remove JSON code blocks containing requesting_agent or "agent":
    def remove_protocol_json(match):
        block = match.group(0)
        if "requesting_agent" in block or '"agent":' in block:
            return ""
        return block

    content = re.sub(
        r"```json\n.*?```",
        remove_protocol_json,
        content,
        flags=re.DOTALL,
    )

    # 4. Remove Delivery notification: and its quoted content
    content = re.sub(
        r'\nDelivery notification:\s*\n"[^"]*"\s*\n',
        "\n",
        content,
    )

    # 5. Remove Integration with other agents: block (heading + bullet list)
    content = re.sub(
        r"\nIntegration with other agents:\s*\n(?:- .*\n)*",
        "\n",
        content,
    )

    # 6. Remove orphaned "Status update protocol:" / "Progress tracking:" headings
    content = re.sub(r"\n(?:Status update protocol|Progress tracking):\s*\n+", "\n", content)

    # 7. Clean up excessive blank lines (more than 2 consecutive -> 2)
    content = re.sub(r"\n{4,}", "\n\n\n", content)

    # 8. Trim trailing whitespace per line
    content = "\n".join(line.rstrip() for line in content.split("\n"))

    return content.strip() + "\n"


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    files = sorted(SRC.glob("*.md"))
    count = 0
    for f in files:
        content = f.read_text(encoding="utf-8")
        converted = convert_file(content)
        out = DEST / f.name
        out.write_text(converted, encoding="utf-8")
        count += 1
    print(f"Converted {count} agents to {DEST}")


if __name__ == "__main__":
    main()
