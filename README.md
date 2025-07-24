# Gemini Claude Toolkit

The `@kryonas/gemini-claude-toolkit` is a command-line tool that enables a powerful, collaborative development workflow between the Gemini CLI and Claude. It allows Gemini to act as a high-level project architect, delegating coding tasks to Claude for implementation.

This toolkit is designed to be used with `npx`, which allows you to run it without a global installation.

## Overview

The workflow is designed to be seamless:

1.  You issue a command to the Gemini CLI in your project.
2.  Gemini, guided by a `gemini.md` file, formulates a high-level plan.
3.  Gemini delegates the coding task to a local MCP server provided by this toolkit.
4.  The server uses the `@anthropic-ai/claude-code` CLI to have Claude generate the code.
5.  The final code is returned to you in the Gemini CLI.

## Getting Started

Follow these steps to set up and use the Gemini Claude Toolkit.

### Prerequisites

Before you begin, make sure you have the following:

-   **Node.js**: [Download and install Node.js](https://nodejs.org/) (version 18 or higher), which includes `npx`.
-   **Claude Code CLI**: The official command-line tool for interacting with Claude.
    ```bash
    npm install -g @anthropic-ai/claude-code
    ```
-   **Anthropic API Key**: You'll need an API key from Anthropic. You can get one from the [Anthropic Console](https://console.anthropic.com/).

### Step 1: Set Your Anthropic API Key

Make your Anthropic API key available as an environment variable.

```bash
export ANTHROPIC_API_KEY="your-anthropic-api-key"
```

To make this setting permanent, add the line to your shell's configuration file (e.g., `~/.zshrc` or `~/.bashrc`).

### Step 2: Initialize Your Project

In the root directory of your project, run the following command:

```bash
npx @kryonas/gemini-claude-toolkit init
```

This command creates a `gemini.md` file in your project. This file contains instructions that guide Gemini to act as a project architect, delegating coding tasks to Claude.

### Step 3: Configure the Gemini CLI

You need to tell the Gemini CLI to use the MCP server from this toolkit. Add the following configuration to your Gemini CLI's `settings.json` file (usually located at `~/.gemini/settings.json`):

```json
{
  "mcpServers": [
    {
      "name": "gemini-claude-server",
      "spec": {
        "type": "stdio",
        "command": ["npx", "@kryonas/gemini-claude-toolkit", "server"]
      }
    }
  ]
}
```