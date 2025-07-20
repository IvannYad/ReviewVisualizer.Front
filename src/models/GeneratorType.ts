export enum GeneratorType {
    FIRE_AND_FORGET = 1,
    DELAYED = 2,
    RECURRING = 3
}

export const generatorTypeLabels: Record<GeneratorType, string> = {
    [GeneratorType.FIRE_AND_FORGET]: "Fire And Forget",
    [GeneratorType.DELAYED]: "Delayed",
    [GeneratorType.RECURRING]: "Recurring"
}