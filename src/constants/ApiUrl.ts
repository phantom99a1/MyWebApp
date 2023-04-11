import EnvConfig from "../Utils/EnvConfig";

class ApiUrl {
    static Role_Execute = EnvConfig.getApiHost() + "/Api/Internal/Administration/Role";

    static Employee_Execute = EnvConfig.getApiHost() + "/api/duatpt_employee";
}

export default ApiUrl;