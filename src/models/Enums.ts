export enum SystemRoles {
    Visitor = 0, // has access only to main page
    Analyst = 1, // has access to departments page and can check all departments and teachers ratings
    GeneratorAdmin = 2, // has access to generator
    Owner = 4
}

export enum GeneratorModifications {
    View = 0,
    ModifyFireAndForget = 1,
    ModifyDelayed = 2,
    ModifyRecurring = 4
}

export enum ClaimTypes {
    SystemRole = "system_role",
    GeneratorModifications = "generator_modification"
}