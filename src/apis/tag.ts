import request from "@/utils/request";

/**
 *
 * @param currentPage
 * @param pageSize
 * @param keyword
 * @returns
 */
export const getTagByKeyword = (currentPage: number, pageSize: number, keyword:string) => {
    return request<any>({
      url: `/web/tag/getTagByKeyword/${currentPage}/${pageSize}`,
      method: "get",
      params: {
        keyword,
      }
    });
  };
