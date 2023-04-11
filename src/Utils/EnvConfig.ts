class EnvConfig {
    static getApiHost(): string {
       return "https://localhost:44362";
        //return process.env.REACT_APP_API_HOST!;
    }
}

export default EnvConfig;