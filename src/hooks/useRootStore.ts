import { useContext } from "react";
import RootStore from "../store/RootStore";


const useRootStore = () => {
    const store = useContext(RootStore);
    if (!store) {
        throw new Error('useRootStore must be used within a RootStoreProvider');
    }
    return store;
}

export default useRootStore;