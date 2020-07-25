import * as React from 'react';
import Bugout from 'bugout';
import { useList } from './ListContext';

const SEED_STORAGE_KEY = 'foodlist-bugout';
const seed = localStorage.getItem(SEED_STORAGE_KEY);

export const BugoutContext = React.createContext<{
  get: () => Bugout<Methods>;
  connect: (address: string) => void;
  serve: () => void;
}>({ get: () => null as any, connect: () => {}, serve: () => {} });

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

  const connect = React.useCallback((address: string) => {
    bugoutRef.current = new Bugout<Methods>(address);
  }, []);

  const get = React.useCallback(() => bugoutRef.current, [bugoutRef]);

  const serve = React.useCallback(() => {
    bugoutRef.current = new Bugout<Methods>(seed ? { seed } : undefined);
    initialize(bugoutRef.current);
  }, [initialize]);

  return (
    <BugoutContext.Provider value={{ get, connect, serve }}>
      {children}
    </BugoutContext.Provider>
  );
}

export function useBugout() {
  return React.useContext(BugoutContext);
}
