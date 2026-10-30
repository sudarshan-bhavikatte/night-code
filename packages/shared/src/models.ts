export type SupportedProvider = "ollama";

type SupportedChatModelDefinition = {
  id: string;
  provider: SupportedProvider;
};

// These ids map directly to models pulled into your local Ollama install,
// e.g. `ollama pull llama3.1`. Add or remove entries here to match what you
// have available locally (`ollama list`).
//
// IMPORTANT: NightCode is agentic and relies on structured tool calling. Only
// list models whose Ollama template emits native tool calls (they show up
// under the "Tools" capability on https://ollama.com/search?c=tools). Models
// without this support will just print the tool call as JSON text instead of
// executing it, so files never get created. Notably `qwen2.5-coder:latest`
// does NOT reliably emit tool calls and is intentionally omitted.
export const SUPPORTED_CHAT_MODELS = [
  {
    id: "llama3.2",
    provider: "ollama",
  },
  {
    id: "llama3.1",
    provider: "ollama",
  },
  {
    id: "qwen3",
    provider: "ollama",
  },
  {
    id: "mistral",
    provider: "ollama",
  },
  {
    id: "mistral-nemo",
    provider: "ollama",
  },
  {
    id: "firefunction-v2",
    provider: "ollama",
  },
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId = "llama3.2";
