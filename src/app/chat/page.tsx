'use client';

import { checkIFrame, classCat, range, sleep } from '@/components/util';
import { useMount } from '@/hooks/useMount';
import { useOtherWindow } from '@/hooks/useOtherWindow';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';

type UserId = number;
type ChatMessage = [number, UserId, string];
type ChatConfig = {
  open: boolean;
  users: { userId: UserId; name: string }[];
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

function getColor(index: number) {
  const options = ['red', 'green', 'yellow', 'purple'];
  return options[index % options.length];
}

export default function ChatPage() {
  const testing = useQueryParam('test');
  const sample = useQueryParam('sample');

  const [isInFrame, setInFrame] = useState(true);
  useMount(() => setInFrame(checkIFrame(window)));

  const [config, setConfig] = useState<ChatConfig>({
    open: true,
    users: [],
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
      sleep(1000).then(() => {
        handlePacket({
          ptype: 'config',
          data: {
            users: [
              { userId: 0, name: 'sam' },
              { userId: 1, name: 'bob' },
              { userId: 2, name: 'alex' },
            ],
          },
        });
        sendPacket({
          ptype: 'message',
          data: range(sample ? parseFloat(sample) : 0).map<ChatMessage>(i => [
            i,
            i % 3,
            `message ${i}`,
          ]),
        });
      });
    }
  }, [sample]);

  return (
    <main
      className={classCat(styles.main, !isInFrame ? styles.noframe : '')}
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

      {messages.map((message, messageIndex) => {
        const [timestamp, userId, text] = message;
        const index = config.users.findIndex(u => u.userId === userId);
        const user = config.users[index];
        const color = getColor(index);
        return (
          <div key={messageIndex} style={{ color }}>
            {`[${userId}]${user?.name ?? '???'}: ${text}`}
          </div>
        );
      })}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="message"
          value={input}
          onChange={evt => setInput(evt.target.value)}
        />
        <button type="submit">SEND</button>
      </form>
    </main>
  );
}
