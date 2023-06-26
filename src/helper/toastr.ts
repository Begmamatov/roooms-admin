import { useToast } from "rc-toastr"


const useToastr = () => {

    const { toast } = useToast()

    const Success = (message: string) => {
        toast.success(message)
    }

    const Error = (message: string) => {
        toast.error(message)
    }

    const Info = (message: string) => {
        toast.info(message)
    }

    const Warning = (message: string) => {
        toast.warning(message)
    }

    const Default = (message: string) => {
        toast.default(message)
    }
    return { Success, Error, Info, Warning, Default }
}

export default useToastr;