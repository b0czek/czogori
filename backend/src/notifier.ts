import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import webpush, { WebPushError } from "web-push";
import apiProvider, { Data } from "./apiProvider";
import { Subscriber } from "./entities/Subscriber";

const getNotificationMessage = async () => {
    let data = await apiProvider();

    return `${data.liczba_przypadkow} przypadków, ${data.zgony} zgonów i ${data.liczba_wykonanych_testow} wykonanych testów.`;
};

const notify = async (em: EntityManager<IDatabaseDriver<Connection>>, notificationTime?: string) => {
    let subscribers = await em.find(Subscriber, {});
    console.log(`notifying ${subscribers.length} subscribers`);
    let message: string;
    try {
        message = await getNotificationMessage();
    } catch (err) {
        console.error("could not retrieve ApiData");
        return;
    }
    for (let sub of subscribers) {
        try {
            await webpush.sendNotification(JSON.parse(sub.payload), message);
        } catch (err) {
            if (err instanceof WebPushError && err.statusCode == 410) {
                await em.removeAndFlush(sub);
            }
        }
    }
    if (notificationTime) {
        setTimeout(notify, notificationTimeout(notificationTime), em);
    }
};

const init = (notificationTime: string, em: EntityManager<IDatabaseDriver<Connection>>) => {
    return setTimeout(notify, notificationTimeout(notificationTime), em, notificationTime);
};

export default {
    init,
    notify,
};

const notificationTimeout = (notificationTime: string) => {
    let [hour, minute, second] = notificationTime.split(":");
    let today = new Date();
    let don = new Date();
    don.setHours(+hour, +minute, +second, 0);
    if (today > don) {
        don.setDate(don.getDate() + 1);
    }
    return don.getTime() - today.getTime();
};
