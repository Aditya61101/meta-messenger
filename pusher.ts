import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
    appId: "1545561",
    key: "5e2425aade22988d0bb0",
    secret: "67c4279a264f315ca157",
    cluster: "ap2",
    useTLS: true
})

export const clientPusher = new ClientPusher('5e2425aade22988d0bb0', {
    cluster: 'ap2',
    forceTLS: true
})