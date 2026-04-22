import request from "@/utils/request";

/**
 * 批量上传文件
 * @param files 
 * @returns 
 */
export const uploadBatchFiles = (data: FormData) => {
  return request<any>({
    url: "/web/oss/uploadBatchFiles",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
