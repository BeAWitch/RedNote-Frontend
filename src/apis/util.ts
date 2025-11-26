import request from "@/utils/request";


export const toUp = (data: any) => {
    return request<any>({
        url: "/util/dm/toUp",
        method: "post",
        data,
    });
};
