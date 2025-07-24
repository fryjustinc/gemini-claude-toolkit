import { query, AssistantMessage, TextBlock, ClaudeCodeOptions } from "@anthropic-ai/claude-code";

export async function claudeCodeHandler(args: unknown): Promise<{ content: { type: string; text: string; }[]; isError: boolean; }> {
    if (typeof args !== 'object' || args === null || !('instructions' in args) || !('working_directory' in args)) {
        return {
            content: [{ type: "text", text: "Invalid arguments provided to claudeCodeHandler." }],
            isError: true,
        };
    }

    const { instructions, working_directory } = args as { instructions: string; working_directory: string; };

    try {
        const options = new ClaudeCodeOptions({
            cwd: working_directory,
        });

        let responseText = "";
        for await (const message of query({ prompt: instructions, options })) {
            if (message instanceof AssistantMessage) {
                for (const block of message.content) {
                    if (block instanceof TextBlock) {
                        responseText += block.text;
                    }
                }
            }
        }

        return {
            content: [{ type: "text", text: responseText }],
            isError: false,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return {
            content: [{ type: "text", text: `Error interacting with Claude: ${errorMessage}` }],
            isError: true,
        };
    }
} 