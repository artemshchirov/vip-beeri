import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import { auth } from '../firebase';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};
