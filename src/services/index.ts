// import { request } from 'umi';
import request from 'umi-request';
const baseUrl = ''
const appCode = 'm-ms'

export async function getMenuList(params: any) {
    params = {
        ...params,
        appCode
    }
    return request<any>(baseUrl + '/m-feign-api/auth/userUsers/menuList', {
        method: 'get',
        params,
    });
}
export async function postActualCardAdminSetUserCard(params: any) {
    return request<any>(baseUrl + '/m-prime/actualCard/adminSetUserCard', {
        method: 'post',
        data: params,
    });
}
export async function postActualCardAdminExcelImportCard(params: any) {
    return request<any>(baseUrl + `/m-prime/actualCard/adminExcelImportCard/${params.operatorId}/${params.operatorAccount}`, {
        method: 'post',
        data: params.file,
    });
}
export async function postActualCardShowAllCardList(params: any) {
    return request<any>(baseUrl + `/m-prime/actualCard/showAllCardList`, {
        method: 'post',
        data: params,
    });
}
export async function postActualCardUpdateCardSta(params: any) {
    return request<any>(baseUrl + `/m-prime/actualCard/updateCardSta`, {
        method: 'post',
        data: params,
    });
}
export async function subMerchants(params: any) {
    return request<any>(baseUrl + `/m-merchant/merchants/searchSubMerchants`, {
        method: 'post',
        data: params
    });
}
export async function objectQueryBrhCardList(params: any) {
    return request<any>(baseUrl + `/m-prime/cardPool/objectQueryBrhCardList`, {
        method: 'post',
        data: params,
    });
}
export async function queryBrhCardList(params: any) {
    return request<any>(baseUrl + `/m-prime/cardPool/queryBrhCardList`, {
        method: 'post',
        data: params,
    });
}
export async function insertCardPool(params: any) {
    return request<any>(baseUrl + `/m-prime/cardPool/insertCardPool`, {
        method: 'post',
        data: params,
    });
}
export async function registerBrhMerchant(params: any) {
    return request<any>(baseUrl + `/m-feign-api/tonglian/merchants/registerBrhMerchant`, {
        method: 'post',
        data: params,
    });
}
export async function removeBrhMerchant(params: any) {
    return request<any>(baseUrl + `/m-merchant/merchants/removeBrhMerchant?brhMerchantCode=${params}`, {
        method: 'POST',
        data: params
    });
}