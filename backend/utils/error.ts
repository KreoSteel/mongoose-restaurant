import { parsedEnvVariables } from "../config/variables";

export const defineError = (error: string) => {
    if (parsedEnvVariables.NODE_ENV === "development") {
        return error;
    }
    return "Internal server error";
}