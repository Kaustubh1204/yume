import { google } from "@ai-sdk/google";
import { config } from "../../../config/google.config.js";
import chalk from "chalk";
import { streamText } from "ai";

export class AIService {
    constructor() {
        if (!config.googleApiKey) {
            throw new Error("GOOGLE_API_KEY is not set in env");
        }

        this.model = google(config.model, {
            apiKey: config.googleApiKey,
        });
    }

    /**
     * Send a message and get streaming response
     * @param {Array} message
     * @param {Function} onChunk
     * @param {Object} tools
     * @param {Function} onToolCall
     * @returns {Promise<Object>}
     */
    async sendMessage({ message, onChunk, tools = undefined, onToolCall = null }) {
        try {
            const streamConfig = {
                model: this.model,
                message: message,
                temperature: config.temperature,
            };
            const result = streamText(streamConfig);
            let fullResponse = "";
            for await (const chunk of result.textStream) {
                fullResponse += chunk;
                if (onChunk) {
                    onChunk(chunk);
                }
            }
            const fullResult = result;

            return {
                content: fullResponse,
                finishResponse: fullResult.finishReason,
                usage: fullResult.usage,
            };
        } catch (error) {
            console.error(chalk.red("Ai Service Error:"), error.message);
            throw error;
        }
    }
}