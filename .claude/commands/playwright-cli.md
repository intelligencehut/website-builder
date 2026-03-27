---
description: Automates browser interactions for web testing, form filling, screenshots, and data extraction
allowed-tools: Bash
---

# playwright-cli
Browser automation CLI tool.

## Default Configuration
All commands MUST use the `--session=sevaa` and `--persistent` flags. These are required for every command.

## Quick Start
```bash
playwright-cli --session=sevaa --persistent open https://example.com/
playwright-cli --session=sevaa --persistent snapshot
playwright-cli --session=sevaa --persistent click e3
```

## Core Workflow
1. `open` to navigate to a page
2. `snapshot` to get element refs
3. `click`, `fill`, `type` to interact

**IMPORTANT**: Always prefix every command with `--session=sevaa --persistent`

## Commands

### Core
```bash
playwright-cli --session=sevaa --persistent open <url>              # open url (headless)
playwright-cli --session=sevaa --persistent open --headed <url>     # open url in headed mode (visible browser)
playwright-cli --session=sevaa --persistent close                   # close the page
playwright-cli --session=sevaa --persistent click <ref>             # perform click
playwright-cli --session=sevaa --persistent fill <ref> <text>       # fill text
playwright-cli --session=sevaa --persistent type <text>             # type text
playwright-cli --session=sevaa --persistent snapshot                # capture page snapshot
playwright-cli --session=sevaa --persistent screenshot [ref]        # take screenshot
```

### Sessions
```bash
playwright-cli --session=sevaa --persistent open <url>   # open with named session (always "sevaa")
playwright-cli session-stop-all                           # stop all sessions
```

### DevTools
```bash
playwright-cli tracing-start           # start trace recording
playwright-cli tracing-stop            # stop trace recording
playwright-cli console [min-level]     # list console messages
```
```

> Tip: The official SKILL.md from Microsoft is at `https://raw.githubusercontent.com/microsoft/playwright-cli/main/skills/playwright-cli/SKILL.md` — you can use that as your base and customize ports/URLs for your local dev setup.

---

### Step 3: Add to .gitignore

Playwright CLI creates work files (snapshots, screenshots) during execution. Exclude them:
```
# playwright-cli
.playwright-cli/
```

---

### Step 4: Use it in Claude Code

Inside Claude Code, just type:
```
/playwright-cli open my app at localhost:3000 and verify the login flow