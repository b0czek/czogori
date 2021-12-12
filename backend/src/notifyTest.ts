import webpush from "web-push";
import database from "./database";
import notifier from "./notifier";

// TODO: remove this from file
const privateVapidKey = "lgwd0tl1yXRrf5Xv8Okj5QlufTCW7cI3fG-vAGESmio";
const publicVapidKey = "BGuMX7RaVb9tdxTa6y7yVu74OaTzFZxkO3ZzmnLBieR8QnB6nfl3n62FRhdgCjbx9RpTPr2uCj9aRFvlRlTNodA";
webpush.setVapidDetails("mailto:dariusz.majnert@gmail.com", publicVapidKey, privateVapidKey);

const main = async () => {
    let orm = await database.init();
    await orm.getMigrator().up();
    notifier.notify(orm.em);
    orm.close();
};

main();
