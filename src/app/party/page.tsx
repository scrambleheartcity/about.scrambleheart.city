'use client';

import { VertPage } from '@/components/vertPage';
import { useFetch } from '@/hooks/useFetch';
import { useEffect, useState } from 'react';

const listUrl = `https://shc-partycentral-default-rtdb.firebaseio.com/party.json`;
const lobbyUrl = `http://localhost:1999/parties/lobby`;
// const lobbyUrl = `https://play-scrambleheart-city-party.mpaulweeks.partykit.dev/parties/lobby/`;

type LobbyData = {
  url: string;
  name: string;
  resp: any;
};
async function pollLobbies(lobbyKeys: string[]) {
  const out: LobbyData[] = [];
  for (const key of lobbyKeys) {
    const url = `${lobbyUrl}/${key}`;
    const resp = await fetch(`${url}/short`);
    const data = await resp.json();
    out.push({ url, name: key, resp: data });
  }
  return out;
}

export default function PartyPage() {
  const partyList = useFetch(`${listUrl}?cacheBust=${new Date().getTime()}`);
  const [lobbies, setLobbies] = useState<LobbyData[] | undefined>();

  useEffect(() => {
    if (!partyList || partyList === 'null') {
      setLobbies([]);
      return;
    }
    const partyObj = JSON.parse(partyList);
    const keys = Object.keys(partyObj);
    pollLobbies(keys).then(data => setLobbies(data));
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
              <a href={data.url}>{data.name}</a>
            </h2>
            <div
              style={{
                backgroundColor: '#ccc',
                borderRadius: '1em',
                padding: '0.5em 1em',
              }}
            >
              <pre>{JSON.stringify(data.resp, null, 2)}</pre>
            </div>
          </section>
        ))
      )}
    </VertPage>
  );
}
