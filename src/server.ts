#!/usr/bin/env node

const path = require("path");
// Load Server class
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");

// Dynamically load schema definitions from the same SDK package to avoid export path issues
const serverModulePath = require.resolve("@modelcontextprotocol/sdk/server/index.js");
// serverModulePath => .../dist/cjs/server/index.js – jump one directory up to get to dist/cjs
const sdkCjsRoot = path.resolve(serverModulePath, "..", "..");
// The types.js file lives next to server/ in the CJS build
const { CallToolRequestSchema, ListToolsRequestSchema } = require(path.join(sdkCjsRoot, "types.js"));
const { StdioServerTransport } = require(path.join(sdkCjsRoot, "server", "stdio.js"));

import { CLAUDE_CODE_TOOL } from "./tool";
import { claudeCodeHandler } from "./handler";

const SERVER_CONFIG = {
  name: "gemini-claude-server",
  version: "1.0.21",
};

const server = new Server(
  {
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
  },
  {
    capabilities: {
      tools: {
        tools: [CLAUDE_CODE_TOOL],
      },
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [CLAUDE_CODE_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name, arguments: args } = request.params;

  if (name === "claude_code") {
    return await claudeCodeHandler(args);
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Create stdio transport and connect the server
(async () => {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})(); 