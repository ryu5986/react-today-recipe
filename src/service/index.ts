
import axios, { Axios } from "axios";

/**
 * API 통신 위한 설정 및 호출 메소드
 */

const client: Axios = axios.create({
    baseURL: 'http://openapi.foodsafetykorea.go.kr/api/4af132d7d06846cbb672/COOKRCP01/json',
    headers: {
        'Content-Type': 'application/json'
    }    
});

const baseURL = client.defaults.baseURL;

export const getRecipe = async (keyword: string) => {
   
    const url =  baseURL + '/1/1/RCP_NM=' + keyword;
    const response = await client.get(url);

    return response.data;

}

export const getRecipeList = async (keyword: string, min: number, max: number) => {
   
    const url =  `${baseURL}/${min}/${max}/RCP_NM=${keyword}`;
    const response = await client.get(url);

    return response.data;

}

export const getRecipeByRcpNm = async (rpcNm: string) => {
   
    const url =  baseURL + '/1/1/RCP_NM=' + rpcNm;
    const response = await client.get(url);

    return response.data;

}