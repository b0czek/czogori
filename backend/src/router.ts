import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

import { Router } from "express";
import { Subscriber } from "./entities/Subscriber";

export const getRouter = (em: EntityManager<IDatabaseDriver<Connection>>): Router => {
    let router = Router();

    router.post("/subscribe", async (req, res) => {
        const subscription = <SubscriptionPayload>req.body;
        if (
            typeof subscription.endpoint === "string" &&
            typeof subscription.keys.p256dh === "string" &&
            typeof subscription.keys.auth === "string"
        ) {
            let exists = (await em.find(Subscriber, { payload: JSON.stringify(req.body) })).length > 0;
            if (!exists) {
                const subscriber = em.create(Subscriber, {
                    payload: req.body,
                });
                await em.persistAndFlush(subscriber);
                res.status(201).json({ error: false });
            } else {
                res.status(200).json({ error: false });
            }
        } else {
            res.status(400).json({ error: true });
        }
    });
    router.get("/", (req, res) => {
        return res.status(200).json({ ok: true });
    });
    return router;
};

interface SubscriptionPayload {
    endpoint: string;
    expirationDate: number | null;
    keys: Keys;
}
interface Keys {
    p256dh: string;
    auth: string;
}
