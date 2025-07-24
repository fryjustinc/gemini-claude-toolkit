#!/usr/bin/env node

import { Server, CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk";
import { CLAUDE_CODE_TOOL } from "./tool";
import { claudeCodeHandler } from "./handler";

const SERVER_CONFIG = {
  name: "gemini-claude-server",
  version: "1.0.0",
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

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "claude_code") {
    return await claudeCodeHandler(args);
  }

  throw new Error(`Unknown tool: ${name}`);
});

server.listen(); 