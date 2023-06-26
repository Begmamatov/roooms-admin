import { makeAutoObservable } from "mobx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { RootStore } from "../RootStore";


const initialToast = {
    key: "Default" as 'Success' | 'Warning' | 'Error' | 'Info' | 'Default',
    msg: "",
}

type Toast = {
    key: 'Success' | 'Warning' | 'Error' | 'Info' | 'Default';
    msg: string;
}
class LoginWithFirebaseStore {
    app: RootStore;

    constructor(app: RootStore) {
        makeAutoObservable(this);
        this.app = app;
    }

    private _email: string = "";
    private _password: string = "";
    private _loading: boolean = false;
    _toast: Toast = initialToast;

    user = ''

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get loading() {
        return this._loading;
    }

    get toast() {
        return this._toast;
    }


    setEmail = (email: string) => {
        this._email = email;
    }

    setPassword = (password: string) => {
        this._password = password;
    }


    setLoading = (loading: boolean) => {
        this._loading = loading;
    }

    setToast = (str: string, key: 'Success' | 'Warning' | 'Error' | 'Info' | 'Default') => {
        this._toast = {
            key: key,
            msg: str,
        }
    }

    getLocalUser = async () => {
        const user = localStorage.getItem("user");
        if (user) {
            this.user = user;
        }
    }
    setLocalUser = async (user: string) => {
        localStorage.setItem("user", user);
        this.user = user;
    }

    removeLocalUser = async () => {
        localStorage.removeItem("user");
        this.user = '';
    }

    validate = () => {
        if (!this.email) {
            this.setToast("Email is required", "Warning");
            return false;
        }
        if (!this.password) {
            this.setToast("Password is required", "Warning");
            return false;
        }
        if (this.password.length < 8) {
            this.setToast("Password must be at least 8 characters", "Warning");
            return false;
        }
        if (!this.email.includes("@")) {
            this.setToast("Email is invalid", "Warning");
            return false;
        }
        return true;
    }

    clear = () => {
        this.setEmail("");
        this.setPassword("");
        this.setLoading(false);
        this.setToast("", "Default");
    }

    login = async () => {
        this.setLoading(true);
        if (!this.validate()) {
            this.setLoading(false);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    this.setToast("Login successful", "Success");
                    const user = userCredential.user;
                    localStorage.setItem("user", JSON.stringify(user.uid));
                    this.getLocalUser();
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.setToast(errorMessage, "Error");
                });
        } catch (error: any) {
            this.setToast(error.message, "Error");
        } finally {
            this.setLoading(false);
        }
    }

    logout = async () => {
        this.removeLocalUser();
    }

}

export default LoginWithFirebaseStore;