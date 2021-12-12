
const publicVapidKey = 'BGuMX7RaVb9tdxTa6y7yVu74OaTzFZxkO3ZzmnLBieR8QnB6nfl3n62FRhdgCjbx9RpTPr2uCj9aRFvlRlTNodA';

const registerPush = async () => {
    const subscription = await self.registration.pushManager.subscribe({
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
    console.log(await f.json());

}