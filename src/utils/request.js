import axios from "axios";
import objectAssign from 'object-assign';
import LocalStorage from "./localStorage";

export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorage.getJWT()}`
    };
};

export const request = (
    endpoint,
    method,
    headers = {},
    params = {},
    body = {},
) => {
    return axios({
        url: endpoint,
        method: method,
        headers: objectAssign(getHeaders(), headers),
        params: objectAssign(params),
        data: body
    });
};

export const get = (endpoint, params = {}, body = {}) => {
    return request(endpoint, "GET", params, body);
};

export const post = (endpoint, body = {}, params = {}, headers = {}) => {
    // console.log(endpoint, body, params, headers);
    return request(endpoint, "POST", headers, params, body);
};

export const put = (endpoint, body = {}, params = {}, headers = {}) => {
    return request(endpoint, "PUT", headers, params, body);
};

export const remove = (endpoint, body = {}, params = {}, headers = {}) => {
    return request(endpoint, "DELETE", headers, params, body);
};