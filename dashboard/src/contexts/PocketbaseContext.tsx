import React, { createContext } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://csclub.pockethost.io');

const PocketbaseContext = createContext<PocketBase | null>(null);

const PocketbaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PocketbaseContext.Provider value={pb}>
            {children}
        </PocketbaseContext.Provider>
    );
};

export { PocketbaseProvider, PocketbaseContext };