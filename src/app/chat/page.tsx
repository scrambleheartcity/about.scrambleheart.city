'use client';

import { checkIFrame, classCat } from '@/components/util';
import { useKeyDown } from '@/hooks/useKeyboard';
import { useMount } from '@/hooks/useMount';
import { useOtherWindow } from '@/hooks/useOtherWindow';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useCallback, useRef, useState } from 'react';
import styles from './chat.module.css';
import {
  ChatAppPacket,
  ChatId,
  ChatMessage,
  ChatNetworkPacket,
  ChatPacketType,
} from './chatApp';

type Users = { userId: ChatId; name: string }[];

function getColor(index: number) {
  const options = ['red', 'green', 'yellow', 'purple'];
  return options[index % options.length];
}

export default function ChatPage() {
  const testing = useQueryParam('test');
  const sample = useQueryParam('sample');
  const [hide, setHide] = useState(false);

  const [isInFrame, setInFrame] = useState(true);
  useMount(() => setInFrame(checkIFrame(window)));

  const [users, setUsers] = useState<Users>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handlePacket = useCallback(
    (packet: ChatNetworkPacket) => {
      switch (packet.ptype) {
        case ChatPacketType.NetworkMessage:
          const newUsers = users.concat();
          for (const msg of packet.data) {
            const user = newUsers.find(u => u.userId === msg.userId);
            if (!user) {
              newUsers.push({ userId: msg.userId, name: msg.name });
            } else {
              user.name = msg.name;
            }
          }
          setUsers(c => c.concat(newUsers));
          setMessages(c => c.concat(packet.data));
          break;
        default:
          console.error(`unexpected packet`, packet);
      }
    },
    [isInFrame, setMessages, setHide],
  );

  const iframe = useRef<HTMLIFrameElement>(null);
  const otherApi = useOtherWindow<ChatNetworkPacket, ChatAppPacket>(
    iframe,
    handlePacket,
  );
  const sendPacket = useCallback(
    (packet: ChatAppPacket) => {
      otherApi.send(packet);
      // also "send" to self
      // if (packet.ptype === ChatPacketType.RawMessage) handlePacket(packet);
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
          ptype: ChatPacketType.RawMessage,
          data: input,
        });
      }
    },
    [input],
  );

  // child only
  useKeyDown('Escape', () => sendPacket({ ptype: ChatPacketType.RequestHide }));

  return (
    <main
      className={classCat(styles.main, !isInFrame ? styles.noframe : '')}
      style={{ backgroundColor: testing ? 'blue' : undefined }}
    >
      {testing && (
        <iframe
          ref={iframe}
          id="testframe"
          style={{
            visibility: hide ? 'hidden' : undefined,
            border: 'none',
            position: 'absolute',
            top: '50px',
            left: '200px',
          }}
          src="http://localhost:3000/chat"
          width="300px"
          height="500px"
        ></iframe>
      )}

      {messages.map((elm, messageIndex) => {
        const index = users.findIndex(u => u.userId === elm.userId);
        const user = users[index];
        const color = getColor(index);
        return (
          <div key={messageIndex} style={{ color }}>
            {`[${elm.userId}]${user?.name ?? elm.name}: ${elm.message}`}
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
        {!isInFrame && <button onClick={() => setHide(h => !h)}>{'<>'}</button>}
      </form>
    </main>
  );
}
