import { LoginRequest, LoginResponse, LogoffRequest, LogoffResponse, RegisterRequest, RegisterResponse } from "../models/AuthModels";

export default interface IAuthtApi{
    loginAsync(request: LoginRequest): Promise<LoginResponse | void>;
    registerAync(request: RegisterRequest): Promise<RegisterResponse | void>;
    logoffAsync(request: LogoffRequest): Promise<LogoffResponse | void>;
}