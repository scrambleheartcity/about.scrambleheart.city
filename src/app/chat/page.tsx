'use client';

import { checkIFrame, classCat, range, sleep } from '@/components/util';
import { useMount } from '@/hooks/useMount';
import { useChildFrame, useParentWindow } from '@/hooks/useOtherWindow';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';
import {
  ChatAppIncomingPacket,
  ChatAppOutgoingPacket,
  ChatId,
  ChatMessage,
  ChatNetworkMessagePacket,
  ChatNetworkPacket,
  ChatPacketType,
  ChatRawMessagePacket,
} from './chatApp';

type Users = { hash: string; userId: ChatId; name: string }[];

function getColor(index: number) {
  const options = [
    '#F9B2D7',
    '#CFECF3',
    '#DAF9DE',
    '#F6FFDC',
    '#F9B2D7',
    '#CFECF3',
    '#DAF9DE',
    '#F6FFDC',
  ];
  return options[index % options.length];
}

function hashUserId(userId: string) {
  const length = 4;
  const hashNum = userId
    .split('')
    .reduce(
      (sum, char, index) => sum + (index + 1) * 7 * char.charCodeAt(0),
      0,
    );
  const hashStr = (hashNum % Math.pow(10, length))
    .toString()
    .padStart(length, '0');
  return hashStr;
}

const TestUsers = range(5).map(i =>
  Math.floor(Math.random() * 1000).toString(),
);
function convertRawToNetwork(
  packet: ChatRawMessagePacket,
  userIndex: number,
): ChatNetworkMessagePacket {
  const user = TestUsers[userIndex % TestUsers.length];
  return {
    ptype: ChatPacketType.NetworkMessage,
    data: [
      {
        timestamp: new Date().getTime(),
        userId: user.slice(0, 2),
        name: user,
        message: packet.data,
      },
    ],
  };
}

export default function ChatPage() {
  // refs
  const inputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // state
  const [isVisible, setVisible] = useState(true);
  const isTestParent = !!useQueryParam('test');
  const sample = useQueryParam('sample');
  const [hideTestChild, setHideTestChild] = useState(false);

  const [isInFrame, setInFrame] = useState(true);
  useMount(() => {
    const check = checkIFrame(window);
    setInFrame(check);
    setVisible(!check);
  });
  useEffect(() => {
    console.log('setVisible', isVisible);
    if (isVisible) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isVisible]);

  const [users, setUsers] = useState<Users>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // handlers
  const handleNetworkPacket = useCallback(
    (packet: ChatAppIncomingPacket) => {
      switch (packet.ptype) {
        case ChatPacketType.SetVisibility:
          setVisible(packet.isVisible);
          break;
        case ChatPacketType.NetworkMessage:
          const newUsers = users.concat();
          for (const msg of packet.data) {
            const user = newUsers.find(u => u.userId === msg.userId);
            if (!user) {
              newUsers.push({
                hash: hashUserId(msg.userId),
                userId: msg.userId,
                name: msg.name,
              });
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
    [setVisible, setUsers, setMessages],
  );
  const handleTestPacket = useCallback(
    (packet: ChatAppOutgoingPacket) => {
      if (packet.ptype === ChatPacketType.RequestHide) {
        setHideTestChild(true);
      } else {
        const testPacket = convertRawToNetwork(packet, 1);
        iframeApi.send(testPacket);
        handleNetworkPacket(testPacket);
      }
    },
    [handleNetworkPacket],
  );

  // api to other windows
  const iframeApi = useChildFrame<ChatAppOutgoingPacket, ChatNetworkPacket>(
    iframeRef,
    isTestParent ? handleTestPacket : () => {},
  );
  const parentApi = useParentWindow<ChatNetworkPacket, ChatAppOutgoingPacket>(
    isTestParent ? () => {} : handleNetworkPacket,
  );

  // interaction helpers
  const sendPacket = useCallback(
    (packet: ChatAppOutgoingPacket) => {
      if (isTestParent) {
        if (packet.ptype === ChatPacketType.RawMessage) {
          const testPacket = convertRawToNetwork(packet, 0);
          iframeApi.send(testPacket);
          handleNetworkPacket(testPacket);
        }
      } else {
        parentApi.send(packet);
      }
    },
    [handleNetworkPacket],
  );

  // useKeyDown('Escape', () => sendPacket({ ptype: ChatPacketType.RequestHide }));

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

  // only for testing
  useEffect(() => {
    if (sample) {
      for (const i of range(parseFloat(sample))) {
        sleep(i * 500).then(() => {
          sendPacket({
            ptype: ChatPacketType.RawMessage,
            data: `message ${i + 1}`,
          });
        });
      }
    }
  }, [sample]);

  if (!isVisible) {
    return (
      <main
        className={classCat(styles.main, !isInFrame ? styles.noframe : '')}
        style={{ backgroundColor: isTestParent ? 'blue' : undefined }}
      >
        loading...
      </main>
    );
  }

  return (
    <main
      className={classCat(styles.main, !isInFrame ? styles.noframe : '')}
      style={{ backgroundColor: isTestParent ? 'blue' : undefined }}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      {isTestParent && (
        <iframe
          ref={iframeRef}
          id="testframe"
          style={{
            visibility: hideTestChild ? 'hidden' : undefined,
            border: '5px dotted white',
            position: 'absolute',
            top: '1em',
            right: '1em',
          }}
          src={`http://localhost:3000/chat?sample=${sample}`}
          width="50%"
          height="50%"
        ></iframe>
      )}

      {messages.map((elm, messageIndex) => {
        const index = users.findIndex(u => u.userId === elm.userId);
        const user = users[index];
        const color = getColor(index);
        return (
          <div key={messageIndex} style={{ color }} className={styles.message}>
            <div className={styles.text}>
              <b>
                {user?.name ?? elm.name}
                <i style={{ fontSize: '0.8em' }}>
                  (#{user.hash ?? hashUserId(elm.userId)})
                </i>
                {': '}
              </b>
              {elm.message}
            </div>
            <div className={styles.time}>
              <i style={{ fontSize: '0.8em' }}>
                {new Date(elm.timestamp).toLocaleTimeString()}
              </i>
            </div>
          </div>
        );
      })}
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          id="message_input"
          type="text"
          value={input}
          onKeyDown={evt =>
            evt.code === 'Escape' &&
            sendPacket({ ptype: ChatPacketType.RequestHide })
          }
          onChange={evt => setInput(evt.target.value)}
        />
        <button type="submit">SEND</button>
        {!isInFrame && (
          <button onClick={() => setHideTestChild(h => !h)}>{'<>'}</button>
        )}
      </form>
    </main>
  );
}
