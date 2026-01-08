export default class GenericConfig {
    constructor(configs = {}) {
        const validKeys = ['test_param'];
        if (!configs.generic) {
            throw new Error("[GenericConfig] Generic distro configuration not found")
        }
        if (!configs.generic.test_param) {
            throw new Error("[GenericConfig] 'test_param' not found in generic distro configuration")
        }
        if (typeof configs.generic.test_param !== "string") {
            throw new Error("[GenericConfig] 'test_param' must be a string in generic distro configuration")
        }
        for (const key of Object.keys(configs.generic)) {
            if (!validKeys.includes(key)) {
                throw new Error(`[Param responsetxt] Invalid parameter: ${key}`);
            }
        }
        this.test_param = configs.generic.test_param
    }
}