import { Alert, LinearProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import useRootStore from "../../hooks/useRootStore";


const AuthLayout = () => {
    const outlet = useOutlet();
    const store = useRootStore();
    const promise: any = useLoaderData();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Await
                resolve={promise.userPromise}
                errorElement={<Alert severity="error">Something went wrong!</Alert>}
                children={() => (
                    <div>{outlet}</div>
                )}
            />
        </Suspense>
    );
};


export default observer(AuthLayout)