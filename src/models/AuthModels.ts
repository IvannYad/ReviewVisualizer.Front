import { GeneratorModifications, SystemRoles } from "./Enums";

export type LoginRequest = {
  username?: string;
  password?: string;
};

export type LoginResponse = {
  success: boolean;
  error?: string;
};

export type RegisterRequest = {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
};

export type RegisterResponse = {
  success: boolean;
  userName?: string;
  password?: string;
  error?: string ;
};

export type LogoffRequest = {
  username: string;
};

export type LogoffResponse = {
  success: boolean;
  error?: string;
};

export type User = {
  userName: string;
  systemRoles?: SystemRoles;
  generatorModifications?: GeneratorModifications;
}