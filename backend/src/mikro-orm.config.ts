import { MikroORM } from "@mikro-orm/core/MikroORM";
import { Subscriber } from "./entities/Subscriber";
import path from "path";

export default {
    dbName: "czogori.sqlite",
    type: "sqlite",
    entities: [Subscriber],
    debug: process.env.NODE_ENV !== "production",
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
} as Parameters<typeof MikroORM.init>[0];
