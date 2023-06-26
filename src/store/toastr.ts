
import { makeAutoObservable } from "mobx";


class ToastrStore {

    constructor() {
        makeAutoObservable(this);
    }

    // render() {
    //     const Success = (message: string) => {
    //         const { toast } = useToast()
    //         toast.success(message)
    //     }

    //     const Error = (message: string) => {
    //         const { toast } = useToast()
    //         toast.error(message)
    //     }

    //     const Info = (message: string) => {
    //         const { toast } = useToast()
    //         toast.info(message)
    //     }

    //     const Warning = (message: string) => {
    //         const { toast } = useToast()
    //         toast.warning(message)
    //     }
    //     return { Success, Error, Info, Warning }
    // }

}

export default ToastrStore;