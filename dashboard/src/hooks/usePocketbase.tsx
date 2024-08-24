import { useContext } from 'react';
import { PocketbaseContext } from '../contexts/PocketbaseContext';

const usePocketbase = () => {
    const context = useContext(PocketbaseContext);
    if (context === null) {
        throw new Error('usePocketbase must be used within <PocketbaseProvider>');
    }
    return context;
}

export default usePocketbase;