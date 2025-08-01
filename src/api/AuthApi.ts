import axios from "axios";
import { LoginResponse, RegisterResponse, LogoffResponse, RegisterRequest, LoginRequest, LogoffRequest } from "../models/AuthModels";
import IAuthApi from "./IAuthApi";

export default class AuthApi implements IAuthApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }

    loginAsync(request: LoginRequest): Promise<LoginResponse | void> {
        return axios.post(`${this.url}/login`, request, {
                withCredentials: true
            })
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    registerAync(request: RegisterRequest): Promise<RegisterResponse | void> {
        return axios.post(`${this.url}/register`, request)
            .then(res => {
                return res.data;
            })
    }

    logoffAsync(request: LogoffRequest): Promise<LogoffResponse | void> {
        return axios.post(`${this.url}/logoff`, request)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}