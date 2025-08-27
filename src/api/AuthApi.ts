import axios from "axios";
import { LoginResponse, RegisterResponse, LogoffResponse, RegisterRequest, LoginRequest, LogoffRequest } from "../models/AuthModels";
import IAuthApi from "./IAuthApi";

export default class AuthApi implements IAuthApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }

    tryAnalystAccess(): Promise<void> {
        const promise = axios.get(`${this.url}/try-analyst-access`, {
            withCredentials: true
        })
        .then(() => {});

        return promise;
    }

    tryGeneratorAccess(): Promise<void> {
        const promise = axios.get(`${this.url}/try-generator-access`, {
            withCredentials: true
        })
        .then(() => {});

        return promise;
    }

    tryOwnerAccess(): Promise<void> {
        const promise = axios.get(`${this.url}/try-owner-access`, {
            withCredentials: true
        })
        .then(() => {});

        return promise;
    }

    loginAsync(request: LoginRequest): Promise<LoginResponse | void> {
        return axios.post(`${this.url}/login`, request, {
                withCredentials: true
            })
            .then(res => {
                return res.data;
            })
    }

    registerAync(request: RegisterRequest): Promise<RegisterResponse | void> {
        return axios.post(`${this.url}/register`, request)
            .then(res => {
                return res.data;
            })
    }

    logoffAsync(request: LogoffRequest): Promise<LogoffResponse | void> {
        return axios.post(`${this.url}/logoff`, request, {
            withCredentials: true
        })
            .then(res => {
                return res.data;
            })
    }

    tryVisitorAccess(): Promise<void> {
        const promise = axios.get(`${this.url}/try-visitor-access`, {
            withCredentials: true
        })
        .then(() => {});

        return promise;
    }
}