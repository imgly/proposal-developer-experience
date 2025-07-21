# Developer Experience Proposal

This repository contains an RFC (Request for Comments) for improving the developer experience of the IMG.LY editor, focusing on making it truly "hackable" and easy to customize.

## Overview

The proposal addresses the current challenges developers face when integrating and customizing the editor, and presents a comprehensive approach to simplify the developer journey from initial setup to advanced customization.

## Key Proposals

- **Streamlined Getting Started**: CLI-based scaffolding with `npx @imgly/sdk init`
- **Improved Trial Experience**: Automatic trial key generation on first launch
- **Structured Project Layout**: Convention-over-configuration approach for customization
- **Unified Settings System**: JSON/YAML-based configuration with hot reloading
- **Simplified UI Modification**: Declarative API for customizing editor UI components
- **Better Asset Management**: Clear distinction between asset sources, libraries, and packs

## Repository Structure

```
.
├── rfc.md                    # Main RFC document (start here)
├── rfc/                      # Individual RFC chapters
│   ├── 01-introduction.md
│   ├── 02-preliminary.md
│   ├── 03-goals.md
│   └── ...
├── examples/                 # Example configurations and schemas
│   ├── settings.example.jsonc
│   ├── settings.schema.json
│   └── ...
└── code/                    # Code examples
```

## Reading the RFC

The main entry point is [`rfc.md`](./rfc.md), which imports all chapters in the correct order. The document is best viewed with a Markdown preview tool that supports file imports (like Markdown Preview Enhanced).

## Core Philosophy

> Build for modification

The editor should be designed from the ground up to be easily customizable, with clear conventions and minimal configuration required for common use cases.

## Feedback

This is a proposal document intended to gather feedback and drive discussion about improving the developer experience. Please feel free to open issues or submit pull requests with suggestions and improvements.