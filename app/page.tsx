import { getServerSession } from 'next-auth';
import { MessageObjType } from '../typings';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import Providers from "./providers";

const HomePage = async () => {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then((res) => res.json());
  const messages: MessageObjType[] = data.messages;
  const session = await getServerSession();
  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput />
      </main>
    </Providers>
  )
}
export default HomePage;