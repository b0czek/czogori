

const registerPush = async (registration) => {
    let keyReq = await (await fetch('/api/publicKey')).json();
    if (keyReq.error) {
        console.error('could not read server public vapid key');
        return;
    }

    const publicVapidKey = keyReq.publicVapidKey;

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey

    })
    console.log(subscription)
    let f = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log(await f.text());

}
export default registerPush;