'use client';

import { range } from '@/components/util';
import { useParentWindow } from '@/hooks/useParentWindow';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useCallback, useEffect, useState } from 'react';
import './chat.module.css';

type UserId = number;
type ChatMessage = [number, UserId, string];
type ChatState = {
  open: boolean;
  users: {
    [userId: UserId]: {
      name: string;
    };
  };
  message: ChatMessage[];
};

export default function ChatPage() {
  const testing = useQueryParam('test');
  const sample = useQueryParam('sample');

  const [chat, setChat] = useState<ChatState>({
    open: true,
    users: {},
    message: [],
  });

  useEffect(() => {
    if (sample) {
      setChat(c => ({
        ...c,
        message: [
          ...c.message,
          ...range(sample ? parseFloat(sample) : 0).map<ChatMessage>(i => [
            i,
            i,
            `message ${i}`,
          ]),
        ],
      }));
    }
  }, [sample, setChat]);

  const appendMessage = useCallback(
    (evt: MessageEvent<ChatMessage>) =>
      setChat(c => ({
        ...c,
        message: [...c.message, evt.data],
      })),
    [setChat],
  );
  const parent = useParentWindow<ChatMessage>(appendMessage);

  const [input, setInput] = useState<string>('');
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (input.length > 0 && parent) {
        parent.send([new Date().getTime(), 5, input]);
        setInput('');
      }
    },
    [input],
  );

  return (
    <main style={{}}>
      {testing && (
        <iframe
          src="http://localhost:3000/chat"
          width="300px"
          height="500px"
        ></iframe>
      )}

      <section>
        {Object.keys(chat.users)
          .map<UserId>(k => parseFloat(k))
          .map(userId => {
            const user = chat.users[userId];
            return <div key={userId}>{user?.name ?? 'unknown'}</div>;
          })}
      </section>

      <section>
        {chat.message.map((message, messageIndex) => {
          const [timestamp, userId, text] = message;
          const user = chat.users[userId];
          return (
            <div key={messageIndex}>
              {user?.name ?? userId}: {text}
            </div>
          );
        })}
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={input}
            onChange={evt => setInput(evt.target.value)}
          />
          <button type="submit">SEND</button>
        </form>
      </section>
    </main>
  );
}
