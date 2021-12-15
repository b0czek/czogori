import express from "express";
import webpush from "web-push";
import cors from "cors";
import database from "./database";
import notifier from "./notifier";
import { getRouter } from "./router";
import keys from "./keys";

const main = async () => {
    let orm = await database.init();
    await orm.getMigrator().up();

    await keys.init(orm.em);

    const app = express();
    app.use("/api", cors(), express.json(), getRouter(orm.em));

    const port = 3001;
    app.listen(port, () => {
        console.log(`server started on ${port}`);
    });

    const notifierInterval = notifier.init("10:30:20", orm.em);
};

main();
