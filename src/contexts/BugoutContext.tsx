import * as React from 'react';
import Bugout from 'bugout';
import { useList } from './ListContext';

const DEBUG = false;
if (DEBUG) {
  localStorage.setItem('debug', 'bugout,webtorrent');
}

const options = {
  announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz'],
};

export const BugoutContext = React.createContext<{
  get: () => Bugout<Methods> | null;
  connect: (address: string) => Promise<Bugout<Methods>>;
  serve: () => Promise<Bugout<Methods>>;
}>({
  get: () => null,
  connect: () => null as any,
  serve: () => null as any,
});

type Methods = {
  requestList: {
    response: { list: string[] };
    input: null;
  };
};

export function BugoutProvider({ children }: { children: React.ReactNode }) {
  const { getOriginalIngredients } = useList();

  const initialize = React.useCallback(
    (bugout: Bugout<Methods>) => {
      bugout.register('requestList', (_address, _, reply) => {
        reply({ list: getOriginalIngredients() });
      });
    },
    [getOriginalIngredients],
  );

  const bugoutRef = React.useRef<Bugout<Methods> | null>(null);

  const connect = React.useCallback(
    (address: string) => {
      const bugout = new Bugout<Methods>(address, options);
      bugoutRef.current = bugout;
      return new Promise<Bugout<Methods>>((resolve) => {
        bugout.on('server', () => {
          resolve(bugout);
        });
      });
    },
    [bugoutRef],
  );

  const get = React.useCallback(() => bugoutRef.current, [bugoutRef]);

  const serve = React.useCallback(() => {
    const bugout = new Bugout<Methods>(options);
    bugoutRef.current = bugout;
    initialize(bugoutRef.current);
    return new Promise<Bugout<Methods>>((resolve) => {
      bugout.on('seen', () => {
        resolve(bugout);
      });
    });
  }, [initialize, bugoutRef]);

  return (
    <BugoutContext.Provider value={{ get, connect, serve }}>
      {children}
    </BugoutContext.Provider>
  );
}

export function useBugout() {
  return React.useContext(BugoutContext);
}
