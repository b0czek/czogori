import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import webpush from "web-push";
import { Vapid } from "./entities/Vapid";

export let publicVapidKey: string | null = null;

const init = async (em: EntityManager<IDatabaseDriver<Connection>>): Promise<string> => {
    let email = process.env.EMAIL;
    if (!email) {
        throw new Error("email was not provided");
    }

    let vapid = await em.findOne(Vapid, {
        email,
    });
    if (!vapid) {
        let { privateKey, publicKey } = webpush.generateVAPIDKeys();
        vapid = em.create(Vapid, {
            privateKey,
            publicKey,
            email,
        });
        await em.persistAndFlush(vapid);
    }
    webpush.setVapidDetails(`mailto:${vapid.email}`, vapid.publicKey, vapid.privateKey);
    publicVapidKey = vapid.publicKey;
    return vapid.publicKey;
};

export default {
    init,
    publicVapidKey,
};
