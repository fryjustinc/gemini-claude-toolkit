export {};
export const CLAUDE_CODE_TOOL = {
  name: "claude_code",
  description: "Instructs Claude Code to perform specific code implementation tasks.",
  inputSchema: {
    type: "object",
    properties: {
      instructions: {
        type: "string",
        description: "Detailed instructions for Claude to execute.",
      },
      working_directory: {
        type: "string",
        description: "The working directory for Claude to execute commands in.",
      },
    },
    required: ["instructions", "working_directory"],
  },
}; 