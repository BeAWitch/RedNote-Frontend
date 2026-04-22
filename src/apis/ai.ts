import request from "@/utils/request";

export interface AINoteOptimizeRequestDTO {
  userId: number;
  imageUrls: string[];
  title?: string;
  content?: string;
  tags?: string[];
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
