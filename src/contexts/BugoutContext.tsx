import * as React from 'react';
import Bugout from 'bugout';
import { useList } from './ListContext';

const SEED_STORAGE_KEY = 'foodlist-bugout-server-seed';
const seed = localStorage.getItem(SEED_STORAGE_KEY);

const DEBUG = false;
if (DEBUG) {
  localStorage.setItem('debug', 'bugout,webtorrent');
}

export const BugoutContext = React.createContext<{
  get: () => Bugout<Methods>;
  connect: (address: string) => Promise<Bugout<Methods>>;
  serve: () => Promise<Bugout<Methods>>;
}>({
  get: () => null as any,
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

  const bugoutRef = React.useRef(
    new Bugout<Methods>(seed ? { seed } : undefined),
  );

  const connect = React.useCallback(
    (address: string) => {
      bugoutRef.current = new Bugout<Methods>(address);
      return new Promise<Bugout<Methods>>((resolve) => {
        bugoutRef.current.on('server', () => {
          resolve(bugoutRef.current);
        });
      });
    },
    [bugoutRef],
  );

  const get = React.useCallback(() => bugoutRef.current, [bugoutRef]);

  const serve = React.useCallback(() => {
    bugoutRef.current = new Bugout<Methods>(seed ? { seed } : undefined);
    localStorage.setItem(SEED_STORAGE_KEY, bugoutRef.current.seed);
    initialize(bugoutRef.current);
    return new Promise<Bugout<Methods>>((resolve) => {
      bugoutRef.current.on('seen', () => {
        resolve(bugoutRef.current);
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
