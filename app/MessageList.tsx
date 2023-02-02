"use client";
import React, { useEffect } from 'react'
import fetcher from '../utils/fetchMessages';
import useSWR from 'swr';
import { MessageObjType } from '../typings';
import MessageComponent from './MessageComponent';
import { clientPusher } from '../pusher';

type Props = {
  initialMessages: MessageObjType[],
}
const MessageList = ({ initialMessages }: Props) => {
  const { data: messages, error, mutate } = useSWR<MessageObjType[]>("/api/getMessages", fetcher);
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (newMessage: MessageObjType) => {
      // if you sent the message, no need to update the cache
      if (messages?.find((message) => message.id === newMessage.id)) return;
      if (!messages) mutate(fetcher);
      else {
        mutate(fetcher, {
          optimisticData: [newMessage, ...messages!],
          rollbackOnError: true,
        })
      }
    })
    //cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, mutate, clientPusher])

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl'>
      {(messages || initialMessages).map((message) => {
        return (
          <MessageComponent key={message.id} message={message} />

        )
      })
      }
    </div>
  )
}
export default MessageList;