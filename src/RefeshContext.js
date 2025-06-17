import { createContext } from 'react';

export const RefreshContext = createContext({
  refresh: false,
  setRefresh: () => {}
});