import request from "@/utils/request";
import type { NoteDTO } from "@/types/note";

/**
 *
 * @param currentPage
 * @param pageSize
 * @returns
 */
export const getRecommendNote = (currentPage: number, pageSize: number) => {
  return request<any>({
    url: `/web/search/note/getRecommendNote/${currentPage}/${pageSize}`,
    method: "get",
  });
};

/**
 *
 * @param currentPage
 * @param pageSize
 * @param data
 * @returns
 */
export const getNoteByDTO = (currentPage: number, pageSize: number, data: NoteDTO) => {
  return request<any>({
    url: `/web/search/note/getNoteByDTO/${currentPage}/${pageSize}`,
    method: "post",
    data: data
  });
};

export const getCategoryAgg = (data: NoteDTO) => {
  return request<any>({
    url: `/web/search/note/getCategoryAgg`,
    method: "post",
    data: data
  });
};

/**
 *
 * @param keyword
 * @returns
 */
export const getRecordByKeyWord = (keyword: string) => {
  return request<any>({
    url: `/web/search/record/getRecordByKeyWord/${keyword}`,
    method: "get"
  });
};

/**
 *
 * @returns
 */
export const getHotRecord = (count: number) => {
  return request<any>({
    url: `web/search/record/getHotRecord/${count}`,
    method: "get"
  });
};

/**
 *
 * @param keyword
 * @returns
 */
export const addRecord = (keyword: string) => {
  return request<any>({
    url: `/web/search/record/addRecord`,
    method: "post",
    params: { keyword }
  });
};
