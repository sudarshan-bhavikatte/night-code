import { createOllama, ollama as defaultOllama } from "ai-sdk-ollama";
import {
  findSupportedChatModel,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@nightcode/shared";
import type { ProviderOptions } from "@ai-sdk/provider-utils";
import type { LanguageModel } from "ai";

export type ResolvedModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelId: SupportedChatModelId;
  providerOptions?: ProviderOptions;
};

// Point at a non-default Ollama host (e.g. a remote machine) with
// OLLAMA_BASE_URL. Falls back to the local daemon at http://localhost:11434.
const ollama = process.env.OLLAMA_BASE_URL
  ? createOllama({ baseURL: process.env.OLLAMA_BASE_URL })
  : defaultOllama;

function resolveOllamaModel(modelId: SupportedChatModelId): ResolvedModel {
  return {
    model: ollama(modelId, {
      options: {
        // Ollama defaults to a 2048-token context, which small models quickly
        // blow through once the system prompt + tool schemas + a few turns are
        // in play. When that happens the model "forgets" it has tools and
        // starts printing tool calls as plain JSON text. A larger window keeps
        // tool calling reliable across a multi-step conversation.
        num_ctx: 8192,
        // Deterministic sampling makes tool-call formatting far more reliable
        // on small local models.
        temperature: 0,
      },
    }),
    provider: "ollama",
    modelId,
  };
};

function resolveSupportedChatModel(model: SupportedChatModel): ResolvedModel {
  return resolveOllamaModel(model.id);
};

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
  return findSupportedChatModel(modelId) != null;
};

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);
  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveSupportedChatModel(model);
};
