'use client';

import { range, sleep } from '@/components/util';
import { useOtherWindow } from '@/hooks/useOtherWindow';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';

type UserId = number;
type ChatMessage = [number, UserId, string];
type ChatConfig = {
  open: boolean;
  users: {
    [userId: UserId]: {
      name: string;
    };
  };
};
type ChatPacket =
  | {
      ptype: 'config';
      data: Partial<ChatConfig>;
    }
  | {
      ptype: 'message';
      data: ChatMessage[];
    };

export default function ChatPage() {
  const testing = useQueryParam('test');
  const sample = useQueryParam('sample');

  const [config, setConfig] = useState<ChatConfig>({
    open: true,
    users: {},
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handlePacket = useCallback(
    (packet: ChatPacket) => {
      switch (packet.ptype) {
        case 'config':
          setConfig(config => ({
            ...config,
            ...packet.data,
          }));
          break;
        case 'message':
          setMessages(c => c.concat(packet.data));
          break;
        default:
          console.error(packet);
      }
    },
    [setConfig, setMessages],
  );

  const iframe = useRef<HTMLIFrameElement>(null);
  const otherApi = useOtherWindow<ChatPacket>(iframe, handlePacket);
  const sendPacket = useCallback(
    (packet: ChatPacket) => {
      otherApi.send(packet);
      // also "send" to self
      handlePacket(packet);
    },
    [handlePacket],
  );

  const [input, setInput] = useState<string>('');
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (input.length > 0) {
        setInput('');
        sendPacket({
          ptype: 'message',
          data: [[new Date().getTime(), 5, input]],
        });
      }
    },
    [input],
  );

  useEffect(() => {
    if (sample) {
      sleep(1000).then(() =>
        sendPacket({
          ptype: 'message',
          data: range(sample ? parseFloat(sample) : 0).map<ChatMessage>(i => [
            i,
            i,
            `message ${i}`,
          ]),
        }),
      );
    }
  }, [sample]);

  return (
    <main
      className={styles.main}
      style={{ backgroundColor: testing ? 'blue' : undefined }}
    >
      {testing && (
        <iframe
          ref={iframe}
          id="testframe"
          style={{ position: 'absolute', top: '50px', left: '200px' }}
          src="http://localhost:3000/chat"
          width="300px"
          height="500px"
        ></iframe>
      )}

      <section>
        {Object.keys(config.users)
          .map<UserId>(k => parseFloat(k))
          .map(userId => {
            const user = config.users[userId];
            return <div key={userId}>{user?.name ?? 'unknown'}</div>;
          })}
      </section>

      <section>
        {messages.map((message, messageIndex) => {
          const [timestamp, userId, text] = message;
          const user = config.users[userId];
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
