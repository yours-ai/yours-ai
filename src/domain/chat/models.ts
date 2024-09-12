import { z } from "zod";
import { translatableStringSchema } from "@/locales/models.ts";

export const promptItemSchema = z.object({
  type: z.enum(["user", "assistant"]),
  content: z.string(),
});

export const llmSettingsSchema = z.object({
  model: z.string(),
  frequency_penalty: z.number().min(-2).max(2).optional(),
  presence_penalty: z.number().min(-2).max(2).optional(),
  max_tokens: z.number().positive().optional(),
  temperature: z.number().min(0).max(2).optional(),
  top_p: z.number().min(0).max(1).optional(),
  seed: z.number().optional(),
  logit_bias_raw: z.object({}).optional(), // keys should be tokenized using the tokenizer
});

export const metadataSchema = z.object({
  name: translatableStringSchema, // Assumes translatableStringSchema is compatible with Zod or migrated
  creator: z.string().optional(),
  creatorDescription: translatableStringSchema.optional(),
});

export const promptConfigSchema = z.object({
  llmParams: llmSettingsSchema,
  maxContextTokens: z.number().positive(),
  messageItems: z.array(promptItemSchema),
});

export const promptTemplateSchema = z.object({
  uuid: z.string(),
  metadata: metadataSchema,
  promptConfig: promptConfigSchema,
});

export type PromptItem = z.infer<typeof promptItemSchema>;
export type LlmSettings = z.infer<typeof llmSettingsSchema>;
export type PromptTemplate = z.infer<typeof promptTemplateSchema>;

export const initialPromptTemplates: PromptTemplate[] = [
  {
    uuid: "69a20bb6-b091-44a4-85cd-f52f0b19f531",
    metadata: {
      name: {
        en: "Balanced",
        ko: "밸런스",
      },
      creator: "narayo9",
      creatorDescription: {
        ko: "당신의 대화에 맞게 캐릭터가 적절히 대화 길이를 조절합니다. 종종 전지적 시점에서 이야기하기도 합니다.",
        en: "The character adjusts conversation length and occasionally uses an omniscient perspective.",
      },
    },
    promptConfig: {
      llmParams: {
        model: "gpt-4o",
      },
      maxContextTokens: 128_000,
      messageItems: [],
    },
  },
  {
    uuid: "d5ec1f11-1f44-4ca8-a52b-b7a1eaf6d98c",
    metadata: {
      name: {
        en: "Novel",
        ko: "소설형",
      },
      creator: "narayo9",
      creatorDescription: {
        ko: "당신이 짧게 이야기해도 캐릭터는 길게 이야기합니다. 자주 전지적 시점에서 이야기합니다.",
        en: "The character speaks at length even if you speak briefly. Often tells stories from an omniscient perspective.",
      },
    },
    promptConfig: {
      llmParams: {
        model: "gpt-4o",
      },
      maxContextTokens: 128_000,
      messageItems: [],
    },
  },
  {
    uuid: "2a418588-d1f1-4bd3-b52d-25d78564ee51",
    metadata: {
      name: {
        ko: "현실형",
        en: "Realistic",
      },
      creator: "narayo9",
      creatorDescription: {
        en: "It’s like a real conversation—hard to know what the character is really thinking.",
        ko: "현실의 대화와 비슷합니다. 캐릭터의 속마음을 알기는 어렵습니다.",
      },
    },
    promptConfig: {
      llmParams: {
        model: "gpt-4o",
      },
      maxContextTokens: 128_000,
      messageItems: [],
    },
  },
];
