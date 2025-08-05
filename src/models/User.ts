import { GeneratorModifications, SystemRoles } from "./Enums";

export type User = {
    userId?: number;
    userName: string;
    systemRoles?: SystemRoles;
    generatorModifications?: GeneratorModifications;
}