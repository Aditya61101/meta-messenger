"use client";
import { FormEvent, useState } from 'react';
import { v4 as uuid } from "uuid";
import { MessageObjType } from '../typings';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import { useSession } from 'next-auth/react';


const ChatInput = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState<string>('');
    const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

    const handleMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message || !session) return;
        const messageToSend = message;
        setMessage('');

        //creating a unique id for the message
        const id = uuid();
        const messageObj: MessageObjType = {
            id,
            message: messageToSend,
            createdAt: Date.now(),
            username: session?.user?.name!,
            avatar: session?.user?.image!,
            email: session?.user?.email!
        }
        const uploadMessage = async () => {
            const response = await fetch("/api/addMessage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messageObj })
            })
            const data = await response.json();
            return [data.message, ...messages!]
        }
        await mutate(uploadMessage, {
            optimisticData: [messageObj, ...messages!],
            rollbackOnError: true,
        });
    }
    return (
        <form className='flex px-10 py-5 space-x-2 fixed bottom-0 z-50 w-full border-t bg-white border-gray-100' onSubmit={handleMessage}>
            <input type="text" placeholder="Type your message here..." className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed' value={message} onChange={(e) => {
                setMessage(e.target.value)
            }} disabled={!session} />
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed' disabled={!message}>Send</button>
        </form>
    )
}
export default ChatInput;