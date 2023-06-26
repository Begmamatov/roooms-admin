import { makeAutoObservable, runInAction } from "mobx";
import LoginWithFirebaseStore from "./auth/loginWithFirebase";
import { createContext } from "react";



export class RootStore {
    loginWithFirebaseStore: LoginWithFirebaseStore;

    constructor() {
        makeAutoObservable(this);
        this.loginWithFirebaseStore = new LoginWithFirebaseStore(this);
        this.run();
    }

    private run = () => {
        runInAction(() => {
            const list = [
                this.loginWithFirebaseStore.getLocalUser(),
            ]

            Promise.all(list)
                .then(() => {
                    console.log("All promises resolved");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
}

const rootStore = new RootStore();
export default createContext(rootStore);