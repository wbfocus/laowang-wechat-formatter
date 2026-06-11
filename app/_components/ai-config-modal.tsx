import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type React from "react";
import type { AiProviderType } from "../_types/formatter";

// 变量和逻辑内部沿用 openrouter/openai/anthropic，但 UI 全部切换为 DeepSeek/Kimi/阿里云
// openrouter -> DeepSeek; openai -> Kimi; anthropic -> 阿里云（Aliyun）

type ProviderDraft = {
  baseUrl: string;
  apiKey: string;
  model: string;
};

const emptyDraft: ProviderDraft = {
  baseUrl: "",
  apiKey: "",
  model: "",
};

// 这三个 key不变，UI显示中文服务名
const providerBaseUrlPlaceholders: Record<AiProviderType, string> = {
  openrouter: "https://api.deepseek.com/v1",
  openai: "https://api.moonshot.cn/v1",
  anthropic: "https://dashscope.aliyuncs.com/compatible-mode/v1",
};

const providerModelPlaceholders: Record<AiProviderType, string> = {
  openrouter: "deepseek-chat",
  openai: "moonshot-v1-8k 或自定义模型名称",
  anthropic: "qwen-turbo 或其他支持的模型名称",
};

const createEmptyProviderDrafts = (): Record<AiProviderType, ProviderDraft> => ({
  openrouter: {
    ...emptyDraft,
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
  },
  openai: {
    ...emptyDraft,
    baseUrl: "https://api.moonshot.cn/v1",
  },
  anthropic: {
    ...emptyDraft,
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
});

type AiConfigModalProps = {
  open: boolean;
  aiProviderType: AiProviderType;
  setAiProviderType: React.Dispatch<React.SetStateAction<AiProviderType>>;
  aiBaseUrl: string;
  setAiBaseUrl: React.Dispatch<React.SetStateAction<string>>;
  aiApiKey: string;
  setAiApiKey: React.Dispatch<React.SetStateAction<string>>;
  aiModel: string;
  setAiModel: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onSave: () => void;
  onClear: () => void;
};

export function AiConfigModal({
  open,
  aiProviderType,
  setAiProviderType,
  aiBaseUrl,
  setAiBaseUrl,
  aiApiKey,
  setAiApiKey,
  aiModel,
  setAiModel,
  onClose,
  onSave,
  onClear,
}: AiConfigModalProps) {
  const isDeepSeek = aiProviderType === "openrouter"; // openrouter -> DeepSeek
  const [providerDrafts, setProviderDrafts] = useState<Record<AiProviderType, ProviderDraft>>(
    () => createEmptyProviderDrafts(),
  );

  // 保证 DeepSeek 选中时，baseUrl 和 model 保持默认
  useEffect(() => {
    if (!open) return;
    setProviderDrafts((prev) => ({
      ...prev,
      [aiProviderType]: {
        baseUrl: aiBaseUrl,
        apiKey: aiApiKey,
        model: aiModel,
      },
    }));
  }, [open, aiProviderType, aiBaseUrl, aiApiKey, aiModel]);

  const handleClear = () => {
    setProviderDrafts(createEmptyProviderDrafts());
    onClear();
  };

  const syncCurrentDraft = (patch: Partial<ProviderDraft>) => {
    setProviderDrafts((prev) => ({
      ...prev,
      [aiProviderType]: {
        ...prev[aiProviderType],
        ...patch,
      },
    }));
  };

  const handleBaseUrlChange = (value: string) => {
    setAiBaseUrl(value);
    syncCurrentDraft({ baseUrl: value });
  };

  const handleApiKeyChange = (value: string) => {
    setAiApiKey(value);
    syncCurrentDraft({ apiKey: value });
  };

  const handleModelChange = (value: string) => {
    setAiModel(value);
    syncCurrentDraft({ model: value });
  };

  // 切换 provider 时 Base URL 取新版，DeepSeek 模型默认填 deepseek-chat
  const handleProviderChange = (provider: AiProviderType) => {
    if (provider === aiProviderType) return;

    const baseUrlDefaults: Record<AiProviderType, string> = {
      openrouter: "https://api.deepseek.com/v1",
      openai: "https://api.moonshot.cn/v1",
      anthropic: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    };

    const modelDefaults: Record<AiProviderType, string> = {
      openrouter: "deepseek-chat",
      openai: "",
      anthropic: "",
    };

    const nextDrafts = {
      ...providerDrafts,
      [aiProviderType]: {
        baseUrl: aiBaseUrl,
        apiKey: aiApiKey,
        model: aiModel,
      },
    };

    const targetDraft = nextDrafts[provider];
    const targetBaseUrl = targetDraft.baseUrl || baseUrlDefaults[provider];
    // DeepSeek 选中时模型名默认填 deepseek-chat
    const targetModel =
      provider === "openrouter"
        ? targetDraft.model || modelDefaults[provider]
        : targetDraft.model;

    setProviderDrafts(nextDrafts);
    setAiProviderType(provider);
    setAiBaseUrl(targetBaseUrl);
    setAiApiKey(targetDraft.apiKey);
    setAiModel(targetModel || "");
  };

  // DeepSeek 选中时，如未输入则自动填默认 baseUrl 和 model
  useEffect(() => {
    if (!open || !isDeepSeek) return;
    if (aiBaseUrl !== "https://api.deepseek.com/v1") {
      setAiBaseUrl("https://api.deepseek.com/v1");
    }
    if (aiModel !== "deepseek-chat") {
      setAiModel("deepseek-chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isDeepSeek]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center neo-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="neo-modal flex flex-col max-w-2xl w-full mx-4 transform transition-all max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center p-6 pb-4 shrink-0 border-b-[3px] border-(--neo-ink)">
          <h3 className="text-xl font-black text-(--neo-ink) mb-2 uppercase">AI 服务配置</h3>
          <p className="text-sm neo-text-muted font-bold">
            支持 DeepSeek、Kimi、阿里云等国内主流服务
          </p>
        </div>

        <div className="flex-1 overflow-y-auto neo-scrollbar p-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-black text-(--neo-ink) mb-2">
              API 类型
            </label>
            <div className="grid grid-cols-3 gap-2 bg-(--neo-cyan) border-[3px] border-(--neo-ink) p-2">
              <button
                type="button"
                onClick={() => handleProviderChange("openrouter")}
                className={`py-2 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                  isDeepSeek ? "neo-tab neo-tab-active" : "neo-tab"
                }`}
              >
                DeepSeek
              </button>
              <button
                type="button"
                onClick={() => handleProviderChange("openai")}
                className={`py-2 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                  aiProviderType === "openai" ? "neo-tab neo-tab-active" : "neo-tab"
                }`}
              >
                Kimi
              </button>
              <button
                type="button"
                onClick={() => handleProviderChange("anthropic")}
                className={`py-2 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                  aiProviderType === "anthropic" ? "neo-tab neo-tab-active" : "neo-tab"
                }`}
              >
                阿里云
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <label className="block text-sm font-black text-(--neo-ink)">
                API 地址
              </label>
              {isDeepSeek && (
                <button
                  type="button"
                  onClick={() => handleBaseUrlChange("https://api.deepseek.com/v1")}
                  className="text-xs font-black underline text-(--neo-ink)"
                >
                  恢复默认
                </button>
              )}
            </div>
            <input
              type="text"
              value={aiBaseUrl}
              readOnly={isDeepSeek}
              onChange={(e) => handleBaseUrlChange(e.target.value)}
              className={`neo-input w-full px-3 py-2 ${isDeepSeek ? "bg-(--neo-surface)" : ""}`}
              placeholder={providerBaseUrlPlaceholders[aiProviderType]}
              autoComplete="off"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <label className="block text-sm font-black text-(--neo-ink)">
                API Key
              </label>
              {isDeepSeek && (
                <a
                  href="https://platform.deepseek.com/console/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-black underline text-(--neo-ink) inline-flex items-center gap-1"
                >
                  获取 DeepSeek API Key
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              type="password"
              value={aiApiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="neo-input w-full px-3 py-2"
              placeholder="粘贴你的 API Key"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-(--neo-ink) mb-1">
              模型名称
            </label>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="neo-input w-full px-3 py-2"
              placeholder={providerModelPlaceholders[aiProviderType]}
              autoComplete="off"
              readOnly={isDeepSeek}
            />
          </div>

          <p className="text-xs leading-relaxed neo-text-muted font-bold">
            配置仅保存在本地浏览器，排版时会临时调用你配置的服务商接口进行处理。
          </p>
        </div>

        <div className="flex gap-3 p-6 pt-4 shrink-0 border-t-[3px] border-(--neo-ink)">
          <button
            onClick={onSave}
            className="neo-button neo-button-primary flex-1 py-2.5"
          >
            保存配置
          </button>
          <button
            onClick={handleClear}
            className="neo-button neo-button-secondary px-4 py-2.5"
          >
            清空
          </button>
          <button
            onClick={onClose}
            className="neo-button neo-button-ghost px-4 py-2.5"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
