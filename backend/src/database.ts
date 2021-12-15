import { MikroORM } from "@mikro-orm/core/MikroORM";
import config from "./mikro-orm.config";
const init = async () => {
    return await MikroORM.init(config);
};

export default {
    init,
};
