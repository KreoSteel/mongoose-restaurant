const requiredEnvVariables = ["MONGODB_CONNECTION_STRING", "PORT", "NODE_ENV"];
const parsedEnvVariables: Record<string, string> = {};

const validateEnvVariables = () => {
    requiredEnvVariables.forEach(env => {
        // process.env.MONGODB_CONNECTION_STRING
        const parsedEnv = process.env[env];
        if (!parsedEnv) {
            throw new Error(`Environment variable ${env} is not set`);
        }
        // parsedEnvVariables["MONGODB_CONNECTION_STRING"] = process.env.MONGODB_CONNECTION_STRING;
        parsedEnvVariables[env] = parsedEnv;
    });
}

export { parsedEnvVariables, validateEnvVariables };