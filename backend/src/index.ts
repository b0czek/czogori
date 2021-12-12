import express from "express";
import webpush from "web-push";
import cors from "cors";
import database from "./database";
import notifier from "./notifier";
import { getRouter } from "./router";

// TODO: remove this from file
const privateVapidKey = "lgwd0tl1yXRrf5Xv8Okj5QlufTCW7cI3fG-vAGESmio";
const publicVapidKey = "BGuMX7RaVb9tdxTa6y7yVu74OaTzFZxkO3ZzmnLBieR8QnB6nfl3n62FRhdgCjbx9RpTPr2uCj9aRFvlRlTNodA";
webpush.setVapidDetails("mailto:dariusz.majnert@gmail.com", publicVapidKey, privateVapidKey);

const main = async () => {
    let orm = await database.init();
    await orm.getMigrator().up();

    const app = express();
    app.use("/api", cors(), express.json(), getRouter(orm.em));

    const port = 3001;
    app.listen(port, () => {
        console.log(`server started on ${port}`);
    });

    const notifierInterval = notifier.init("19:30:00", orm.em);
};

main();
