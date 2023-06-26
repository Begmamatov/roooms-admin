import { observer } from "mobx-react-lite";
import { useOutlet } from "react-router-dom";


const HomeLayout = () => {
    const outlet = useOutlet();

    return (
        <div>{outlet}</div>
    );
};

export default observer(HomeLayout)
