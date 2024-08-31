import React, { createContext } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_APP_ID);
pb.autoCancellation(false);

const PocketbaseContext = createContext<PocketBase | null>(null);

const PocketbaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PocketbaseContext.Provider value={pb}>
            {children}
        </PocketbaseContext.Provider>
    );
};

export { PocketbaseProvider, PocketbaseContext };