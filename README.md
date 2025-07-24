# Gemini Claude Toolkit

The `gemini-claude-toolkit` is a powerful command-line interface that streamlines the setup of a sophisticated, AI-driven development workflow between Gemini and Claude. It provides two main commands:

-   `gemini-claude-init`: Initializes your project with the Gemini-Claude Collaboration Protocol by creating a `gemini.md` file in your current directory.
-   `gemini-claude-server`: Runs an MCP server that allows Gemini to delegate coding tasks to Claude.

## Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (which includes `npx`).
- **Claude Code CLI**: The official command-line tool for interacting with Claude Code.
  ```bash
  npm install -g @anthropic-ai/claude-code
  ```
- **Anthropic API Key**: You'll need an API key from Anthropic.
  1. Go to the [Anthropic Console](https://console.anthropic.com/).
  2. Create a new API key.

## Installation

You can use this toolkit directly with `npx` without needing to install it globally.

## Usage

This toolkit provides two commands that work together to establish the Gemini-Claude collaborative workflow.

### Step 1: Initialize Your Project

To begin, run the `gemini-claude-init` command in the root directory of your project:

```bash
npx gemini-claude-init
```

This will create a `gemini.md` file in your project. This file contains the instructions that guide Gemini to act as a project architect, collaborating with Claude as the coding implementer.

### Step 2: Configure and Run the MCP Server

Once your project is initialized, you need to configure your Gemini CLI to use the MCP server provided by this toolkit.

1.  **Set Your API Key**: Make your Anthropic API key available as an environment variable.

    ```bash
    export ANTHROPIC_API_KEY="your-anthropic-api-key"
    ```

    To make this permanent, add this line to your shell's configuration file (e.g., `~/.zshrc`, `~/.bashrc`).

2.  **Configure Gemini CLI**: Add the `gemini-claude-server` to your Gemini CLI's `settings.json` file. This file is usually located at `~/.gemini/settings.json`.

    ```json
    {
      "mcpServers": [
        {
          "name": "gemini-claude-server",
          "spec": {
            "type": "stdio",
            "command": ["npx", "gemini-claude-server"]
          }
        }
      ]
    }
    ```

### Step 3: Start Collaborating

With your project initialized and the Gemini CLI configured, you are ready to start using the collaborative workflow. When you interact with the Gemini CLI in your project's directory, it will now follow the protocol defined in your `gemini.md` file, delegating coding tasks to Claude via the MCP server. 