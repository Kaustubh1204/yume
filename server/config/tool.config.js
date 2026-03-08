// Tool configuration for AI tool-calling mode
// Add your tool definitions here

export const availableTools = [
    // Example tool entry:
    // { id: "search", name: "Google Search", description: "Search the web" },
];

let enabledToolIds = [];

export function enableTools(toolIds) {
    enabledToolIds = toolIds;
}

export function getEnabledTools() {
    return availableTools.filter((t) => enabledToolIds.includes(t.id));
}

export function getEnabledToolNames() {
    return getEnabledTools().map((t) => t.name);
}

export function resetTools() {
    enabledToolIds = [];
}
