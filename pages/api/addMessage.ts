// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import redis from "../../redis";
import { MessageObjType } from './../../typings.d';
import { serverPusher } from './../../pusher';

type Data = {
    message: MessageObjType
}
type ErrorData = {
    error: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed!' })
        return;
    }
    const { messageObj } = req.body;
    const newMessageObj = {
        ...messageObj,
        createdAt: Date.now(),
    }
    //push to upstash redis
    await redis.hset('messages', messageObj.id, JSON.stringify(newMessageObj));
    await serverPusher.trigger('messages', 'new-message', newMessageObj);
    //sending response to the user
    res.status(200).json({ message: newMessageObj })
}
//hset is a redis command that sets a hash field to a value
// redis.hset(collection_name, key, JSON.stringify(value_object))