import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer
} from "react-router-dom";
import LoginScreen from "../screens/auth/loginScreen";
import AuthLayout from "../screens/auth/AuthLayout";
import HomeLayout from "../screens/home/HomeLayout";
import DashbordScreen from "../screens/home/DashbordScreen";
import HomeScreen from "../screens/home/homeScreen/HomeScreen";
import PostsScreen from "../screens/home/postsScreen/PostsScreen";
import AddPostScreen from "../screens/home/addPostScreen/AddPostScreen";

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 3000)
    );

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            loader={() => defer({ userPromise: getUserData() })}
        >
            <Route element={<HomeLayout />}>
                <Route path="/login" element={<LoginScreen />} />
                <Route element={<DashbordScreen />} >
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/posts" element={<PostsScreen />} />
                    <Route path="/add-post" element={<AddPostScreen />} />
                </Route>
            </Route>
        </Route>
    )
);
