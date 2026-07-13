---
tags: [docs, meta]
---

# Obsidian Vault Guide

## What is this?

This entire project is an **Obsidian vault**. Every markdown file (`*.md`) in this repo is a note — documentation, architecture decisions, daily standup notes, feature plans, bug reports, and more. Open the root of this repo in [Obsidian](https://obsidian.md) to navigate it as a linked knowledge base.

## Vault Structure

```
maysanlabs/                    # Vault root
├── README.md                  # Vault home — navigation hub
├── AGENTS.md                  # AI agent reference
├── docs/                      # Technical documentation
│   ├── README.md              # Project docs index
│   ├── VAULT.md               # This guide
│   ├── currency-convention.md # Rupee formatting
│   └── app/                   # App-specific docs
│       └── getting-started/
├── daily/                     # Daily notes (auto-created by daily notes plugin)
├── src/                       # Source code (excluded from search/links)
├── .obsidian/                 # Vault configuration (shared via git)
│   ├── app.json               # Editor & vault settings
│   ├── appearance.json        # Theme & font settings
│   ├── core-plugins.json      # Enabled/disabled plugins
│   ├── graph.json             # Graph view config with color groups
│   ├── daily-notes.json       # Daily notes config
│   ├── templates.json         # Template folder config
│   ├── templates/             # Note templates
│   │   ├── daily-note.md      # Daily standup template
│   │   ├── feature.md         # Feature request template
│   │   ├── bug.md             # Bug report template
│   │   └── meeting.md         # Meeting notes template
│   └── workspace.json         # LOCAL ONLY (gitignored) — window layout
└── .gitignore                 # workspace.json is gitignored
```

## Shared vs Personal

| Config | Shared | Purpose |
|--------|--------|---------|
| `app.json` | Yes | Vault-wide editor preferences |
| `appearance.json` | Yes | Theme, accent color, font choices |
| `core-plugins.json` | Yes | Which plugins are enabled |
| `graph.json` | Yes | Graph view colors and layout |
| `daily-notes.json` | Yes | Daily notes folder and template |
| `templates.json` | Yes | Template folder location |
| `templates/*.md` | Yes | Shared note templates |
| `workspace.json` | **No** | Personal window layout, open tabs |
| `community-plugins.json` | **No** | Personal plugin choices |

## Templates

Create a new note from template: `Ctrl+T` (Cmd+T on Mac), then pick:

| Template | Use For |
|----------|---------|
| `daily-note` | Daily standup notes |
| `feature` | Feature planning & tracking |
| `bug` | Bug reports with repro steps |
| `meeting` | Meeting agendas & action items |

## Daily Notes

Daily notes are auto-created in the `daily/` folder. Format: `YYYY-MM-DD.md`.

Open today's note: use the ribbon icon or `Ctrl+Shift+D`.

## Graph View Tags

The graph view uses color-coded tag groups:

| Color | Tag | Layer |
|-------|-----|-------|
| Blue | `#docs` | Documentation |
| Red | `#component` | UI Components |
| Green | `#service` | Services/API |
| Orange | `#data` | Data layer |
| Purple | `#core` | Core infrastructure |
| Yellow | `#seo` | SEO |
| Cyan | `#feature` | Feature work |
| Red | `#bug` | Bug reports |

## Ignored Files

The following are excluded from Obsidian (in `app.json` → `userIgnoreFilters`):
- `node_modules/`, `.next/`, `.git/`
- `packages/`, `scripts/`, `public/`
- `.commandcode/`, `.agent/.shared/`, `.agent/scripts/__pycache__/`

## Getting Started

1. Install [Obsidian](https://obsidian.md)
2. Open this repository root as a vault
3. The workspace, theme, and templates load automatically
4. Start from [[README|the vault home]] or open [[docs/README|project docs]]
