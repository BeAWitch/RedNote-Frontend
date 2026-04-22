import request from "@/utils/request";

export interface AINoteOptimizeRequestDTO {
  userId: number;
  imageUrls: string[];
  title?: string;
  content?: string;
  tags?: string[];
}

export interface AITranslationRequestDTO {
  userId: number;
  originalText: string;
  targetLanguage: string;
}

export interface AIResponseVO {
  message: string;
  success: boolean;
  error?: string;
  errorCode?: string;
  responseTime?: number;
}

/**
 * AI 优化笔记
 * @param data 
 * @returns 
 */
export const optimizeNote = (data: AINoteOptimizeRequestDTO) => {
  return request<AIResponseVO>({
    url: "/web/ai/optimize-note",
    method: "post",
    data: data,
  });
};

/**
 * AI 翻译文本
 * @param data 
 * @returns 
 */
export const translateText = (data: AITranslationRequestDTO) => {
  return request<AIResponseVO>({
    url: "/web/ai/translate",
    method: "post",
    data: data,
  });
};

