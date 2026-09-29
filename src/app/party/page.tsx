'use client';

import { VertPage } from '@/components/vertPage';
import { useFetch } from '@/hooks/useFetch';
import { useEffect, useState } from 'react';

const listUrl = `https://shc-partycentral-default-rtdb.firebaseio.com/party.json`;
const lobbyUrl = `http://localhost:1999/parties/lobby`;
// const lobbyUrl = `https://play-scrambleheart-city-party.mpaulweeks.partykit.dev/parties/lobby/`;

type PartyData = {
  [lobbyId: string]: {
    [userId: string]: true;
  };
};
type LobbyData = {
  index: number;
  id: string;
  url: string;
  users: string[];
  resp?: any;
};

function partyToData(party: PartyData): LobbyData[] {
  const lobbyIds = Object.keys(party);
  return lobbyIds.map<LobbyData>((key, index) => {
    const lobbyUsers = Object.keys(party[key]);
    return {
      index: index,
      id: key,
      url: `${lobbyUrl}/${key}`,
      urlShort: `${lobbyUrl}/${key}/short`,
      users: lobbyUsers,
    };
  });
}
async function fetchRoom(data: LobbyData): Promise<LobbyData> {
  const resp = await fetch(`${data.url}/short`);
  const respData = await resp.json();
  return {
    ...data,
    resp: respData,
  };
}

export default function PartyPage() {
  const partyList = useFetch(`${listUrl}?cacheBust=${new Date().getTime()}`);
  const [lobbies, setLobbies] = useState<LobbyData[] | undefined>();

  useEffect(() => {
    if (!partyList || partyList === 'null') {
      setLobbies([]);
      return;
    }
    const newLobbies = partyToData(JSON.parse(partyList));
    setLobbies(newLobbies);
    (async () => {
      for (const lobby of newLobbies) {
        await fetchRoom(lobby).then(newRoom => {
          setLobbies(curr => {
            const copy = (curr ?? [])?.concat();
            copy[newRoom.index] = newRoom;
            return copy;
          });
        });
      }
    })();
  }, [partyList]);

  return (
    <VertPage>
      <section>
        <h1>Party Central</h1>
        info about current parties
      </section>
      {lobbies === undefined ? (
        <section>loading...</section>
      ) : lobbies.length === 0 ? (
        <section>no lobbies found</section>
      ) : (
        lobbies.map(data => (
          <section key={data.url}>
            <h2>
              <a href={data.url}>Lobby #{data.id}</a> ({data.users.length}{' '}
              users)
            </h2>
            <div
              style={{
                backgroundColor: '#ccc',
                borderRadius: '1em',
                padding: '0.5em 1em',
              }}
            >
              <pre>
                {data.resp ? JSON.stringify(data.resp, null, 2) : 'fetching...'}
              </pre>
            </div>
          </section>
        ))
      )}
    </VertPage>
  );
}
