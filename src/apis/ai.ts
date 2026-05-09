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

// 智能创作台相关接口定义
export interface CreativeProjectCreateResponseDTO {
  projectId: string;
}

export interface CreativeDoc {
  fileName: string;
  fileUrl: string;
}

export interface CreativeProjectDocsUpsertRequestDTO {
  docs: CreativeDoc[];
}

export interface CreativeProjectDocsUpsertVO {
  indexedDocs: number;
  indexedChunks: number;
}

export interface CreativeOutlineGenerateRequestDTO {
  projectId: string;
  requirement: string;
  category?: string;
  style?: string;
  tone?: string;
}

export interface Source {
  id: string;
  type: 'doc' | 'note' | 'web';
  title: string;
  url: string | null;
}

export interface Point {
  text: string;
  citations: string[];
}

export interface Section {
  title: string;
  points: Point[];
}

export interface Outline {
  titleCandidates: string[];
  tagCandidates: string[];
  sections: Section[];
}

export interface CreativeOutlineVO {
  outlineId: string;
  sources: Source[];
  outline: Outline;
}

export interface CreativeDraftGenerateRequestDTO {
  projectId: string;
  outlineId: string;
  extraRequirement?: string;
}

export interface CreativeDraftVO {
  draftText: string;
}

/**
 * 创建创作项目
 * @returns 
 */
export const createCreativeProject = () => {
  return request<CreativeProjectCreateResponseDTO>({
    url: "/web/ai/creative/project",
    method: "post",
  });
};

/**
 * 项目文档入库（PDF 解析 + 向量化）
 * @param projectId 
 * @param data 
 * @returns 
 */
export const uploadProjectDocs = (projectId: string, data: CreativeProjectDocsUpsertRequestDTO) => {
  return request<CreativeProjectDocsUpsertVO>({
    url: `/web/ai/creative/project/${projectId}/docs`,
    method: "post",
    data: data,
  });
};

/**
 * 生成大纲
 * @param data 
 * @returns 
 */
export const generateOutline = (data: CreativeOutlineGenerateRequestDTO) => {
  return request<CreativeOutlineVO>({
    url: "/web/ai/creative/outline",
    method: "post",
    data: data,
    timeout: 0,
  });
};

/**
 * 生成成稿
 * @param data 
 * @returns 
 */
export const generateDraft = (data: CreativeDraftGenerateRequestDTO) => {
  return request<CreativeDraftVO>({
    url: "/web/ai/creative/draft",
    method: "post",
    data: data,
    timeout: 0,
  });
};

/**
 * 清理项目临时数据
 * @param projectId 
 * @returns 
 */
export const cleanupProject = (projectId: string) => {
  return request<void>({
    url: `/web/ai/creative/project/${projectId}/cleanup`,
    method: "post",
  });
};

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

