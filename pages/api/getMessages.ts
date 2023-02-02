import type { NextApiRequest, NextApiResponse } from 'next';
import redis from "../../redis";
import { MessageObjType } from './../../typings.d';

type Data = {
    messages: MessageObjType[]
}
type ErrorData = {
    error: string
}
export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed!' })
        return;
    }
    const messagesRes = await redis.hvals('messages');
    const messages: MessageObjType[] = messagesRes.map((message) => JSON.parse(message)).sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json({ messages })
}